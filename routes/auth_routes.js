const express = require("express");
const router = express.Router();
const {
  createUser,
  verifyToken,
  logout,
  verifyUserByOtp,
  UserloginViaToken,
  userLogin,
} = require("../controllers/auth_controller");
// const { generateOtp } = require("../services/auth_services");

router.route("/signup").post(createUser);
router.route("/signup/verify").post(verifyUserByOtp);
router.route("/login").post(userLogin);
router.route("/login/token").post(UserloginViaToken);
router.route("/logout").post(verifyToken, logout);
module.exports = router;
