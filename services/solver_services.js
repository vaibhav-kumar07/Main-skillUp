const Solver = require("../models/solver_schema");
const user_schema = require("../models/user_schema");

const findUser = async (userid) => {
  try {
    const solver = await Solver.findOne(userid, test);
    return solver;
  } catch (error) {
    throw { Message: ` error in finding solver using userid ${error.message}` };
  }
};

const createSolver = async (userId, testId) => {
  try {
    const solver = new Solver({ user: userId, test: testId });
    await solver.save();
    return solver;
  } catch (error) {
    throw new Error("Failed to create solver");
  }
};

module.exports = {
  createSolver,
  findUser,
};
