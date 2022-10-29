const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");

dotenv.config();

const { connectToDatabase } = require("./config/database");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const app = express();

const authRoute = require("./routes/auth.route");
const postRoute = require("./routes/post.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    }
  })
);

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set("views", "views");

require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("index");
});

app.use(authRoute);
app.use("/post", postRoute);

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message,
  });
});

connectToDatabase();

app.listen(PORT, HOST, () => {
  console.log(`Blogging App running at http://${HOST}:${PORT}`);
});