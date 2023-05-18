const client = require("twilio")(
  process.env.ACCOUNT_SSID,
  process.env.AUTH_KEY
);
const User = require("../models/user_schema");

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

module.exports = {
  createNewUser,
};
