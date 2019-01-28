const {Seeker} = require("../models/Seeker");
const {SeekerEducation} = require("../models/Seeker/education");
const {Job} = require("../models/Job");
const { secretKey, expireTime } = require("../config/keys.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

const {validateSeeker, validateLogin, validateJobApplied, validateEducation} = require("../validation")

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


// @@ POST api/seeker/apply-job
// @@ desc Apply for job
// @@ access Private(Seeker Login)
exports.applyJob = async(req,res) =>{

  const { error } = validateJobApplied(req.params);
  if (error) return res.status(400).send(error.details[0].message);

  let id = mongoose.Types.ObjectId(req.params.jobId);

  const job = await Job.findById(id);
  if (!job) return res.status(400).send('Invalid job id.');

  const seeker = await Seeker.findById(req.user._id);
  if (!seeker) return res.status(400).send('Invalid seeker.');
  
  const newseeker = {
    seekerId: req.user.id,
    seekerName: req.user.fullName
  };

  if(job.seekers.filter(seeker => seeker.seekerId.toString() === req.user.id).length > 0){
    return res.status(400).json({ alreadyApplied: "already applied for job" })  
    }

  job.seekers.push(newseeker);
  const savedjob = await job.save();
  res.status(200).json(savedjob);
  
};

// @@ PATCH api/seeker/cancel-job
// @@ desc Cancel an applied job
// @@ access Private(Seeker Login)
exports.cancelJob = async(req, res) =>{
  let id = mongoose.Types.ObjectId(req.params.jobId);
  
  const job = await Job.findById(id);
  if(!job) return res.status(400).json("No such job found!");

  const seeker = await Seeker.findById(req.user.id);
  if(!seeker) return res.status(400).json("Invalid User");

  if(job.seekers.filter(seeker=> seeker.seekerId.toString() === req.user.id).length === 0){
    return res.status(404).json("Not applied for this job")
  }
  
  const removeIndex = job.seekers.map(seeker => seeker.seekerId.toString())
              .indexOf(req.user.id);
  
  job.seekers.splice(removeIndex, 1);

  const savedjob = await job.save();
  res.status(200).json(savedjob);


}

// @@ POST api/seeker/applied-job
// @@ desc Get all applied job
// @@ access Private(Seeker Login)
exports.appliedJob = async(req,res) =>{
  const seeker = await Seeker.findById(req.user._id);
  if (!seeker) return res.status(400).send('Invalid seeker.');

  const job = await Job.find({'seekers': {$elemMatch: {seekerId: req.user._id}}});
  if(job){
      return res.status(200).json(job);
  }
  else{
      return res.status(400).json('you have not applied for any job');
  }
};

//Proile section
exports.postEducation = async(req, res) =>{
  const seeker = await Seeker.findById(req.user._id);
  if (!seeker) return res.status(400).send('Invalid seeker.');

  const { error } = validateEducation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const education = new SeekerEducation({
            seekerId: seeker._id,
            degree: req.body.degree,
            program: req.body.program,
            board : req.body.board,
            institution: req.body.institution,
            percentage: req.body.percentage,
            graduationYear: req.body.graduationYear,
            startedYear: req.body.startedYear
  });

  seeker.education.push(education._id);
  const savededucation = await education.save();
  const savedseeker = await seeker.save();
  return res.status(200).json({"Success": savededucation})
}