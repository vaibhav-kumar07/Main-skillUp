const solver_service = require("../services/solver_services");
// Controller for creating a new solver
const createSolver = async (req, res) => {
  try {
    const { userid, testid } = req.body;
    // Check if the solver already exists
    const existingSolver = await solver_service.findSolver(userid, testid);
    if (existingSolver) {
      return res.status(400).json({ error: "Solver already exists" });
    }

    // Create a new solver
    await solver_service.createNewSolver(testid);

    res.status(201).json({ message: "Solver created successfully", solver });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Verify Solver
async function verifySolver(req, res, next) {
  try {
    const { userid, testid } = req.body;

    // Call the service function to verify the solver
    const solver = await solver_service.verifySolver(userid, testid);

    if (!solver) {
      // If the solver is not valid, return an error response
      return res
        .status(404)
        .json({ error: "Solver not found or unauthorized." });
    }

    // Attach the solver to the request object for further use in other middleware or routes
    req.solver = solver;

    next();
  } catch (error) {
    // Handle any errors that occurred during solver verification
    console.error("Error verifying solver:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getSolverById(req, res) {
  const { solverId } = req.params.id;
  try {
    const solver = await solver_service.getSolverById(solverId);
    res.json(solver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteSolverById(req, res) {
  const { solverId } = req.params.id;
  try {
    await solver_service.deleteSolverById(solverId);
    res.status(200).send({ message: "solver id is deleted succesfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  verifySolver,
  getSolverById,
  deleteSolverById,
  createSolver,
};
