const express = require("express");
const router = express.Router();
const {
  createUser,
  verifyToken,
  logout,
} = require("../controllers/auth_controller");

router.route("/signup").post(createUser);
router.route("/logout").post(verifyToken, logout);
module.exports = router;
