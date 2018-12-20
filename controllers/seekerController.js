const {Seeker} = require("../models/Seeker")
const { secretKey, expireTime } = require("../config/keys.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {validateSeeker, validateLogin} = require("../validation")

// @@ GET api/seekers
// @@ desc GET all seekers
// @@ access Private
exports.getAllSeekers = async(req, res)=>{
  const seekers = await Seeker.find({}).sort({date: -1});
  res.status(200).json(seekers);
}

// @@ POST api/seeker/register
// @@ desc POST seeker data
// @@ access Public
exports.registerSeeker = async(req, res) => {
  const { error } = validateSeeker(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let seeker = await Seeker.findOne({ email: req.body.email });
  if (seeker) return res.status(400).send("Email already registered");

  
  if(req.file !== undefined){
    req.body.image = 'avatars/'+req.file.filename;
    }else{
    req.body.image = 'avatars/default.jpg';
    }

  const newseeker = new Seeker({
    email: req.body.email,
    fullName: req.body.fullName,
    password: req.body.password,
    dob: req.body.dob,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
    nationality: req.body.nationality,
    maritalStatus: req.body.maritalStatus,
    state: req.body.state,
    city: req.body.city,
    district: req.body.district,
    avatar: req.body.image
  });

  const salt = await bcrypt.genSalt(10);
  newseeker.password = await bcrypt.hash(newseeker.password, salt);
  await newseeker.save();

  res.status(200).json({
    fullName: newseeker.fullName,
    email: newseeker.email
  });
}

// @@ POST api/seeker/login
// @@ desc Login Seeker
// @@ access Public
exports.loginSeeker = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const seeker = await Seeker.findOne({ email: req.body.email });
  if (!seeker) return res.status(400).json("No seeker found");

  const isAuth = await bcrypt.compare(req.body.password, seeker.password);

  if (!isAuth) return res.status(400).json("Password did not match");

  // res.status(200).json('Authorized');
  const payload = {
    id: seeker.id,
    name: seeker.name,
    isAdmin: seeker.isAdmin
  };

  jwt.sign(payload, secretKey, (err, token) => {
    res.json({
      success: true,
      token: token
    });
  });
};
