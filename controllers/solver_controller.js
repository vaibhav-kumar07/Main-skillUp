const solver_service = require("../services/solver_services");
// Controller for creating a new solver
const addResponses = async (req, res) => {
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

module.exports = {
  addResponses,
};
