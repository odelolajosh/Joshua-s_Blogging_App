const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { Strategy: LocalStrategy } = require("passport-local");
const User = require('../models/User');
const AppError = require('../utils/AppError');
const { SignUpSchema } = require('../validations/user.validation');

passport.use(
  "login",
  new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
  }, async (email, password, done) => {
    try {
      const user = await User.findByCredentials(email, password);
      return done(null, user, "Logged in Successfully");
    } catch (error) {
      return done(error);
    }
  })
);

passport.use(
  "signup",
  new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  }, async (req, email, password, done) => {
    try {
      const { error: validationError, value } = SignUpSchema.validate(req.body);
      if (validationError) {
        throw new AppError(validationError, 400);
      }

      const { email, password, name } = value;
      const [first_name = "", last_name = ""] = name.split(" ");

      const user = await User.create({
        email,
        password,
        first_name,
        last_name,
      });

      return done(null, user, "User created successfully");
    } catch (error) {
      return done(error);
    }
  })
);

const jwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  jsonWebTokenOptions: {
    maxAge: process.env.JWT_EXPIRES_IN,
  }
};

passport.use(
  new JwtStrategy(jwtStrategyOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
});
