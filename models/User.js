import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
  },
  { collection: "user" }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);