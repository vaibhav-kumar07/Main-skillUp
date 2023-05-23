const express = require("express");
const router = express.Router();
const { addResponseToTest } = require("../controllers/response_controller");

router.route("/").post(addResponseToTest);
module.exports = router;
