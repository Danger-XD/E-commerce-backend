import mongoose from "mongoose";
import cartsModel from "../model/cartsModel.js";
import profilesModel from "../model/profilesModel.js";
import invoicesModel from "../model/invoicesModel.js";
import invoiceProductsModel from "../model/invoiceProductsModel.js";
import axios from "axios";
const ObjectID = mongoose.Types.ObjectId;
import FormData from "form-data";

export const createInvoiceService = async (req, res) => {
  try {
    let user_id = new ObjectID(req.headers["user_id"]);
    let cus_email = req.headers.email;
    // console.log(user_id + " " + cus_email);

    //calculation of total payable amount
    let matchStage = { $match: { userID: user_id } };
    let joinStageProduct = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    let unWindStage = { $unwind: "$product" };
    let cartProducts = await cartsModel.aggregate([
      matchStage,
      joinStageProduct,
      unWindStage,
    ]);
    let totalAmount = 0;
    cartProducts.forEach((elem) => {
      let price;
      if (elem.product.discount) {
        price = parseFloat(elem.product.discountPrice);
      } else {
        price = parseFloat(elem.product.price);
      }
      totalAmount += parseFloat(elem.qty) * price;
    });
    let vat = totalAmount * 0.05;
    let payable = totalAmount + vat;

    //customer and shipping detail
    let profile = await profilesModel.aggregate([matchStage]);
    let cusDetails = `Name:${profile[0]["cus_name"]}, Email:${cus_email}, Address:${profile[0]["cus_add"]}, Phone:${profile[0]["cus_phone"]} `;
    let shipDetails = `Name:${profile[0]["ship_name"]}, City:${profile[0]["ship_city"]}, Address:${profile[0]["ship_add"]}, Phone:${profile[0]["ship_phone"]} `;

    //transaction and other Ids
    let trxdId =
      Math.floor(100000 + Math.random() * 900000) +
      Math.random().toString(36).slice(2, 8);
    let validId = 0;
    let deliveryStatus = "pending";
    let paymentStatus = "pending";

    //create invoice
    let createInvoice = await invoicesModel.create({
      userID: user_id,
      total: totalAmount,
      vat: vat,
      payable: payable,
      cus_details: cusDetails,
      ship_details: shipDetails,
      tran_ID: trxdId,
      val_ID: validId,
      delivery_status: deliveryStatus,
      payment_status: paymentStatus,
    });

    //invoice product
    let invoiceID = createInvoice["_id"];
    cartProducts.forEach(async (elem) => {
      let res = await invoiceProductsModel.create({
        userID: user_id,
        invoiceID: invoiceID,
        productID: elem["productID"],
        qty: elem.qty,
        price: elem["product"]["discount"]
          ? elem["product"]["discountPrice"]
          : elem["product"]["price"],
        color: elem.color,
        size: elem.size,
      });
    });

    //remove cart items after payment
    await cartsModel.deleteMany({ userID: user_id });

    //ssl commerce settings
    const form = new FormData();
    form.append("store_id", process.env.STORE_ID);
    form.append("store_passwd", process.env.STORE_PASSWORD);
    form.append("total_amount", payable.toString());
    form.append("currency", process.env.CURRENCY);
    form.append("tran_id", trxdId);
    form.append("success_url", `${process.env.FRONTEND_URL}/api/paymentSuccess/${trxdId}`);
    form.append("fail_url", `${process.env.FRONTEND_URL}/api/paymentFailed/${trxdId}`);
    form.append("cancel_url", `${process.env.FRONTEND_URL}/api/paymentCancel/${trxdId}`);
    form.append("ipn_url", `${process.env.FRONTEND_URL}/api/paymentIPN/${trxdId}`);

    form.append("cus_name", profile[0]["cus_name"]);
    form.append("cus_email", cus_email);
    form.append("cus_add1", profile[0]["cus_add"]);
    form.append("cus_add2", profile[0]["cus_add"]);
    form.append("cus_city", profile[0]["cus_city"]);
    form.append("cus_state", profile[0]["cus_state"]);
    form.append("cus_postcode", profile[0]["cus_postcode"]);
    form.append("cus_country", profile[0]["cus_country"]);
    form.append("cus_phone", profile[0]["cus_phone"]);
    form.append("cus_fax", profile[0]["cus_fax"]);

    form.append("shipping_method", "YES");
    form.append("ship_name", profile[0]["ship_name"]);
    form.append("ship_add1", profile[0]["ship_add"]);
    form.append("ship_add2", profile[0]["ship_add"]);
    form.append("ship_area", profile[0]["ship_add"]);
    form.append("ship_city", profile[0]["ship_city"]);
    form.append("ship_sub_city", profile[0]["ship_city"]);
    form.append("ship_state", profile[0]["ship_state"]);
    form.append("ship_country", profile[0]["ship_country"]);
    form.append("ship_postcode", profile[0]["ship_postcode"]);
    form.append("product_name", "According to Invoice");
    form.append("product_profile", "According to Invoice");
    form.append("product_category", "According to Invoice");
    form.append("product_amount", "According to Invoice");

    // form.append("num_of_item", 2);
    // form.append("weight_of_items", 2.00);
    // form.append("logistic_pickup_id",profile[0]["_id"].toString() );
    // form.append("logistic_delivery_type","According to Invoice");

    let sslRes = await axios.post(process.env.INIT_URL, form);
    // console.log(form);
    return { status: "success", data: sslRes.data };
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};

export const paymentSuccessService = async (req, res) => {
  try {
    let trxnId = req.params.trxdID;
    await invoicesModel.updateOne(
      { tran_ID: trxnId },
      { $set: { payment_status: "success" } }
    );
    return { status: "success" };
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};
export const paymentCancelService = async (req, res) => {
  try {
    let trxnId = req.params.trxdID;
    await invoicesModel.updateOne(
      { tran_ID: trxnId },
      { $set: { payment_status: "canceled" } }
    );
    return { status: "canceled" };
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};
export const paymentFailedService = async (req, res) => {
  try {
    let trxnId = req.params.trxdID;
    await invoicesModel.updateOne(
      { tran_ID: trxnId },
      { $set: { payment_status: "failed" } }
    );
    return { status: "failed" };
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};

export const paymentIPNService = async (req, res) => {
  try {
    let trxnId = req.params.trxdID;
    let status = req.body.status;
    await invoicesModel.updateOne(
      { tran_ID: trxnId },
      { $set: { payment_status: status } }
    );
    return { status: "success" };
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};

export const invoiceListService = async (req, res) => {
  try {
    let user_id = req.headers["user_id"];
    let matchStage = { $match: { userID: new ObjectID(user_id) } };
    let invoices = await invoicesModel.aggregate([matchStage]);
    // let invoice = await invoicesModel.find({userID:user_id});
    return { status: "success", data: invoices };
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};
export const invoiceDetailsService = async (req, res) => {
  try {
    let user_id = new ObjectID(req.headers["user_id"]);
    let invoice_id = new ObjectID(req.params.invoiceID);
    let matchStage = { $match: { userID: user_id, invoiceID: invoice_id } };
    let joinStageProduct = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    let unWindStage = { $unwind: "$product" };
    let products = await invoiceProductsModel.aggregate([
      matchStage,
      joinStageProduct,
      unWindStage,
    ]);
    return { status: "success", data: products };
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};
