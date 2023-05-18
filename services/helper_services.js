const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("twilio")(
  process.env.ACCOUNT_SSID,
  process.env.AUTH_KEY
);
const User = require("../models/user_schema");
const user_service = require("../services/user_services");

//if user is inactive ,change status
const makeUserActive = async function (email) {
  console.log("In auth service");
  const user = await userService.getUserByEmail(email);
  let result = await User.findOneAndUpdate(
    { email: user.email },
    { isActive: true }
  );
  return result;
};

//verify token
const verifyToken = async function (token) {
  console.log("In auth service");
  const getEmailByToken = await User.findOne({ token });
  if (!getEmailByToken) throw new Error("access denied");
  const result = await jwt.verify(token, process.env.SECRETKEY);
  if (result !== getEmailByToken.email) throw new Error("Invalid token");
  return result;
};

//verify otp
const verifyOtp = async function (email, OTP) {
  const user = await user_service.getUserByEmail(email);
  if (!(user.otp == OTP)) throw new Error("invalid otp");
  return user;
};

//update token
const updateToken = async function (id, Token) {
  console.log("In auth service");
  let result = await User.findOneAndUpdate({ _id: id }, { token: Token });
  return result;
};

//generate token
const generateToken = async function (email) {
  try {
    console.log("In auth service");
    const secretkety = process.env.SECRETKEY;
    const token = jwt.sign(email, secretkety);
    return token;
  } catch (err) {
    throw err;
  }
};

//verify password
const verifyPassword = async function (password, userPassword) {
  console.log("In auth service");
  const checkPassword = await bcrypt.compare(password, userPassword);
  if (!checkPassword) throw new Error("Invalid credentials");
  return checkPassword;
};

module.exports = {
  updateToken,
  generateToken,
  verifyOtp,
  verifyPassword,
  verifyToken,
  makeUserActive,
};
