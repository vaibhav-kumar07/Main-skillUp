const express = require("express");
const router = express.Router();
const {
  getQuestion,
  deleteQuestion,
  UpdateQuestion,
} = require("../controllers/question_controller");

router.use(express.json());
router.route("/getQuestion").get(getQuestion);
router.route("/updateQuestion/:quesId/:userId").put(UpdateQuestion);
router.route("/deleteQuestion/:quesId/:userId").delete(deleteQuestion);
module.exports = router;
