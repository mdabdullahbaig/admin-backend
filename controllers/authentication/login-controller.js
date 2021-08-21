const bcrypt = require("bcrypt");
const User = require("../../models/user");
const HttpError = require("../../util/HttpError");
const { loginSchema } = require("../../util/joiSchema");

const login = async (req, res, next) => {
  try {
    const validateSchema = await loginSchema.validateAsync(req.body);
  } catch (err) {
    const error = new HttpError(err.message, 422);
    return next(error);
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

  if (!existingUser) {
    const error = new HttpError(
      "Invalid creadentials, could not log you in.",
      401
    );
    return next(error);
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Login is failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Password is not correct.", 500);
    return next(error);
  }

  const token = existingUser.generateAuthToken();

  return res.status(201).json({ token });
};

exports.login = login;
