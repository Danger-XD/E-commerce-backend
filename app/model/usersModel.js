import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true },
    otp: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const usersModel = mongoose.model("users", userSchema);
export default usersModel;
