const auth_service = require("../services/auth_services");
const auth_helper = require("../services/helper_services");

exports.createUser = async function (req, res) {
  try {
    console.log("In Auth controller");
    const { userName, email, password, role, phoneNumber } = req.body;
    let id = await auth_service.createNewUser({
      userName,
      email,
      password,
      role,
      phoneNumber,
    });
    res.status(201).send({
      message: "Please verify your email or phone!!!!!",
      id,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.logout = async (req, res, next) => {
  try {
    let loggedInUser = req.loggedInUser;
    await auth_service.logout(loggedInUser._id);
    res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    handleErrors(error, next);
  }
};

exports.generateOtpViaEmail = async function (req, res) {
  try {
    const { email } = req.body;
    await auth_service.generateOtpOnEmail(email);
    res.status(200).send({ message: "successfully sent otp on mail" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.generateOtpViaPhone = async function (req, res) {
  try {
    const { phone } = req.body;
    await auth_service.generateOtpOnMobile(`${phone}`);
    res.status(200).send({ message: "successfully sent otp on mobile " });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.verifyToken = async (req, res, next) => {
  try {
    console.log("In Auth controller  ", req.headers);
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      throw new Error({ message: "Access Denied. Please send Token" });

    const token = authHeader.split(" ")[1];
    if (!token)
      throw new Error({ message: "Access Denied. Please send Token" });
    console.log("token " + token);

    const user = await auth_service.verifyToken(token);
    req.loggedInUser = user;
    next();
  } catch (error) {
    handleErrors(error, next);
  }
};

exports.userLogin = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await auth_helper.getUserByEmail(email);
    if (!user) throw new Error("User does not exist");
    await auth_helper.verifyPassword(`${password}`, user.password);
    const Token = await auth_helper.generateToken(email);
    await auth_helper.updateToken(user.email, Token);
    if (!user.isActive) {
      return res.status(200).send({
        msg: "You are Inactive !!! please Verify your Account using email or phone through otp",
      });
    }
    return res
      .status(200)
      .send({ message: "User logged in successfully", Token });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.verifyUserOtpByMail = async function (req, res) {
  try {
    const { email, otp } = req.body;
    const user = await auth_helper.getUserByEmail(email);
    if (user.isActive) {
      return res.status(200).send({
        message:
          "already active no need to verify!! Login via email and password",
      });
    }
    await auth_helper.verifyOtp(email, otp);
    await auth_helper.makeUserActive(email);
    return res.status(200).send({
      message:
        "your account has been Activated succesfully please login with your credentials to get your token",
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

exports.verifyUserOtpByPhone = async function (req, res) {
  try {
    const { phone, otp } = req.body;
    const user = await auth_helper.getUserByPhone(phone);
    if (user.isActive) {
      return res.status(200).send({
        message:
          "already active no need to verify!! Login via email and password",
      });
    }
    const email = user.email;
    await auth_helper.verifyOtp(email, otp);
    await auth_helper.makeUserActive(email);
    res.status(200).send({
      message:
        "your account has been successfully activated  please login with your credentials to get token",
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.UserloginViaToken = async function (req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await auth_helper.verifyToken(token);
    return res.status(200).send({ message: "User Logged in Successfully" });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};
