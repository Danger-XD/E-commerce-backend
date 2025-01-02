import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true, unique: true },
    categoryImg: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const categoriesModel = mongoose.model("categories", categorySchema);
export default categoriesModel;
