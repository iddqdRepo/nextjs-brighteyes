import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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
