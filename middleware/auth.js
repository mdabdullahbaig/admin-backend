const jwt = require("jsonwebtoken");
const { tokenInfo } = require("../config/local");
const HttpError = require("../util/HttpError");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      const error = new HttpError("Authentication failed!", 401);
      return next(error);
    }

    const decodedToken = jwt.verify(token, tokenInfo.secret);

    const decodedUser = await User.findById(decodedToken._id);

    // console.log(decodedUser);

    if (!decodedUser) {
      const error = new HttpError("Authentication failed!!", 401);
      return next(error);
    }

    req.currentUser = {
      userId: decodedToken._id,
      isAdmin: decodedUser.isAdmin,
    };

    // console.log(req.currentUser);
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  }
};

module.exports = auth;
