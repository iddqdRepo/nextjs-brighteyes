//Derives the test-database URI from MONGO_URI by swapping the database name.
//Tests share the free Atlas cluster (no second cluster needed) but read and
//write only the brighteyes_test database, never live data.
const TEST_DB = "brighteyes_test";

module.exports = function testDbUri(baseUri = process.env.MONGO_URI) {
  if (!baseUri) {
    throw new Error("MONGO_URI is not set");
  }
  const url = new URL(baseUri);
  url.pathname = `/${TEST_DB}`;
  return url.toString();
};

module.exports.TEST_DB = TEST_DB;
