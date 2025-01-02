import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    brandName: { type: String, required: true, unique: true },
    brandImg: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const brandsModel = mongoose.model("brands", brandSchema);
export default brandsModel;
