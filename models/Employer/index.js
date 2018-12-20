const mongoose = require("mongoose");

const EmployerSchema = new mongoose.Schema({
  orgName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  orgOwnership: {
    type: String,
    required: true
  },
  orgType: {
    type: String,
    required: true
  },
  orgWebsite: {
    type: String,
    required: true
  },
  orgAddress: {
    type: String,
    required: true
  },
  orgPhone: Number,
  orgProfile: {
    type: String,
    required: true
  },
  orgPocEmail: {
    type: String,
    required: true
  },
  orgPocFirstName: {
    type: String,
    required: true
  },
  orgPocLastName: {
    type: String,
    required: true
  },
  orgPocDesignation: String,
// orgPocPhone: Number,
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

exports.EmployerSchema = EmployerSchema;
exports.Employer = mongoose.model("employer", EmployerSchema);
