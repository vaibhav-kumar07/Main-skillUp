const express = require("express");
const router = express.Router();
const {
  createTest,
  getAllTest,
  getTestByID,
  delTestByID,
  modTestByID,
} = require("../controllers/test_controller");

router.route("/create/test/:id").post(createTest);
router.route("/getAll").get(getAllTest);
router.route("/get/:id").get(getTestByID);
router.route("/delete/:id").delete(delTestByID);
router.route("/modify/:id").patch(modTestByID);

module.exports = router;
