import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    total: { type: String, required: true },
    vat: { type: String, required: true },
    payable: { type: String, required: true },
    cus_details: { type: String, required: true },
    ship_details: { type: String, required: true },
    tran_ID: { type: String, required: true },
    val_ID: { type: String, required: true },
    delivery_status: { type: String, required: true },
    payment_status: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const invoicesModel = mongoose.model("invoice", invoiceSchema);
export default invoicesModel;
