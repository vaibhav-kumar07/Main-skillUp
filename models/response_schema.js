const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async function (userId) {
        const user = await mongoose.model("User").findById(userId);
        return user && user.role === "Solver";
      },
      message: 'User must have the role of "Solver".',
    },
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
          validator: async function (value) {
            const question = await mongoose
              .model("Question")
              .findById(this.question._id);
            return question && question.Options.includes(value);
          },
          message: "Selected answer must be one of the options",
        },
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Response", responseSchema);
