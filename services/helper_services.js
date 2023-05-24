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
  const user = await getUserByEmail(email);
  let result = await User.findOneAndUpdate(
    { email: user.email },
    { isActive: true }
  );
  return result;
};

const getUserByPhone = async function (phone) {
  try {
    let result = await User.findOne({ phoneNumber: phone });
    // console.log(result, 1111);
    if (!result) throw new Error("Invalid phone!!!!!!!");
    return result;
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async function (email) {
  try {
    const emailid = email;
    let result = await User.findOne({ email: emailid });
    if (!result) throw new Error("Invalid Email!!!!!!!");
    return result;
  } catch (error) {
    throw error;
  }
};

//verify token
const verifyToken = async function (token) {
  console.log("In auth service");
  const getEmailByToken = await User.findOne({ token });
  if (!getEmailByToken) throw new Error("access denied !! Invalid Token");
  const result = await jwt.verify(token, process.env.SECRETKEY);
  if (result !== getEmailByToken.email) throw new Error("Invalid token");
  return result;
};

//verify otp
const verifyOtp = async function (email, OTP) {
  try {
    const user = await getUserByEmail(email);
    if (!(user.otp == OTP)) throw new Error("invalid otp");
    // console.log(OTP == user.otp);
    return user;
  } catch (err) {
    throw err;
  }
};

//update token
const updateToken = async function (email1, Token) {
  console.log("In auth service");
  let result = await User.findOneAndUpdate({ email: email1 }, { token: Token });
  // console.log(result);
  return result;
};

//generate token
const generateToken = async function (email) {
  try {
    const secretkety = process.env.SECRETKEY;
    const token = await jwt.sign(email, secretkety);
    return token;
  } catch (err) {
    throw err;
  }
};

//verify password
const verifyPassword = async function (password, userPassword) {
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
  getUserByEmail,
  getUserByPhone,
};
