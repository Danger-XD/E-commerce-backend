import {
  createWishService,
  readWishListService,
  removeWishService,
} from "../services/wishListServices.js";

export const createWish = async (req, res) => {
  let result = await createWishService(req);
  return res.json(result);
};
export const readWishList = async (req, res) => {
  let result = await readWishListService(req);
  return res.json(result);
};
export const removeWish = async (req, res) => {
  let result = await removeWishService(req);
  return res.json(result);
};
