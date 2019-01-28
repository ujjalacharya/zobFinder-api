const mongoose = require("mongoose");

const SeekerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  fullName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
  dob: Date,
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"]
  },
  phoneNumber: {
    type: Number,
    minlength: 10
    },
  nationality: String,
  maritalStatus: {
    type: String,
    enum: ["Married", "Not Married"]
  },
  state: String,
  district: String,
  city: String,
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  education: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seekereducations"
    }
  ],
  skill: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seekerskills"
    }
  ],
  experience: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seekerexperiences"
    }
  ]
});

exports.SeekerSchema = SeekerSchema;
exports.Seeker = mongoose.model("seeker", SeekerSchema);
