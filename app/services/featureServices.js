import legalModel from "../model/legalModel.js";
import featuresModel from "./../model/featuresModel.js";
export const featureListService = async (req, res) => {
  try {
    let data = await featuresModel.find();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};

export const legalListService = async (req, res) => {
  try {
    let reqType = req.params.type;
    let data = await legalModel.find({ type: reqType });
    return { status: "success", data: data };
  } catch (error) {
    return { status: "failed", error: error.toString() };
  }
};
