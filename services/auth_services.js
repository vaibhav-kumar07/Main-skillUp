const client = require("twilio")(
  process.env.ACCOUNT_SSID,
  process.env.AUTH_KEY
);
const User = require("../models/user_schema");
// const auth_helper=require("../services/helper_services")

///create user
const createNewUser = async function (
  userName,
  email,
  password,
  role,
  phoneNumber
) {
  try {
    console.log("In auth service");
    let user = new User(userName, email, password, role, phoneNumber);
    let result = await user.save();
    const user_id = result._id;
    return user_id;
  } catch (error) {
    throw { message: `user cannot be created :-${error.message}` };
  }
};

const generateOtp = async function (email, Phone) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await User.updateOne({ email }, { otp }, { upsert: true });
  const message = await client.messages.create({
    body: ` ${otp}`,
    from: process.env.PHONE_NUMBER,
    to: `+91${Phone}`,
  });
  return message;
};

module.exports = {
  createNewUser,
  generateOtp,
};
