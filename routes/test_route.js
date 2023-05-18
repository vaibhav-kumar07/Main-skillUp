const express = require("express");
const router = express.Router();
const {
  createTest,
  getAllTest,
  getTestByID,
  delTestByID,
  modTestByID,
} = require("../controllers/test_controller");

router.route("/create/test").post(createTest);
router.route("/getAll").get(getAllTest);
router.route("/get/:id").get(getTestByID);
router.route("/delete/:id").delete(delTestByID);
router.route("/delete/:id").put(modTestByID);

module.exports = router;
