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

const updateUserSchema = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
});

const productSchema = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  sellPrice: Joi.number().required(),
  buyPrice: Joi.number().required(),
  maxRetailPrice: Joi.number().required(),
});

exports.signupSchema = signupSchema;
exports.loginSchema = loginSchema;
exports.updateUserSchema = updateUserSchema;
exports.productSchema = productSchema;
