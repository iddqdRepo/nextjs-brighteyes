import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      //Backstop against two same-named accounts racing past the API's
      //duplicate check; login/update/delete all look users up by username.
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    //Accounts created before roles existed have neither field; they are
    //treated as superusers so nobody loses access they already had. Only
    //"staff" is ever checked for — any other value means full access.
    role: {
      type: String,
      enum: ["superuser", "staff"],
    },
    //What a staff account may do. Ignored for superusers, who can do
    //everything including managing the team itself.
    permissions: {
      animals: { type: Boolean },
      forms: { type: Boolean },
      donations: { type: Boolean },
    },
    //WebAuthn passkeys registered for this admin (one per device). Binary
    //values are stored base64url-encoded.
    authenticators: [
      {
        credentialID: { type: String, required: true },
        credentialPublicKey: { type: String, required: true },
        counter: { type: Number, required: true, default: 0 },
        transports: [String],
      },
    ],
  },
  { timestamps: true }
);

// const UserModel = mongoose.model("User", userSchema);

export default mongoose.models.User || mongoose.model("User", userSchema);
