import jwt from "jsonwebtoken";

export const tokenEncode = (email, _id) => {
  const KEY = process.env.JWT_KEY;
  const EXPIRE = { expiresIn: process.env.JWT_EXPIRY_TIME };
  const PAYLOAD = { email: email, user_id: _id };
  return jwt.sign(PAYLOAD, KEY, EXPIRE);
};

export const tokenDecode = (token) => {
  try {
    // console.log(jwt.verify(token, JWT_KEY));
    let key = process.env.JWT_KEY;
    return jwt.verify(token, key);
  } catch (err) {
    return null;
  }
};
