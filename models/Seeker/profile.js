const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Profile Schema
const ProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "seekers"
  },
  handle: {
    type: String,
    required: true,
    max: 40
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
  skills: {
    title: [String],
    dateOfTraining: {
      type: Date
    },
    duration: {
      type: String,
      required: true
    },
    trainedOn: {
      type: String,
      required: true
    }
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      companyName: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      degree: {
        type: String,
        required: true,
        enum: ["Phd", "Master", "Bachelor", "Intermediate", "SEE", "Vocational"]
      },
      program: {
        type: String,
        required: true
      },
      board: {
        type: String,
        required: true
      },
      institution: {
        type: String,
        required: true
      },
      percentage: Number,
      graduationYear: Number,
      startedYear: Number
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
