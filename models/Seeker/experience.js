const mongoose = require('mongoose');

const SeekerExperienceSchema = new mongoose.Schema({
    seekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "seekers",
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    numOfYear: Number,
    numOfMonth: Number,
    duties: {
        type: String,
        required: true
    }
});

exports.SeekerExperienceSchema = SeekerExperienceSchema;
exports.SeekerExperience = mongoose.model('seekerexperience', SeekerExperienceSchema);