/* eslint-disable @typescript-eslint/no-var-requires */
//Moves every inline base64 pet image out of MongoDB and into Cloudinary.
//
//Nothing is deleted: before a pet is touched, its original document is copied
//into the `pets_image_backup` collection (and appended to a local JSONL dump
//if BACKUP_FILE is set), and only then is `image` swapped for the hosted URL.
//Re-running is safe — pets whose image is already a URL are skipped, and
//uploads reuse the pet's _id as the Cloudinary public ID.
//
//Usage:  node scripts/migrateImagesToCloudinary.js          (dry run)
//        node scripts/migrateImagesToCloudinary.js --apply  (migrate)
const path = require("path");
const fs = require("fs");
const { loadEnvConfig } = require("@next/env");
const mongoose = require("mongoose");
const { v2: cloudinary } = require("cloudinary");

loadEnvConfig(path.join(__dirname, ".."));

const APPLY = process.argv.includes("--apply");
const FOLDER = "brighteyes/pets";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const optimizedUrl = (publicId, version) =>
  `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/v${version}/${publicId}`;

async function main() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set");
  }
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error("CLOUDINARY_* env vars are not set");
  }

  await mongoose.connect(process.env.MONGO_URI);
  const db = mongoose.connection.db;
  const pets = db.collection("pets");
  const backups = db.collection("pets_image_backup");

  const toMigrate = await pets
    .find({ image: { $regex: "^data:" } })
    .project({ name: 1, image: 1 })
    .toArray();
  const total = await pets.countDocuments();

  console.log(`Pets in database              : ${total}`);
  console.log(`Pets with inline base64 image : ${toMigrate.length}`);
  const inlineBytes = toMigrate.reduce((sum, p) => sum + p.image.length, 0);
  console.log(
    `Inline image data             : ${(inlineBytes / 1024 / 1024).toFixed(
      2
    )} MB`
  );

  if (!APPLY) {
    for (const pet of toMigrate) {
      console.log(
        ` would migrate: ${pet._id}  ${pet.name}  (${(
          pet.image.length / 1024
        ).toFixed(0)} KB)`
      );
    }
    console.log("\nDry run only — re-run with --apply to migrate.");
    return;
  }

  const backupFile =
    process.env.BACKUP_FILE ||
    path.join(__dirname, `pets-image-backup-${Date.now()}.jsonl`);
  console.log(`Local backup dump             : ${backupFile}\n`);

  let migrated = 0;
  let failed = 0;

  for (const pet of toMigrate) {
    const id = String(pet._id);
    try {
      //1. Preserve the original before anything else.
      await backups.updateOne(
        { petId: pet._id },
        {
          $set: {
            petId: pet._id,
            name: pet.name,
            image: pet.image,
            backedUpAt: new Date(),
          },
        },
        { upsert: true }
      );
      fs.appendFileSync(
        backupFile,
        JSON.stringify({ petId: id, name: pet.name, image: pet.image }) + "\n"
      );

      //2. Upload. The pet's _id is the public ID, so re-runs reuse the asset
      //   instead of duplicating it.
      const uploaded = await cloudinary.uploader.upload(pet.image, {
        folder: FOLDER,
        public_id: id,
        overwrite: false,
      });

      //3. Swap the inline image for the hosted URL.
      const url = optimizedUrl(uploaded.public_id, uploaded.version);
      await pets.updateOne({ _id: pet._id }, { $set: { image: url } });

      migrated += 1;
      console.log(`migrated ${id}  ${pet.name}  -> ${url}`);
    } catch (error) {
      failed += 1;
      console.error(`FAILED   ${id}  ${pet.name}: ${error.message || error}`);
    }
  }

  console.log(`\nDone. migrated=${migrated} failed=${failed}`);
  console.log(
    "Originals kept in the pets_image_backup collection and the dump file above."
  );
}

main()
  .then(() => mongoose.disconnect())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
