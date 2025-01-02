import reviewsModel from "../model/reviewsModel.js";

export const createProductReviewService = async (req) => {
  try {
    let user_id = req.headers["user_id"];
    let { productID, des, rating } = req.body;
    let postJSON = {
      rating: rating,
      des: des,
      productID: productID,
      userID: user_id,
    };
    await reviewsModel.updateOne(
      { userID: user_id, productID: productID },
      { $set: postJSON },
      { upsert: true }
    );
    return { status: "success", message: "review added" };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
export const updateProductReviewService = async (req) => {
  try {
    let user_id = req.headers["user_id"];
    let { productID, des, rating } = req.body;
    let postJSON = {
      rating: rating,
      des: des,
      productID: productID,
      userID: user_id,
    };
    await reviewsModel.updateOne(
      { userID: user_id, productID: productID },
      { $set: postJSON },
      { upsert: true }
    );
    return { status: "success", message: "review updated" };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
