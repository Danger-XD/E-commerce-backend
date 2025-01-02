//creates route instance
// import express from "express";
// without destructuring
// const router = express.Router();
import { Router } from "express";
const router = Router();

import * as usersController from "../app/controllers/usersController.js";
import * as invoiceController from "../app/controllers/invoiceController.js";
import * as productsController from "../app/controllers/productsController.js";
import * as wishListsController from "../app/controllers/wishListsController.js";
import * as cartListsController from "../app/controllers/cartListsController.js";
import * as featureController from "../app/controllers/featuresController.js";
import authMiddleware from "../app/middleware/authMiddleware.js";

//user
router.post("/login", usersController.login);
router.post("/verifyLogin", usersController.verifyLogin);
router.post("/logout", authMiddleware, usersController.logout);
router.post(
  "/createUserProfile",
  authMiddleware,
  usersController.createUserProfile
);
router.post(
  "/updateUserProfile",
  authMiddleware,
  usersController.updateUserProfile
);
router.get("/readUserProfile", authMiddleware, usersController.readUserProfile);

//brand
// import * as brandsController from "../app/controllers/brandsController.js"
// router.get("/brand",brandsController.brandList);

//categories
// import * as categoriesController from "../app/controllers/categoriesController.js"
// router.get("/categoryList",categoriesController.categoryList);

//cart
router.post("/createCart", authMiddleware, cartListsController.createCart);
router.get("/readCartList", authMiddleware, cartListsController.readCartList);
router.post(
  "/updateCart/:cartID",
  authMiddleware,
  cartListsController.updateCart
);
router.post("/removeCart", authMiddleware, cartListsController.removeCart);

//wishList
router.post("/createWish", authMiddleware, wishListsController.createWish);
router.get("/readWishList", authMiddleware, wishListsController.readWishList);
router.post("/removeWish", authMiddleware, wishListsController.removeWish);

//review
router.post(
  "/createProductReview",
  authMiddleware,
  usersController.createProductReview
);
router.post(
  "/updateProductReview",
  authMiddleware,
  usersController.createProductReview
);

//product
router.get("/productBrandList", productsController.productBrandList);
router.get("/productCategoryList", productsController.productCategoryList);
router.get("/productSliderList", productsController.productSliderList);
router.get(
  "/productListByBrand/:BrandID",
  productsController.productListByBrand
);
router.get(
  "/productListByCategory/:CategoryID",
  productsController.productListByCategory
);
router.get(
  "/productListBySimilar/:CategoryID",
  productsController.productListBySimilar
);
router.get(
  "/productListByKeyword/:Keyword",
  productsController.productListByKeyword
);
router.get(
  "/productListByRemark/:Remark",
  productsController.productListByRemark
);
router.get("/productDetailsID/:ProductID", productsController.productDetailsID);
router.get(
  "/productReviewListByID/:ProductID",
  productsController.productReviewListByID
);
router.post("/productListByFilter",productsController.productListByFilter);

//invoice
router.get("/createInvoice", authMiddleware, invoiceController.createInvoice);
router.get("/invoiceList", authMiddleware, invoiceController.invoiceList);
router.get(
  "/invoiceDetails/:invoiceID",
  authMiddleware,
  invoiceController.invoiceDetails
);
router.post("/paymentSuccess/:trxdID", invoiceController.paymentSuccess);
router.post("/paymentCancel/:trxdID", invoiceController.paymentCancel);
router.post("/paymentFailed/:trxdID", invoiceController.paymentFailed);
router.post("/paymentIPN/:trxdID", invoiceController.paymentIPN);

// feature List
router.get("/featureList", featureController.featureList);
router.get("/legal-features/:type", featureController.legalFeatures);

export default router;
