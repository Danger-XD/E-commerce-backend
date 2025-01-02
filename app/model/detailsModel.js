import mongoose from "mongoose";

const detailSchema = new mongoose.Schema(
  {
    img1: { type: String, required: true },
    img2: { type: String, required: true },
    img3: { type: String, required: true },
    img4: { type: String, required: true },
    img5: { type: String, required: true },
    img6: { type: String },
    img7: { type: String },
    img8: { type: String },
    des: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "productDetails",
  }
);

const productDetailsModel = mongoose.model("productDetails", detailSchema);
export default productDetailsModel;
