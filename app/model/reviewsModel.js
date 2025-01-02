import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, required: true },
    des: { type: String, required: true },
    rating: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const reviewsModel = mongoose.model("reviews", reviewSchema);
export default reviewsModel;
