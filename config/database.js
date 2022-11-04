const mongoose = require("mongoose");
const { __test__ } = require("../constants");
const setUpDbForTesting = require("../tests/config/setUpDbForTesting");
const logger = require("../utils/logger");

const MONGO_URI = process.env.MONGO_URI;

exports.connectToDatabase = () => {
  if (__test__) {
    setUpDbForTesting();
    return;
  }

  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    logger.info("Connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    logger.error(err);
    process.exit(1);
  });
}