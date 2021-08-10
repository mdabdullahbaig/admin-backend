const mongoose = require("mongoose");
const User = require("../models/user");
const HttpError = require("../util/HttpError");
const { signupSchema } = require("../util/joiSchema");

const signupUser = async (req, res, next) => {
  try {
    const validateSchema = await signupSchema.validateAsync(req.body);
  } catch (err) {
    const error = new HttpError(err.message, 422);
    next(error);
  }

  const { firstName, lastName, email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    firstName,
    lastName,
    email,
    password,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const loginUser = async (req, res, next) => {
  try {
    const validateSchema = await loginSchema.validateAsync(req.body);
  } catch (err) {
    const error = new HttpError(err.message, 422);
    next(error);
  }

  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      "Login is failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "Invalid creadentials, could not log you in.",
      401
    );
    return next(error);
  }

  return res.json({ message: "Logged In!" });
};

const getUsers = async (req, res, next) => {
  console.log("getting users");
  return res.send({ mess: "hello" });
};

const getUserById = async (req, res, next) => {};

const updateUserById = async (req, res, next) => {};

const deleteUserById = async (req, res, next) => {};

exports.signupUser = signupUser;
exports.loginUser = loginUser;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;
