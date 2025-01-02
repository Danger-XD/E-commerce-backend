import brandsModel from "../model/brandsModel.js";
import categoriesModel from "../model/categoriesModel.js";
import productsModel from "../model/productsModel.js";
import reviewsModel from "../model/reviewsModel.js";
import slidersModel from "../model/slidersModel.js";
import mongoose from "mongoose";
const ObjectID = mongoose.Types.ObjectId;

export const productBrandListService = async (req, res) => {
  try {
    let data = await brandsModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};
export const productCategoryListService = async (req, res) => {
  try {
    let data = await categoriesModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};
export const productSliderListService = async (req, res) => {
  try {
    let data = await slidersModel.find();
    return { status: "success", data: data };
    // if (data.length === 0) {
    //   console.log("Nodata found");
    // }
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};

export const productListBySimilarService = async (req, res) => {
  try {
    let CategoryID = new ObjectID(req.params.CategoryID);
    let matchStage = { $match: { categoryID: CategoryID } };
    let limitStage = { $limit: 15 };
    let joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };
    let unwindCategoryStage = { $unwind: "$category" };
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    let data = await productsModel.aggregate([
      matchStage,
      limitStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};

export const listByBrandService = async (req) => {
  try {
    let BrandID = new ObjectID(req.params.BrandID);
    let matchStage = { $match: { brandID: BrandID } };
    let joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };
    let unwindCategoryStage = { $unwind: "$category" };
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    let data = await productsModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
export const listByCategoryService = async (req) => {
  try {
    let CategoryID = new ObjectID(req.params.CategoryID);
    let matchStage = { $match: { categoryID: CategoryID } };
    let joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };
    let unwindCategoryStage = { $unwind: "$category" };
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    let data = await productsModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
export const listByRemarkService = async (req) => {
  try {
    let remark = req.params.Remark;
    let matchStage = { $match: { remark: remark } };
    let joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };
    let unwindCategoryStage = { $unwind: "$category" };
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    let data = await productsModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
export const productDetailsService = async (req) => {
  try {
    let productID = new ObjectID(req.params.ProductID);
    let matchStage = { $match: { _id: productID } };
    let joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let joinWithDetailsStage = {
      $lookup: {
        from: "productDetails",
        localField: "_id",
        foreignField: "productID",
        as: "details",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };
    let unwindCategoryStage = { $unwind: "$category" };
    let unwindDetailsStage = { $unwind: "$details" };
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    let data = await productsModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      joinWithDetailsStage,
      unwindBrandStage,
      unwindCategoryStage,
      unwindDetailsStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
export const listByKeywordService = async (req) => {
  try {
    let Keyword = req.params.Keyword;
    let regex = { $regex: Keyword, $options: "i" }; //$options: "i" for making the search case insensitive
    let searchParams = [{ title: regex }, { shortDes: regex }];
    let searchQuery = { $or: searchParams };
    let matchStage = { $match: searchQuery };
    let joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };
    let unwindCategoryStage = { $unwind: "$category" };
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    let data = await productsModel.aggregate([
      matchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};
export const listByReviewService = async (req) => {
  try {
    let productID = new ObjectID(req.params.ProductID);
    let matchStage = { $match: { productID: productID } };
    let joinWithProfileStage = {
      $lookup: {
        from: "profiles",
        localField: "userID",
        foreignField: "userID",
        as: "profile",
      },
    };
    let unwindProfilesStage = { $unwind: "$profile" };
    let projectionStage = {
      $project: {
        des: 1,
        rating: 1,
        "profile.cus_name": 1,
      },
    };
    let data = await reviewsModel.aggregate([
      matchStage,
      joinWithProfileStage,
      unwindProfilesStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};

export const productListByFilterService = async (req) => {
  try {
    let matchCondition = {};
    if (req.body["categoryID"]) {
      matchCondition.categoryID = new ObjectID(req.body["categoryID"]);
    }
    if (req.body["brandID"]) {
      matchCondition.brandID = new ObjectID(req.body["brandID"]);
    }
    let matchStage = { $match: matchCondition };
    let addFieldStage = {
      $addFields: { numericPrice: { $toInt: "$price" } },
    };
    let priceMax = parseInt(req.body["priceMax"]);
    let priceMin = parseInt(req.body["priceMin"]);
    let priceMatchCondition = {};
    if (!isNaN(priceMin)) {
      priceMatchCondition["numericPrice"] = { $gte: priceMin };
    }
    if (!isNaN(priceMax)) {
      priceMatchCondition["numericPrice"] = {
        ...(priceMatchCondition["numericPrice"] || {}),
        $lte: priceMax,
      };
    }
    let priceMatchStage = { $match: priceMatchCondition };
    let joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };
    let unwindCategoryStage = { $unwind: "$category" };
    let projectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    let data = await productsModel.aggregate([
      matchStage,
      addFieldStage,
      priceMatchStage,
      joinWithBrandStage,
      joinWithCategoryStage,
      unwindBrandStage,
      unwindCategoryStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};
