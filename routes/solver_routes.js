const express = require("express");
const router = express.Router();
const {
  verifySolver,
  createSolver,
  getSolverbyid,
} = require("../controllers/solver_controller");

// Route for creating a new solver
router.route("/createSolver").post(verifySolver, createSolver);
router.route("/getSolverbyid/:id").get(getSolverbyid);
router.route("");

// Other routes for updating solver responses, getting solver details, etc.

module.exports = router;
