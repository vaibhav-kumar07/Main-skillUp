const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 200,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  questions: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
    },
  ],
  solvers: [
    {
      solver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Solver",
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Test", testSchema);
