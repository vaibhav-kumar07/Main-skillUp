const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  selectedAnswer: {
    type: String,
    validate: {
      validator: async function (v) {
        const question = await mongoose
          .model("Question")
          .findById(this.question);
        return question.Options.includes(v);
      },
      message: "Selected answer must be one of the options",
    },
  },
});

const SolverSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tests: [
    {
      test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
        required: true,
      },
      responses: [ResponseSchema],
    },
  ],
});

module.exports = {
  Solver: mongoose.model("Solver", SolverSchema),
  Response: mongoose.model("Response", ResponseSchema),
};
