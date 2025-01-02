import mongoose, { Schema } from "mongoose";

const featureSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const featuresModel = mongoose.model("features", featureSchema);
export default featuresModel;
