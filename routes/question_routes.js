const express = require("express");

const router = express.Router();
const { createQuestion } = require("../controllers/question_controller");

router.use(express.json());

router.route("/createQuestion").post(createQuestion);
module.exports = router;
