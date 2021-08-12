const express = require("express");

const { signup } = require("../controllers/authentication/signup-controller");
const { login } = require("../controllers/authentication/login-controller");

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

module.exports = router;
