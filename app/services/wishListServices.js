import wishesModel from "../model/wishesModel.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const createWishService = async (req) => {
  try {
    let user_id = req.headers["user_id"];
    let { productID } = req.body;
    let postJSON = {
      productID: productID,
      userID: user_id,
    };
    await wishesModel.updateOne(postJSON, { $set: postJSON }, { upsert: true });
    return { status: "success", message: "create successfully" };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
export const readWishListService = async (req) => {
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
    let data = await wishesModel.aggregate([matchStage, joinStageProduct]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
export const removeWishService = async (req) => {
  try {
    let user_id = req.headers["user_id"];
    let { productID } = req.body;
    let postJSON = {
      productID: productID,
      userID: user_id,
    };
    await wishesModel.deleteOne(postJSON);
    return { status: "success", message: "deleted successfully" };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
