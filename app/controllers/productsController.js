import {
  listByBrandService,
  listByCategoryService,
  listByKeywordService,
  listByRemarkService,
  listByReviewService,
  productBrandListService,
  productCategoryListService,
  productDetailsService,
  productListByFilterService,
  productListBySimilarService,
  productSliderListService,
} from "../services/productServices.js";

export const productBrandList = async (req, res) => {
  let result = await productBrandListService(req, res);
  return res.json(result);
};
export const productCategoryList = async (req, res) => {
  let result = await productCategoryListService(req, res);
  return res.json(result);
};
export const productSliderList = async (req, res) => {
  let result = await productSliderListService(req, res);
  return res.json(result);
};

export const productListByBrand = async (req, res) => {
  let result = await listByBrandService(req);
  return res.json(result);
};

export const productListByCategory = async (req, res) => {
  let result = await listByCategoryService(req);
  return res.json(result);
};

export const productListBySimilar = async (req, res) => {
  let result = await productListBySimilarService(req, res);
  return res.json(result);
};

export const productListByKeyword = async (req, res) => {
  let result = await listByKeywordService(req);
  return res.json(result);
};

export const productListByRemark = async (req, res) => {
  let result = await listByRemarkService(req);
  return res.json(result);
};

export const productDetailsID = async (req, res) => {
  let result = await productDetailsService(req);
  return res.json(result);
};

export const productReviewListByID = async (req, res) => {
  let result = await listByReviewService(req);
  return res.json(result);
};

export const productListByFilter = async (req, res) => {
  let result = await productListByFilterService(req);
  return res.json(result);
};
