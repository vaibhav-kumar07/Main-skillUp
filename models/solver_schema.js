const mongoose = require("mongoose");

const SolverSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  responses: [
    {
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
    },
  ],
});

module.exports = mongoose.model("Solver", SolverSchema);
