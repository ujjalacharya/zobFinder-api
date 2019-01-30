const Router = require("express").Router();
const isAdmin = require("passport");
const isLogin = require("passport");
const isEmployerLogin = require("passport");
const ensureLogin = isLogin.authenticate("login-rule", { session: false });
const ensureEmployerLogin = isEmployerLogin.authenticate("employer-rule", { session: false });
const ensureAdmin = isAdmin.authenticate("admin-rule", { session: false });
const { uploadAvatar } = require("../helpers/multer");

//Importing controllers
const jobController = require("../controllers/jobController");
const employerController = require("../controllers/employerController");
const seekerController = require("../controllers/seekerController");
const categoryController = require("../controllers/categoryController");
const seekerProfileController = require("../controllers/seekerProfileController");

//Seeker controllers
//Auth and JobApply
Router
  .get("/seekers", ensureAdmin, seekerController.getAllSeekers)
  .post("/seeker/register", uploadAvatar, seekerController.registerSeeker)
  .post("/seeker/login", seekerController.loginSeeker)
  .post("/seeker/apply-job/:jobId", ensureLogin, seekerController.applyJob)
  .get("/seeker/applied-job", ensureLogin, seekerController.appliedJob)
  .patch("/seeker/cancel-job/:jobId", ensureLogin, seekerController.cancelJob);

//Seeker profile
Router
  .post("/seeker/profile", ensureLogin, seekerProfileController.createProfile)
  .post("/seeker/education", ensureLogin, seekerProfileController.postEducation);

//Job routes
Router.route("/jobs")
  .get(jobController.getAllJobs)
  .post(ensureEmployerLogin, jobController.postJob);
Router.route("/jobs/unapproved")
  .get(ensureAdmin, jobController.getAllUnapprovedJobs);
Router.route("/jobs/changestate/:id")
  .patch(ensureAdmin, jobController.changeJobState);
Router.route("/jobs/:id")
  .get(jobController.getJobById)
  .put(ensureEmployerLogin, jobController.updateJob)
  .delete(ensureEmployerLogin, jobController.deleteJob);

//Categories routes
Router.route("/categories")
  .get(ensureAdmin, categoryController.getAllCategories)
  .post(ensureAdmin, categoryController.postCategory);
Router.route("/categories/:id")
  .get(ensureAdmin, categoryController.getCategoryById)
  .put(ensureAdmin, categoryController.updateCategory)
  .delete(ensureAdmin, categoryController.deleteCategory);

// Employer routes
Router
  .get("/employers", ensureAdmin, employerController.getAllEmployers)
  .post("/employer/register", employerController.registerEmployer)
  .post("/employer/login", employerController.loginEmployer)
  .patch("/employer/switchAdminRole/:id", ensureAdmin, employerController.switchAdminRole)
  .get("/employer/job-posted", ensureEmployerLogin, employerController.jobPosted);

module.exports = Router;
