const mongoose = require('mongoose');

const SeekerSkillSchema = new mongoose.Schema({
    seekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "seekers",
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    dateOfTraining: {
        type: Date,
    },
    duration: {
        type: String,
        required: true
    },
    trainedOn: {
        type: String,
        required: true
    }
});

exports.SeekerSkillSchema = SeekerSkillSchema;
exports.SeekerSkill = mongoose.model('seekerskill', seekerSkillSchema);