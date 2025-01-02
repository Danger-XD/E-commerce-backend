import profilesModel from "../model/profilesModel.js";
import usersModel from "../model/usersModel.js";
import sendEmail from "../utilities/emailUtility.js";
import { tokenEncode } from "../utilities/tokenUtility.js";

export const loginService = async (req) => {
  try {
    let { email } = req.body;
    let code = Math.floor(100000 + Math.random() * 900000);
    let emailText = `Your verification code is ${code}`;
    let emailSubject = "Email verification";
    let data = await sendEmail(email, emailText, emailSubject);
    await usersModel.updateOne(
      { email: email },
      { $set: { otp: code } },
      { upsert: true }
    ); //upsert is to create if not exist
    return { status: "success", message: "message sent successfully" };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
export const verifyLoginService = async (req) => {
  try {
    let { email, otp } = req.body;
    let totalUser = await usersModel.find({ email: email, otp: otp });
    // let totalUser = await usersModel.find({email:email,otp:otp}).count("total");
    if (totalUser.length === 1) {
      let user_id = await usersModel
        .find({ email: email, otp: otp })
        .select("_id");
      let token = tokenEncode(email, user_id[0]["_id"].toString());
      await usersModel.updateOne({ email: email }, { $set: { otp: "0" } });
      return { status: "success", message: "login successful", token: token };
    } else {
      return { status: "failed", message: "invalid otp" };
    }
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
export const createUserProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await profilesModel.updateOne(
      { userID: user_id },
      { $set: reqBody },
      { upsert: true }
    );
    return { status: "success", message: "profile created successfully" };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
export const updateUserProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await profilesModel.updateOne(
      { userID: user_id },
      { $set: reqBody },
      { upsert: true }
    );
    return { status: "success", message: "profile updated successfully" };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
export const readUserProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let result = await profilesModel.find({ userID: user_id });
    return { status: "success", data: result };
  } catch (error) {
    return { status: "failed", message: error.toString() };
  }
};
