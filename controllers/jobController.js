const { Job } = require("../models/Job");
const { Employer } = require("../models/Employer");
const { Category } = require("../models/Job/JobCategory");
// const {validateComment, validateProperty} = require('../validation');

// @@ GET api/jobs
// @@ desc GET all Jobs
// @@ access Public
exports.getAllJobs = async (req, res) => {
  const jobs = await Job.find({ approved: true }).sort({ date: -1 });
  res.status(200).json(jobs);
};

// @@ GET api/jobs
// @@ desc GET all Jobs
// @@ access Public
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
  if (!job.approved) return res.status(401).json("Cannot access this job");
  job.numberOfViews += 1;
  await job.save();
  res.status(200).json(job);
};

exports.postJob = async (req, res) => {
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

exports.changeJobState = async(req, res) =>{
  const job = await Job.findById(req.params.id);

  if(!job) return res.status(404).json("No such job found")

  job.approved = !job.approved;
  const savedjob = await job.save();
  res.status(200).json(savedjob)
}