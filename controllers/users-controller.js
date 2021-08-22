const moment = require("moment");
const User = require("../models/user");
const HttpError = require("../util/HttpError");
const { updateUserSchema } = require("../util/joiSchema");

const getUsers = async (req, res, next) => {
  if (!req.currentUser.isAdmin) {
    const error = new HttpError("Unauthorized", 403);
    return next(error);
  }
  let users;

  try {
    users = await User.find({}).exec();
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }

  return res.json(users);
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;

  if (req.currentUser.userId !== id) {
    const error = new HttpError("Unauthorized", 403);
    return next(error);
  }

  let user;

  try {
    user = await User.findById(id).exec();
  } catch (err) {
    const error = new HttpError(
      "Fetching user failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find a user for the provided id.",
      404
    );
    return next(error);
  }

  return res.json(user);
};

const updateUserById = async (req, res, next) => {
  const { id } = req.params;

  if (req.currentUser.userId !== id) {
    const error = new HttpError("Unauthorized", 403);
    return next(error);
  }

  try {
    const validateSchema = await updateUserSchema.validateAsync(req.body);
  } catch (err) {
    const error = new HttpError(err.message, 422);
    return next(error);
  }

  const { firstName, lastName } = req.body;

  let existingUser;

  try {
    existingUser = await User.findById(id).exec();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later.1",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Could not find a user for the provided id.",
      404
    );
    return next(error);
  }

  existingUser.firstName = firstName;
  existingUser.lastName = lastName;
  existingUser.updatedAt = moment().unix();

  try {
    await existingUser.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later.2",
      500
    );
    return next(error);
  }

  return res.status(200).json(existingUser);
};

const deleteUserById = async (req, res, next) => {
  const { id } = req.params;

  if (!req.currentUser.isAdmin) {
    const error = new HttpError("Unauthorized", 403);
    return next(error);
  }

  let user;

  try {
    user = await User.findById(id).exec();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find a user for the provided id.",
      404
    );
    return next(error);
  }

  try {
    await user.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later.",
      500
    );
    return next(error);
  }

  return res.status(200).json({
    message: "User has been deleted.",
  });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;
