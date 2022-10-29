const express = require("express");
const passport = require("passport");
const connectEnsureLogin = require('connect-ensure-login');
const { loginUser, createUser } = require("../controller/auth.controller");
const Post = require("../models/Post");
const router = express.Router();

router.get("/in", async (req, res) => {
  const posts = await Post.findAllPublished();
  res.render("in", { posts, user: req.user });
});

router.get("/write", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  res.render("write");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", loginUser);

router.get("/signup", (req, res) => {
  res.render("signup");
});

// router.post("/signup", passport.authenticate("jwt", { session: false }), createUser);
router.post("/signup", createUser);

module.exports = router;