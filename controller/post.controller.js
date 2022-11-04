const { PostState } = require("../constants");
const Post = require("../models/Post");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");
const { getReadTime } = require("../utils/postUtils");
const { CreatePostSchema } = require("../validations/post.validation");

exports.getAllPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  const total = await Post.countDocuments({ state: PostState.PUBLISHED })
  const totalPages = Math.ceil(total / limit);
  const posts = await Post.findAllPublished().populate("author").skip(skip).limit(limit);
  res.status(200).json({
    success: true,
    posts,
    page,
    total: totalPages,
  });
});

exports.getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author");
  if (!post) {
    throw new AppError("Post not found", 404);
  }
  res.status(200).json({
    success: true,
    post,
  });
});

exports.getAllDrafts = asyncHandler(async (req, res) => {
  // const { id: postId } = req.params;
  const post = await Post.find();
  res.status(200).json({
    success: true,
    post,
  });
});

exports.renderDrafts = asyncHandler(async (req, res) => {
  const posts = await Post.findDraftsByAuthor(req.user._id);
  res.render("drafts", { posts, user: req.user });
});

exports.createPost = asyncHandler(async (req, res) => {
  const { error: validationError, value } = CreatePostSchema.validate(req.body);
  if (validationError) {
    throw new AppError(validationError, 400);
  }
  value.author = req.user._id;
  value.read_time = getReadTime(value.body);
  const post = await Post.create(value);
  res.status(201).json({
    success: true,
    post,
  });
});

exports.updatePost = asyncHandler(async (req, res) => {
  const { error: validationError, value } = CreatePostSchema.validate(req.body);
  if (validationError) {
    throw new AppError(validationError, 400);
  }
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new AppError("Post not found", 404);
  }
  if (post.author.toString() !== req.user._id.toString()) {
    throw new AppError("Unauthorized", 401);
  }
  value.read_time = getReadTime(value.body);
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, value, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    post: updatedPost,
  });
});

exports.publishPost = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findById(postId);
  if (req.user._id.toString() !== post.author.toString()) {
    throw new AppError("You are not authorized", 404)
  }
  post.state = PostState.PUBLISHED;
  await post.save();
  res.status(200).json({
    success: true,
    post,
  });
})

exports.unpublishPost = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findById(postId);
  if (req.user._id.toString() !== post.author.toString()) {
    throw new AppError("You are not authorized", 404)
  }
  post.state = PostState.DRAFT;
  await post.save();
  res.status(200).json({
    success: true,
    post,
  });
})

exports.renderPostToView = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findById(postId);
  res.render("view", { post, user: req.user });
});

exports.renderPostToEdit = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findById(postId);
  if (req.user._id.toString() !== post.author.toString()) {
    throw new AppError("You are not authorized", 404)
  }
  res.render("edit", { post, user: req.user });
});

exports.deletePost = asyncHandler(async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findById(postId);
  if (req.user._id.toString() !== post.author.toString()) {
    throw new AppError("You are not authorized", 404)
  }
  await Post.findByIdAndDelete(postId);
  res.status(200).json({
    success: true,
  });
})