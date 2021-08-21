const express = require("express");
const auth = require("../middleware/auth");

const {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/users-controller");

const router = express.Router();

router.get("/", auth, getUsers);

router.get("/:id", auth, getUserById);

router.patch("/:id", updateUserById);

router.delete("/:id", deleteUserById);

module.exports = router;
