const Question = require("../models/questionBank_schema");
const User = require("../models/user_schema");

const stringSimilarity = require("string-similarity");

// to create a new question

exports.createQuestion = async (_id, Title, Options, Answer, Type) => {
  await verifyUser(_id);
  console.log(_id);
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
// check the database whatheer the same quesetion is exist or not
const isTitleSimilar = (ques, fectchAll) => {
  const similarity = stringSimilarity.compareTwoStrings(ques, fectchAll);
  // Adjust the threshold value according to your requirements
  const similarityThreshold = 1;
  return similarity >= similarityThreshold;
};

// it verify the user that it is admin or not has the authority or not to create question
verifyUser = async function (_id) {
  console.log(`in verifying the question `);
  let user = await User.findById(_id);
  console.log(user);
  if (!user) throw new Error("User not found");
  // if (!user.token)
  //   throw new Error("You are not logged in. Please login to continue");
  if (user.isAdmin === false)
    throw new Error("You are unauthorized to create a question");
};
