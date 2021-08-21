const User = require("../models/user");
const HttpError = require("../util/HttpError");
const { updateUserSchema } = require("../util/joiSchema");

const getUsers = async (req, res, next) => {
  if (!req.currentUser.isAdmin) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  let users;

  try {
    users = await User.find({}, "-password").exec();
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }

  return res.json({
    users: users.map((user) => user.toObject({ getters: true })),
  });
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.currentUser.userId);
  console.log(id);

  if (req.currentUser.userId !== id) {
    const error = new HttpError(
      "Could not find a user for the provided id.",
      404
    );
    return next(error);
  }

  let user;

  try {
    user = await User.findById(id, "-password").exec();
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

  return res.json({
    user: user.toObject({ getters: true }),
  });
};

const updateUserById = async (req, res, next) => {
  try {
    const validateSchema = await updateUserSchema.validateAsync(req.body);
  } catch (err) {
    const error = new HttpError(err.message, 422);
    return next(error);
  }

  const { firstName, lastName } = req.body;
  const { id } = req.params;

  let existingUser;

  try {
    existingUser = await User.findById(id, "-password").exec();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
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

  try {
    await existingUser.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, please try again later.",
      500
    );
    return next(error);
  }

  return res
    .status(200)
    .json({ user: existingUser.toObject({ getters: true }) });
};

const deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  let user;

  try {
    user = await User.findById(id, "-password").exec();
  } catch (err) {
    const error = new HttpError(
      "Fetching user failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find a place for the provided id.",
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
