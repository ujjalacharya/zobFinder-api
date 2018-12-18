const Router = require("express").Router();
const isAdmin = require("passport");
const isLogin = require("passport");
const isEmployerLogin = require("passport");
const ensureLogin = isLogin.authenticate("login-rule", { session: false });
const ensureEmployerLogin = isEmployerLogin.authenticate("employer-rule", {
  session: false
});
const ensureAdmin = isAdmin.authenticate("admin-rule", { session: false });
const { uploadAvatar } = require("../helpers/multer");

//Importing controllers
const jobController = require("../controllers/jobController");
const employerController = require("../controllers/employerController");
const seekerController = require("../controllers/seekerController");
const categoryController = require("../controllers/categoryController");

//job routes
Router.route("/jobs")
  .get(jobController.getAllJobs)
  .post(ensureEmployerLogin, jobController.postJob);

Router.route("/unapprovedjobs")
  .get(ensureAdmin, jobController.getAllUnapprovedJobs);

Router.route("/change-job-state/:id")
  .patch(ensureAdmin, jobController.changeJobState)

Router.route("/jobs/:id").get(jobController.getJobById);

//Categories routes
Router.route("/categories")
  .get(ensureAdmin, categoryController.getAllCategories)
  .post(ensureAdmin, categoryController.postCategory);
Router.route("/categories/:id")
  .get(ensureAdmin, categoryController.getCategory)
  .put(ensureAdmin, categoryController.updateCategory)
  .delete(ensureAdmin, categoryController.deleteCategory);

// Employer routes
Router.post("/employer/register", employerController.registerEmployer)
  .post("/employer/login", employerController.loginEmployer)
  .patch(
    "/employer/switchAdminRole/:id",
    ensureAdmin,
    employerController.switchAdminRole
  )
  .get("/employers", ensureAdmin, employerController.getAllEmployers);

module.exports = Router;
