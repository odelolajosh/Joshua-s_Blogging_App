const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const passport = require("passport");

/** login a user */
exports.loginUser = asyncHandler(async (req, res, next) => {
  passport.authenticate("login", { session: true },  asyncHandler(async (err, user, info) => {
    if (err || !user) {
      const message = err?.message || info.message;
      const statusCode = err?.status? 500 : 400;
      throw new AppError(message, statusCode);
    }
    req.login(user, { session: true }, async (error) => {
      if (error) return next(error);
      const token = await user.generateToken();
      res.status(200).json({
        success: true,
        message: "User logged in",
        token,
      });
    });
  }))(req, res, next);
});

/** create a user */
exports.createUser = asyncHandler(async (req, res, next) => {
  passport.authenticate("signup", { session: true }, async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new AppError(err.message, err.status);
        return next(error);
      }
      req.login(user, { session: true }, async (error) => {
        if (error) return next(error);
        const token = await user.generateToken();
        res.status(201).json({
          success: true,
          token,
          message: "User created",
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});