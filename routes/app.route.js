const Router = require('express').Router;
const connectEnsureLogin = require('connect-ensure-login');
const Post = require('../models/Post');
const { renderDrafts, renderPostToView, renderPostToEdit } = require('../controller/post.controller');
const { PostState } = require('../constants');

const router = Router();

router.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/in", async (req, res) => {
  const posts = await Post.findAllPublished().populate("author");
  res.render("in", { posts, user: req.user });
});

router.get("/write", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  res.render("write");
});

router.get("/drafts", connectEnsureLogin.ensureLoggedIn({ redirectTo: "/app/login" }), renderDrafts);

router.get("/post/:id/", renderPostToView);

router.get("/post/:id/edit", connectEnsureLogin.ensureLoggedIn({ redirectTo: "/app/login" }), renderPostToEdit);

module.exports = router;