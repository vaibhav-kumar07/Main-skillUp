const express = require("express");
const router = express.Router();
const {
  createTest,
  getAllTest,
  getTestByID,
  delTestByID,
  modTestByID,
} = require("../controllers/test_controller");

router.route("/createTest/:id").post(createTest);
router.route("/getAllTest").get(getAllTest);
router.route("/getTest/:id").get(getTestByID);
router.route("/deleteTest/:id").delete(delTestByID);
router.route("/modifyTest/:id").put(modTestByID);

module.exports = router;
