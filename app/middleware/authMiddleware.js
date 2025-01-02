import { tokenDecode } from "../utilities/tokenUtility.js";

export default (req, res, next) => {
  try {
    let token = req.headers["token"] || req.cookies["token"]; // Get token

    if (!token) {
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized: Token missing" });
    }

    const decoded = tokenDecode(token); // Decode the token

    if (!decoded) {
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized: Invalid token" });
    }

    // Attach user data to headers
    req.headers.email = decoded.email;
    req.headers.user_id = decoded.user_id;

    next(); // Proceed to next middleware
  } catch (error) {
    return res
      .status(500)
      .json({
        status: "failed",
        message: "Internal Server Error",
        error: error.message,
      });
  }
};
