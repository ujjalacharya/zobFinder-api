const { Job } = require("../models/Job");
const { Employer } = require("../models/Employer");
const { Category } = require("../models/Job/JobCategory");
const {validateJob} = require('../validation');

// @@ GET api/jobs
// @@ desc GET all Jobs
// @@ access Public
exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find({ approved: true }).sort({ date: -1 });
  res.status(200).json(jobs);
};

// @@ GET api/unapprovedjobs
// @@ desc GET all Unapproved Jobs
// @@ access Private
exports.getAllUnapprovedJobs = async (req, res) => {
  const jobs = await Job.find({ approved: false }).sort({ date: -1 });
  res.status(200).json(jobs);
};

// @@ GET api/jobs/:id
// @@ desc GET Jobs By Id
// @@ access Public
exports.getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json("No such job found");
  if (job.approved || req.user.isAdmin){
    job.numberOfViews += 1;
    await job.save();
    res.status(200).json(job);
  } 
  return res.status(401).json("Cannot access this job");
 
};

// @@ POST api/jobs
// @@ desc POST Jobs
// @@ access Private
exports.postJob = async (req, res) => {
  const {error} = validateJob(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(400).send("No such category found");

  let job = new Job({
    employerId: req.user._id,
    title: req.body.title,
    location: req.body.location,
    vacancyCode: req.body.vacancyCode,
    numOfVacancies: req.body.numOfVacancies,
    availability: req.body.availability,
    jobCategory: {
      _id: category._id,
      name: category.name
    },
    jobLevel: req.body.jobLevel,
    gender: req.body.gender,
    experience: req.body.experience,
    salary: req.body.salary,
    negotiable: req.body.negotiable,
    jobDescription: req.body.jobDescription,
    jobSpecification: req.body.jobSpecification,
    education: req.body.education,
    deadline: req.body.deadline
  });

  savedjob = await job.save();
  console.log(savedjob);
  res.status(200).json(savedjob);
};

// @@ PATCH api/jobs/
// @@ desc GET Jobs By Id
// @@ access Public
exports.changeJobState = async(req, res) =>{
  const job = await Job.findById(req.params.id);

  if(!job) return res.status(404).json("No such job found")

  job.approved = !job.approved;
  const savedjob = await job.save();
  res.status(200).json(savedjob)
}

// @@ GET PUT/job/:id
// @@ desc Update a Job
// @@ access Private
exports.updateJob = async(req, res)=>{
  const job =  await Job.findById(req.params.id);
  if ((job.employerId.toString() !== req.user.id) && !req.user.isAdmin) return res.status(401).json('Unauthorized');

  await Job.findByIdAndUpdate(req.params.id, req.body);
  const updatedJob = await Job.findById(req.params.id)

  res.status(200).json(updatedJob);
}

// @@ GET DELETE/job/:id
// @@ desc Delete a Job
// @@ access Private
exports.deleteJob = async(req, res)=>{
  const job =  await Job.findById(req.params.id);
  if (job.employerId.toString() !== req.user.id && !req.user.isAdmin) return res.status(401).json('Unauthorized')
  const removedjob = await job.remove();
  
  res.status(200).json({ success: true, removedjob })
}