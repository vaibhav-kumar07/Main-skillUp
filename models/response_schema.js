const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
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
