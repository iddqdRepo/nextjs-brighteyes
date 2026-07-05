/* eslint-disable @typescript-eslint/no-var-requires */
//Wipes and seeds the brighteyes_test database with known fixtures so CI and
//local e2e runs never depend on (or pollute) live data.
//
//Usage: node scripts/seedTestDb.js
const path = require("path");
const { loadEnvConfig } = require("@next/env");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const testDbUri = require("./testDbUri");

loadEnvConfig(path.join(__dirname, ".."));

//Test-only credentials; they exist solely in the throwaway test database.
const TEST_ADMIN = { username: "testadmin", password: "test-password-123" };

const PLACEHOLDER_IMAGE =
  "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto/sample";

async function main() {
  const uri = testDbUri();
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  //Refuse to wipe anything that isn't the dedicated test database.
  if (db.databaseName !== testDbUri.TEST_DB) {
    throw new Error(`Refusing to wipe database "${db.databaseName}"`);
  }
  await db.dropDatabase();

  const now = new Date();
  await db.collection("users").insertOne({
    username: TEST_ADMIN.username,
    password: bcrypt.hashSync(TEST_ADMIN.password, 10),
    authenticators: [],
    createdAt: now,
    updatedAt: now,
  });

  await db.collection("pets").insertMany([
    {
      type: "Dog",
      name: "Fixture Rex",
      age: "3",
      yearsOrMonths: "Years",
      sex: "Male",
      breed: "Collie",
      size: "Medium",
      image: PLACEHOLDER_IMAGE,
      suitableForChildren: "Yes",
      suitableForAnimals: "Yes",
      adopted: "No",
      desc: "Seeded test dog",
      createdAt: now,
      updatedAt: now,
    },
    {
      type: "Cat",
      name: "Fixture Whiskers",
      age: "2",
      yearsOrMonths: "Years",
      sex: "Female",
      breed: "Tabby",
      size: "Small",
      image: PLACEHOLDER_IMAGE,
      suitableForChildren: "Yes",
      suitableForAnimals: "No",
      adopted: "No",
      desc: "Seeded test cat",
      createdAt: now,
      updatedAt: now,
    },
  ]);

  console.log(
    `Seeded ${db.databaseName}: 1 admin (${TEST_ADMIN.username}), 2 pets`
  );
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
