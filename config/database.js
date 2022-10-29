const mongoose = require("mongoose");
const logger = require("../utils/logger");

const MONGO_URI = process.env.MONGO_URI;

exports.connectToDatabase = () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    logger.info("Connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    logger.error(err);
  });
}