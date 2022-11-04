const express = require("express");
const passport = require("passport");
const { getAllPosts, getPost, createPost, updatePost, publishPost, getAllDrafts, deletePost, unpublishPost } = require("../controller/post.controller");

const router = express.Router();

router.get("/", getAllPosts);

router.post("/", passport.authenticate("jwt", { session: false }), createPost);

router.get("/draft", passport.authenticate("jwt", { session: false }), getAllDrafts);

router.get("/:id", getPost);

router.patch("/:id/publish", passport.authenticate("jwt", { session: false }), publishPost);

router.patch("/:id/unpublish", passport.authenticate("jwt", { session: false }), unpublishPost);

router.put("/:id", passport.authenticate("jwt", { session: false }), updatePost);

router.delete("/:id", passport.authenticate("jwt", { session: false }), deletePost);


module.exports = router;