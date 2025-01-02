import mongoose, { Schema } from "mongoose";
const dataSchema = new Schema(
  {
    type: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const legalModel = mongoose.model("legals", dataSchema);
export default legalModel;
