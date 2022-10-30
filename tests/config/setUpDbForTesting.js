const database = require("./database");

const setUpDbForTesting = () => {
  beforeAll((done) => {
    database.connect(done);
  });

  afterAll(async () => {
    await database.clear();
    await database.close();
  });
}

module.exports = setUpDbForTesting;