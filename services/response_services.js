const Response = require("../models/response_schema");

exports.addResponseToTest = async (userId, testId, questionResponses) => {
  try {
    console.log("in response service");
    const responses = [];

    for (let i = 0; i < questionResponses.length; i++) {
      const { questionId, selectedAnswer } = questionResponses[i];
      responses.push({
        question: questionId,
        selectedAnswer: selectedAnswer,
      });
    }

    console.log(responses);

    // Create a new response document
    const response = new Response({
      user: userId,
      test: testId,
      responses: responses,
    });

    // Save the response to the database
    const savedResponse = await response.save();

    // Return a meaningful response indicating the response was saved successfully
    return {
      message: "Response saved successfully",
      response: savedResponse,
    };
  } catch (error) {
    console.error("Error in addResponseToTest service:", error);
    throw error;
  }
};
