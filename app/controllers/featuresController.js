import {
  featureListService,
  legalListService,
} from "../services/featureServices.js";

export const featureList = async (req, res) => {
  let result = await featureListService(req, res);
  return res.status(200).json(result);
};

export const legalFeatures = async (req, res) => {
  let result = await legalListService(req);
  return res.status(200).json(result);
};
