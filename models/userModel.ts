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
  },
  { timestamps: true }
);

// const UserModel = mongoose.model("User", userSchema);

export default mongoose.models.User || mongoose.model("User", userSchema);
