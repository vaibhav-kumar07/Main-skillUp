const express = require("express");
const router = express.Router();
const {
  createUser,
  verifyToken,
  logout,
  UserloginViaToken,
  userLogin,
  generateOtpViaEmail,
  generateOtpViaPhone,
  verifyUserOtpByMail,
  verifyUserOtpByPhone,
} = require("../controllers/auth_controller");

router.route("/signup").post(createUser);
router.route("/email/generate-Otp").post(generateOtpViaEmail);
router.route("/phone/generate-otp").post(generateOtpViaPhone);
router.route("/email/verify-otp").post(verifyUserOtpByMail);
router.route("/phone/verify-otp").post(verifyUserOtpByPhone);
router.route("/login").post(userLogin);
router.route("/login/token").post(UserloginViaToken);
router.route("/logout").post(verifyToken, logout);
module.exports = router;
