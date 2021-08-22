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

router.patch("/:id", auth, updateUserById);

router.delete("/:id", auth, deleteUserById);

module.exports = router;
