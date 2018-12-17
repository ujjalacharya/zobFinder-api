const mongoose = require('mongoose');

const SeekerEducationSchema = new mongoose.Schema({
    seekerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "seekers",
        required: true
    },
    degree: {
        type: String, 
        required: true,
        enum: ["Phd", "Master","Bachelor","Intermediate","SEE", "Vocational"]
    },
    program: {
        type: String,
        required: true,
    },
    board: {
        type: String,
        required: true,
    },
    institution: {
        type: String,
        required: true,
    },
    percentage: Number,
    graduationYear: Number,
    startedYear: Number
});

exports.SeekerEducationSchema = SeekerEducationSchema;
exports.SeekerEducation = mongoose.model('seekereducation', SeekerEducationSchema);
