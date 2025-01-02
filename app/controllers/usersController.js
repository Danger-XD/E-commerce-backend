import {
  createProductReviewService,
  updateProductReviewService,
} from "../services/productReviewService.js";
import {
  createUserProfileService,
  loginService,
  readUserProfileService,
  updateUserProfileService,
  verifyLoginService,
} from "../services/userServices.js";

export const login = async (req, res) => {
  let result = await loginService(req);
  return res.json(result);
};

export const verifyLogin = async (req, res) => {
  let result = await verifyLoginService(req);
  if (result.status === "success") {
    let cookieOption = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: false,
    };
    //set token to cookie
    res.cookie("token", result["token"], cookieOption);
    return res.json(result);
  } else {
    return res.json(result);
  }
};

export const logout = async (req, res) => {
  // remove token from cookie - way 1
  // res.clearCookie("token");
  //way - 2
  let cookieOption = {
    expires: new Date(0),
    httpOnly: false,
  };
  // set token to cookie
  res.cookie("token", "", cookieOption); //make sure to set token empty
  return res
    .status(200)
    .json({ status: "success", message: "logout successfully" });
};

export const createUserProfile = async (req, res) => {
  let result = await createUserProfileService(req);
  return res.json(result);
};

export const updateUserProfile = async (req, res) => {
  let result = await updateUserProfileService(req);
  return res.json(result);
};

export const readUserProfile = async (req, res) => {
  let result = await readUserProfileService(req);
  return res.json(result);
};

export const createProductReview = async (req, res) => {
  let result = await createProductReviewService(req);
  return res.status(200).json(result);
};

export const updateProductReview = async (req, res) => {
  let result = await updateProductReviewService(req);
  return res.json(result);
};
