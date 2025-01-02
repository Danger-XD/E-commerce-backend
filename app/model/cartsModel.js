import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema(
  {
    productID: { type: mongoose.Schema.Types.ObjectId, required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    qty: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const cartsModel = mongoose.model("carts", cartsSchema);
export default cartsModel;
