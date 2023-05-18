const Question = require("../models/questionBank_schema");

const User = require("../models/user_schema");

const stringSimilarity = require("string-similarity");

// to create a new question

exports.createQuestion = async (id, Title, Options, Answer, Type) => {
  await verifyUser(id);
  console.log(id);
  console.log(`in queston creation`);

  const fetchedQuestion = await Question.find().exec();

  let isSimilar = false;
  for (let i = 0; i < fetchedQuestion.length; i++) {
    const question = fetchedQuestion[i];
    if (isTitleSimilar(Title, question.Title)) {
      isSimilar = true;
      break;
    }
  }
  if (isSimilar) {
    throw new Error(`Question already exists`);
  }
  const ques = new Question({ Title, Options, Answer, Type, user: _id });
  await ques.save();
  console.log("question created successfully ");
  return ques;
};

const isTitleSimilar = (ques, fectchAll) => {
  const similarity = stringSimilarity.compareTwoStrings(ques, fectchAll);

  const similarityThreshold = 1;
  return similarity >= similarityThreshold;
};

verifyUser = async function (_id) {
  console.log(`in verifying the question `);
  let user = await User.findById(_id);
  console.log(user);
  if (!user) throw new Error("User not found");

  if (user.isAdmin === false)
    throw new Error("You are unauthorized to create a question");
};

exports.getQuestion = async () => {
  return await Question.find({}, { _id: 0, __v: 0, type: 0 });
};

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
  }
};

//4. delete the question.

exports.deleteQuestion = async (questionid, userId) => {
  const question = await Question.findById(questionid);

  if (!question) throw new Error("question does not exist");
  if (question.user == userId) {
    await Question.findByIdAndDelete({ _id: questionid });
  } else {
    throw new Error("not authourised to delete a question");
  }
};
