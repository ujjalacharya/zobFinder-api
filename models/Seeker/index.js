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
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

exports.SeekerSchema = SeekerSchema;
exports.Seeker = mongoose.model("seeker", SeekerSchema);
