import {
  createCartService,
  readCartListService,
  removeCartService,
  updateCartService,
} from "../services/cartServices.js";

export const createCart = async (req, res) => {
  let result = await createCartService(req);
  return res.json(result);
};

export const readCartList = async (req, res) => {
  let result = await readCartListService(req);
  return res.json(result);
};

export const updateCart = async (req, res) => {
  let result = await updateCartService(req);
  return res.json(result);
};

export const removeCart = async (req, res) => {
  let result = await removeCartService(req);
  return res.json(result);
};
