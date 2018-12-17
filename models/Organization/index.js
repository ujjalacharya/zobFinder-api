const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    orgName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    orgType: {
        type: String,
        required: true,
    },
    orgOwnership: {
        type: String,
        required: true,
    },
    orgWebsite: {
        type: String,
        required: true,
    },
    orgAddress: {
        type: String,
        required: true,
    },
    orgPhone: String,
    orgProfile: {
        type: String,
        required: true,
    },
    orgPocFirstName: {
        type: String,
        required: true,
    },
    orgPocLastName: {
        type: String,
        required: true,
    },
    orgPocEmail: {
        type: String,
        required: true,
    },
    orgPocDesignation: String,
    orgPocPhone: String,
    orgPocMobile: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    jobId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "jobs"
    }]
});

exports.OrganizationSchema = OrganizationSchema;
exports.Organization = mongoose.model('organization', OrganizationSchema);