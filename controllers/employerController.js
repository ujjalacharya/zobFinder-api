const { Employer } = require("../models/Employer/index");
const { secretKey, expireTime } = require("../config/keys.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const {
  validateEmployerLogin,
  validateEmployerRegisteration
} = require("../validation");

// @@ POST api/register/
// @@ desc Register a User
// @@ access Public
exports.registerEmployer = async (req, res) => {
  const { error } = validateEmployerRegisteration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let employer = await Employer.findOne({ email: req.body.email });
  if (employer) return res.status(400).send("Email already registered");

  console.log(req.body);

  newemployer = new Employer({
    email: req.body.email,
    orgName: req.body.orgName,
    password: req.body.password,
    orgOwnership: req.body.orgOwnership,
    orgType: req.body.orgType,
    orgWebsite: req.body.orgWebsite,
    orgAddress: req.body.orgAddress,
    orgPhone: req.body.orgPhone,
    orgProfile: req.body.orgProfile,
    orgPocFirstName: req.body.orgPocFirstName,
    orgPocLastName: req.body.orgPocLastName,
    orgPocDesignation: req.body.orgPocDesignation,
    orgPocEmail: req.body.orgPocEmail,
    orgPocMobile: req.body.orgPocMobile
  });

  const salt = await bcrypt.genSalt(10);
  newemployer.password = await bcrypt.hash(newemployer.password, salt);
  await newemployer.save();

  res.status(200).json({
    name: newemployer.name,
    email: newemployer.email
  });
};

// @@ POST api/login
// @@ desc Login User
// @@ access Public
exports.loginEmployer = async (req, res) => {
  console.log("Ehllo");
  const { error } = validateEmployerLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const employer = await Employer.findOne({ email: req.body.email });
  if (!employer) return res.status(400).json("No employer found");

  const isAuth = await bcrypt.compare(req.body.password, employer.password);

  if (!isAuth) return res.status(400).json("Password did not match");

  // res.status(200).json('Authorized');
  const payload = {
    id: employer.id,
    name: employer.name,
    isAdmin: employer.isAdmin
  };

  jwt.sign(payload, secretKey, (err, token) => {
    res.json({
      success: true,
      token: token
    });
  });
};

exports.switchAdminRole = async (req, res) => {
  const employer = await Employer.findOne({ _id: req.params.id });
  if (!employer) return res.status(400).json("No employer found");

  employer.isAdmin = !employer.isAdmin;
  await employer.save();

  res.status(200).json(employer);
};

exports.getAllEmployers = async (req, res) => {
  const employers = await Employer.find({}).sort({ date: -1 });
  if (!employers) return res.status(400).json("No employers found");

  res.status(200).json(employers);
};
