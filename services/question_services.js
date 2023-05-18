const Question = require("../models/questionBank_schema");
// const User = require("../models/user_schema");

//1. get the question
exports.getQuestion = async () => {
  return await Question.find({}, { _id: 0, __v: 0, type: 0 });
};

// 3.. update the question.
exports.updateQuestion = async (
  questionId,
  { Title, Answer, userId, questionid }
) => {
  try {
    const question = await Question.findById(questionid);
    console.log(userId, question.user);
    if (!(question.user == userId))
      throw new Error("invalid user to update a question");
    console.log(question.user == userId);
    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      { Title, Answer },
      { new: true }
    );
    if (!updatedQuestion) {
      return { success: false, message: "Question not found" };
    }
    return { success: true, updatedQuestion };
  } catch (error) {
    throw error;
    // console.error(error);
    // return { success: false, message: "Error updating question" };
  }
};

//4. delete the question.

exports.deleteQuestion = async (questionid, userId) => {
  // const questionExists = await Question.exists({ _id: questionid });
  const question = await Question.findById(questionid);
  // console.log(question.user == userId);
  if (!question) throw new Error("question does not exist");
  if (question.user == userId) {
    await Question.findByIdAndDelete({ _id: questionid });
  } else {
    throw new Error("not authourised to delete a question");
  }
  // const deletedQuestion = await Question.findByIdAndDelete(questionid);
  // return deletedQuestion;
};
