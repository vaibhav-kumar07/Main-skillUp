const response_service = require("../services/response_services");

// Controller function to attempt a test
exports.addResponseToTest = async (req, res) => {
  try {
    console.log("in response controller");
    const { userId, testId, questionResponses } = req.body;
    const result = await response_service.addResponseToTest(
      userId,
      testId,
      questionResponses
    );
    return res.json(result);
  } catch (error) {
    console.error("Error in attemptTest:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
};
