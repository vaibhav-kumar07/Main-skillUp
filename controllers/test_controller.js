const test_service = require("../services/test_services");

const createTest = async (req, res) => {
  try {
    const { name, questions, solvers } = req.body;
    const createdBy = req.params.id;
    await test_service.createTest(name, createdBy, questions, solvers);
    res.status(201).json({ message: "test created successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getAllTest = async (req, res) => {
  try {
    let test = await test_service.getAllTest();
    res.status(201).json(test);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getTestByID = async (req, res) => {
  try {
    const { id } = req.params;
    const testById = await test_service.getTestByID(id);
    res.status(201).json(testById);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const delTestByID = async (req, res) => {
  try {
    const id = req.params.id;
    await test_service.delTestByID(id);
    res.status(201).json({ message: "test deleted successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const modTestByID = async (req, res) => {
  try {
    const { questions } = req.body;
    const _id = req.params._id;
    await test_service.modTestByID(_id, questions);
    res.status(201).json({ message: " modify successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  createTest,
  getAllTest,
  getTestByID,
  delTestByID,
  modTestByID,
};
