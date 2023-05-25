const service = require("../services/question_services");

exports.createQuestion = async (req, res) => {
  console.log("question created here");
  try {
    const { Title, Options, Answer, Type } = req.body;
    const { _id } = req.params;
    await service.createQuestion(_id, Title, Options, Answer, Type);
    res.status(200).send({ msg: "question Added in question bank" });
  } catch (error) {
    console.log("error during question Creation :", error);
    res.status(400).send({ message: error.message });
  }
};
