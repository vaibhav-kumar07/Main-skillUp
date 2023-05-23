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
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Populate the full question details when querying for a test
testSchema.pre("findOne", function (next) {
  this.populate("questions.question");
  next();
});

// Populate the full question details when querying for multiple tests
testSchema.pre("find", function (next) {
  this.populate("questions.question");
  next();
});

module.exports = mongoose.model("Test", testSchema);
// module.exports = mongoose.model("AttempTest", testAttemptSchema);
