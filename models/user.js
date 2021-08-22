const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { tokenInfo, hashPasswordInfo } = require("../config/local");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Number,
    rquired: true,
  },
});

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;
  delete userObject.isAdmin;

  return userObject;
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, tokenInfo.secret, {
    expiresIn: tokenInfo.expiration,
  });
  return token;
};

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      hashPasswordInfo.saltRounds
    );
  }

  next();
});

module.exports = model("User", userSchema);
