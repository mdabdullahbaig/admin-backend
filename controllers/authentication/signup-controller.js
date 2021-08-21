const moment = require("moment");
const User = require("../../models/user");
const HttpError = require("../../util/HttpError");
const { signupSchema } = require("../../util/joiSchema");

const signup = async (req, res, next) => {
  try {
    const validateSchema = await signupSchema.validateAsync(req.body);
  } catch (err) {
    const error = new HttpError(err.message, 422);
    return next(error);
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
    createdAt: moment().unix(),
    updatedAt: moment().unix(),
    isAdmin: true,
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

  const token = createdUser.generateAuthToken();

  return res.status(201).json({ token });
};

exports.signup = signup;
