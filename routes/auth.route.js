const express = require("express");
const { loginUser, createUser } = require("../controller/auth.controller");
const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", createUser);

module.exports = router;