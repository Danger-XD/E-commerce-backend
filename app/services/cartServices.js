import cartsModel from "../model/cartsModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const createCartService = async (req) => {
  try {
    let user_id = req.headers["user_id"];
    let { productID, color, qty, size } = req.body;
    let postJSON = {
      productID: productID,
      userID: user_id,
      color: color,
      qty: qty,
      size: size,
    };
    await cartsModel.create(postJSON);
    return { status: "success", message: "add to cart successful" };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
export const updateCartService = async (req) => {
  try {
    let user_id = req.headers["user_id"];
    let cartId = req.params["cartID"];
    let { color, size, qty } = req.body;
    let postJSON = {
      color: color,
      qty: qty,
      size: size,
    };
    await cartsModel.updateOne(
      { userID: user_id, _id: cartId },
      { $set: postJSON }
    );
    return { status: "success", message: "updated successfully" };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
export const readCartListService = async (req) => {
  try {
    let user_id = new ObjectId(req.headers["user_id"]);
    // console.log(user_id);
    let matchStage = { $match: { userID: user_id } };
    let joinStageProduct = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    let data = await cartsModel.aggregate([matchStage, joinStageProduct]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
export const removeCartService = async (req) => {
  try {
    let user_id = req.headers["user_id"];
    let { id } = req.body;
    let postJSON = {
      _id: id,
      userID: user_id,
    };
    // console.log(postJSON);
    let data = await cartsModel.deleteOne(postJSON);
    return { status: "success", message: "deleted successfully", data: data };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
