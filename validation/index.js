const Joi = require('joi');

//Employer validation (Register/ Login)
exports.validateEmployerRegisteration = (user) => {
  const schema = {
    orgName: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    orgOwnership: Joi.string().required(),
    orgType: Joi.string().required(),
    orgWebsite: Joi.string().required(),
    orgPhone: Joi.number(),
    orgProfile: Joi.string().required(),
    orgAddress: Joi.string().required(),
    orgPocFirstName: Joi.string().required(),
    orgPocLastName: Joi.string().required(),
    orgPocDesignation: Joi.string(),
    orgPocEmail: Joi.string().email().required(),
    orgPocMobile: Joi.number()
  }
  return Joi.validate(user, schema); 
}

exports.validateEmployerLogin = (user) => {
  const schema = {
    email : Joi.string().required().email().min(2),
    password : Joi.string().required().min(4)
  }
  return Joi.validate(user, schema); 
}

//Category Validation
exports.validateCategory = (category) => {
  const schema = {
    name: Joi.string().required().min(2).max(25)
  }
  return Joi.validate(category, schema);
}

//Job Validation
exports.validateJob = (job) => {
  const schema = {
      categoryId: Joi.objectId().required(),
      title: Joi.string().min(5).max(50).required(),
      location: Joi.string(),
      vacancyCode: Joi.string().required().max(5),
      numOfVacancies: Joi.number().required(),
      availability: Joi.string().required(),
      jobLevel: Joi.string().required(),
      gender: Joi.string(),
      experience: Joi.number(),
      salary : Joi.number(),
      negotiable : Joi.boolean(),
      jobDescription: Joi.string(),
      jobSpecification: Joi.string(),
      education: Joi.string(),
      deadline: Joi.date()
  };
  return Joi.validate(job, schema);
};