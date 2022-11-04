const mongoose = require("mongoose");

mongoose.Promise = global.Promise;


module.exports = {
  /**
   * Connect to the in-memory database.
   */
  connect: (done) => {
    const MONGO_URI = "mongodb://localhost:27017/joshua_blog_app_test";
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

  /**
   * Drop all collections
   */
  clear: async () => {
    const models = mongoose.connection.models;
    await Promise.all(Object.keys(models).map(key => models[key].deleteMany({})));
  },

  /**
   * Close the Mongoose connection, and stop mongoServer.
   */
  close: async () => {
    await mongoose.disconnect();
  }
}