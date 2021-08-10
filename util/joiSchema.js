const Joi = require("joi");

const signupSchema = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  email: Joi.string().email().lowercase().required().trim(),
  password: Joi.string().min(6).required().trim(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).empty(""),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required().trim(),
  password: Joi.string().min(6).required().trim(),
});

exports.signupSchema = signupSchema;
