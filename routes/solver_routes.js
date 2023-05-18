const express = require("express");
const router = express.Router();
const { addResponses } = require("../controllers/solver_controller");

// Route for creating a new solver
router.post("/addResponses").post(addResponses);
// Other routes for updating solver responses, getting solver details, etc.

module.exports = router;
