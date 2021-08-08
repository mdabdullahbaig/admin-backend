const mongoose = require("mongoose");

const User = require("../models/user");

const createUser = async (req, res) => {
  console.log("user created");
};

const getUsers = async (req, res, next) => {
  console.log("getting users");
  return res.send({ mess: "hello" });
};

exports.createUser = createUser;
exports.getUsers = getUsers;
