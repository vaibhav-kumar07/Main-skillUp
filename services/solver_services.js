const User = require("../models/User");
const Solver = require("../models/Solver");
const Test = require("../models/test_schema");

const findSolver = async (userid) => {
  try {
    const solver = await User.findOne({ _id: userid });
    return solver;
  } catch (error) {
    throw { Message: ` error in finding solver using userid ${error.message}` };
  }
};
///create solver using userid and testid
const { Solver, Response } = require("../models/solver");

// Create a Solver with Test ID and Responses to All Questions
exports.createSolver = async (req, res) => {
  try {
    const { testId, responses } = req.body;
    // Get the list of questions in the test
    const test = await Test.findById(testId).populate("questions");

    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    // Create an array to store response objects
    const responseObjects = [];

    // Iterate through the questions and find corresponding response
    for (let i = 0; i < test.questions.length; i++) {
      const question = test.questions[i];
      const selectedAnswer = responses[i].selectedAnswer;
      const responseObject = new Response({ question, selectedAnswer });
      responseObjects.push(responseObject);
    }

    // Create the Solver with the Test ID and Response Objects
    const solver = await Solver.create({
      test: testId,
      responses: responseObjects,
    });

    res.status(201).json(solver);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a Solver" });
  }
};

// Verify Solver Service Function
async function verifySolver(userId, testId) {
  try {
    // Find the user with the provided user ID and role "Solver"
    const user = await User.findOne({ _id: userId, role: "Solver" });
    if (!user) {
      return { message: "user does not exists " };
    }
    // Create a new solver using the user and test IDs
    const solver = await Solver.create({ user: userId, test: testId });
    return solver;
  } catch (error) {
    // Handle any errors that occurred during solver verification
    console.error("Error verifying solver:", error);
    throw new Error("Failed to verify solver");
  }
}

async function getSolverById(solverId) {
  try {
    const solver = await Solver.findById(solverId).populate(
      "user test responses.question"
    );

    if (!solver) {
      throw new Error("Solver not found");
    }

    return solver;
  } catch (error) {
    throw new Error(`Failed to get solver: ${error.message}`);
  }
}

async function deleteSolverById(solverId) {
  try {
    const deletedSolver = await Solver.findByIdAndDelete(solverId);

    if (!deletedSolver) {
      throw new Error("Solver not found");
    }

    return deletedSolver;
  } catch (error) {
    throw new Error(`Failed to delete solver: ${error.message}`);
  }
}

module.exports = {
  createSolver,
  findSolver,
  verifySolver,
  getSolverById,
  deleteSolverById,
};
