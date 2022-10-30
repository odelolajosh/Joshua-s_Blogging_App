const mongoose = require("mongoose");
const Post = require("../../models/Post");
const User = require("../../models/User");
const MONGO_URI = "mongodb://localhost:27017/joshua_blog_app_test";

module.exports = {
  clear: async () => {
    await Promise.all([
      User.deleteMany({}),
      Post.deleteMany({})
    ]);
  },
  connect: (done) => {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.once('connected', () => {
      done?.();
    });

    mongoose.connection.on('error', (err) => {
      console.log(err);
      done(err)
    });
  },
  close: async () => {
    await mongoose.connection.close();
  }
}