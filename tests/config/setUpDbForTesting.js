const database = require("./database");

const setUpDbForTesting = () => {
  beforeAll(async () => {
    database.connect();
  });

  afterAll(async () => {
    await database.clear();
    await database.close();
  });
}

module.exports = setUpDbForTesting;