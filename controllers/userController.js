const mongoose = require("mongoose");

const User = require("../models/user");

const signup = async (req, res, next) => {
  console.log("user created");
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
};

const getUsers = async (req, res, next) => {
  console.log("getting users");
  return res.send({ mess: "hello" });
};

const getUserById = async (req, res, next) => {};

const updateUserById = async (req, res, next) => {};

const deleteUserById = async (req, res, next) => {};

exports.signup = signup;
exports.login = login;
exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;
