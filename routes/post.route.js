const express = require("express");
const passport = require("passport");
const connectEnsureLogin = require('connect-ensure-login');
const { getAllPosts, getPost, createPost, updatePost, publishPost, getAllDrafts, renderDrafts, renderPostToEdit, renderPostToView, deletePost, unpublishPost } = require("../controller/post.controller");

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", passport.authenticate("jwt", { session: false }), createPost);

router.get("/draft", passport.authenticate("jwt", { session: false }), getAllDrafts);
router.get("/drafts", connectEnsureLogin.ensureLoggedIn(), renderDrafts);

router.get("/:id", getPost);
router.get("/:id/view", renderPostToView);
router.get("/:id/edit", connectEnsureLogin.ensureLoggedIn(), renderPostToEdit);
router.patch("/:id/publish", passport.authenticate("jwt", { session: false }), publishPost);
router.patch("/:id/unpublish", passport.authenticate("jwt", { session: false }), unpublishPost);

router.put("/:id", passport.authenticate("jwt", { session: false }), updatePost);
router.delete("/:id", passport.authenticate("jwt", { session: false }), deletePost);


module.exports = router;