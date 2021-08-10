const express = require("express");
const {
  signupUser,
  getUsers,
  loginUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/users-controller");

const router = express.Router();

router.get("/", getUsers);

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/:id", getUserById);

router.patch("/:id", updateUserById);

router.delete("/:id", deleteUserById);

module.exports = router;
