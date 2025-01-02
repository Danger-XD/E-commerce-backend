import mongoose from "mongoose";

const wishesSchema = new mongoose.Schema(
  {
    productID: { type: mongoose.Schema.Types.ObjectId, required: true },
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const wishesModel = mongoose.model("wishes", wishesSchema);
export default wishesModel;
