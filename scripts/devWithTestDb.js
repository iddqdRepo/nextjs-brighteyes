/* eslint-disable @typescript-eslint/no-var-requires */
//Runs `next dev` against the throwaway brighteyes_test database instead of
//live data, so local testing can never touch real animals, forms or users.
//Seeds the fixture data automatically whenever the test database is empty.
//
//Log in locally with testadmin / test-password-123 (see seedTestDb.js).
//Use `npm run dev:live` only when you deliberately need real data locally.
const path = require("path");
const { spawn, spawnSync } = require("child_process");
const { loadEnvConfig } = require("@next/env");
const testDbUri = require("./testDbUri");

loadEnvConfig(path.join(__dirname, ".."));

const uri = testDbUri();

async function testDbIsEmpty() {
  const mongoose = require("mongoose");
  await mongoose.connect(uri);
  const users = await mongoose.connection.collection("users").countDocuments();
  await mongoose.disconnect();
  return users === 0;
}

async function main() {
  if (await testDbIsEmpty()) {
    console.log("Test database is empty — seeding fixtures...");
    const seed = spawnSync(
      process.execPath,
      [path.join(__dirname, "seedTestDb.js")],
      { stdio: "inherit" }
    );
    if (seed.status !== 0) {
      process.exit(seed.status ?? 1);
    }
  }

  console.log(
    `\nDev server is using the TEST database (${testDbUri.TEST_DB}) — safe to experiment.\n` +
      `Log in with testadmin / test-password-123.\n` +
      `Need real data? Run "npm run dev:live" instead (careful: edits are live!).\n`
  );

  //The real environment beats .env.local in Next's env loading, so this
  //override is what the dev server's dbConnect actually sees.
  const next = spawn(
    process.execPath,
    [require.resolve("next/dist/bin/next"), "dev"],
    {
      stdio: "inherit",
      env: {
        ...process.env,
        MONGO_URI: uri,
        //A local form-persistence test must not send a real email.
        FORM_NOTIFICATIONS_DISABLED: "true",
        //Prefer Stripe's explicitly test-only key if card checkout is tested.
        STRIPE_SECRET_KEY: process.env.STRIPE_SK_TEST || "",
      },
    }
  );
  next.on("exit", (code) => process.exit(code ?? 0));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
