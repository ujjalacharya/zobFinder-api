const Profile = require("../models/Seeker/profile");
const {validateProfile} = require("../validation")

//Proile section
exports.createProfile = async (req, res) => {
  const { error } = validateProfile(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const profileFields = {};
  profileFields.userId = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.dob) profileFields.dob = req.body.dob;
  if (req.body.gender) profileFields.gender = req.body.gender;
  if (req.body.phoneNumber) profileFields.phoneNumber = req.body.phoneNumber;
  if (req.body.nationality) profileFields.nationality = req.body.nationality;
  if (req.body.maritalStatus)
    profileFields.maritalStatus = req.body.maritalStatus;
  if (req.body.state) profileFields.state = req.body.state;
  if (req.body.district) profileFields.district = req.body.district;
  if (req.body.city) profileFields.city = req.body.city;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername;

  //Check for skills
  if (typeof req.body.skills !== undefined) {
    profileFields.skills.title = req.body.skills.title.split(",");
    profileFields.skills.dateOfTraining = req.body.skills.dateOfTraining;
    profileFields.skills.duration = req.body.skills.duration;
    profileFields.skills.trainedOn = req.body.skills.trainedOn;
  }

  //Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  let profile = await Profile.findOne({ user: req.user.id });
  if (profile) {
    //Update
    let updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    );
    return res.json(updatedProfile);
  } else {
    profile = await Profile.findOne({ handle: profileFields.handle });
    if (profile) {
      errors.handle = "Handle already exists";
      res.status(400).send(errors);
    } else {
      let newProfile = await new Profile(profileFields).save();
      return res.status(200).json(newProfile);
    }
  }
};
