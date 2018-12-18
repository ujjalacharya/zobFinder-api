const Router = require('express').Router();
const isAdmin = require('passport');
const isLogin = require('passport');
const isEmployerLogin = require('passport');
const ensureLogin = isLogin.authenticate('login-rule', { session: false });
const ensureEmployerLogin = isEmployerLogin.authenticate('employer-rule', { session: false });
const ensureAdmin = isAdmin.authenticate('admin-rule', { session: false });
const {uploadAvatar} = require('../helpers/multer');

//Importing controllers
const jobController = require('../controllers/jobController');
const employerController = require('../controllers/employerController');
const seekerController = require('../controllers/seekerController');

//job routes
Router.route('/jobs')
  .get(jobController.getAllJobs)
  .post(ensureEmployerLogin, jobController.postJob);

Router.route('/jobs/:id')
  .get(jobController.getJobById)


// Employer routes
Router
  .post('/employer/register', employerController.registerEmployer)
  .post('/employer/login', employerController.loginEmployer)
  .patch('/employer/switchAdminRole/:id', ensureAdmin, employerController.switchAdminRole)
  .get('/employers', ensureAdmin, employerController.getAllEmployers)

module.exports = Router;