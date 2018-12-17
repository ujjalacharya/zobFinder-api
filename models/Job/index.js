const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    location: {
        type: String,
        required: true,
    },
    vacancyCode: {
        type: String,
        required: true,
        maxlength: 5
    },
    numOfVacancies: {
        type: Number,
        required: true,
    },
    //fulltime , part time, contract
    availability: {
        type: String,
        required: true,
    },
    //it, er
    jobCategory: {
        type: String,
        required: true,
    },
    //entry, manager, supervisor
    jobLevel: {
        type: String,
        required: true,
    },
    gender: {
        type: String, 
        enum: ["Male", "Female","Other"]
    },
    experience: Number,
    salary: Number,
    negotiable: Boolean,
    jobDescription: String,
    jobSpecification: String,
    education: String,
    deadline: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organizations",
        required: true
    },
    internId:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: "seekers"
        }
    ]
});

exports.JobSchema = JobSchema;
exports.Job = mongoose.model('job', JobSchema);