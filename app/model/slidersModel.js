import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    des: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    productID: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "productSliders", //if we use cameCase naming for the collection
  }
);

const slidersModel = mongoose.model("productSliders", sliderSchema);
export default slidersModel;
