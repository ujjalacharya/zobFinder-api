const mongoose = require("mongoose");
const {CategorySchema} = require("./JobCategory");

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  location: {
    type: String,
    required: true
  },
  vacancyCode: {
    type: String,
    required: true,
    maxlength: 5
  },
  numOfVacancies: {
    type: Number,
    required: true
  },
  //fulltime , part time, contract
  availability: {
    type: String,
    required: true
  },
  //it, er
  jobCategory: {
    type: CategorySchema,
    required: true
  },
  //entry, manager, supervisor
  jobLevel: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"]
  },
  experience: Number,
  salary: Number,
  negotiable: Boolean,
  jobDescription: String,
  jobSpecification: String,
  education: String,
  deadline: String,
  approved: {
    type: Boolean,
    default: false
  },
  numberOfViews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "employers",
    required: true
  },
  seekers: [
    {
      seekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "seekers"
      },
      date:{
        type: Date,
        default: Date.now
      }
    }
  ]
});

exports.JobSchema = JobSchema;
exports.Job = mongoose.model("job", JobSchema);
