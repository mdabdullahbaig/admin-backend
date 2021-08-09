const express = require("express");
const {
  signup,
  getUsers,
  login,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);

router.post("/signup", signup);

router.post("/login", login);

router.get("/:id", getUserById);

router.patch("/:id", updateUserById);

router.delete("/:id", deleteUserById);

module.exports = router;
