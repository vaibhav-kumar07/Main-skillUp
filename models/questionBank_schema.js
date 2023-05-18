const { default: mongoose } = require("mongoose");

const questionSchema = new mongoose.Schema({
  Title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 500,
  },
  Options: {
    type: [String],
    trim: true,
    required: true,
    validate: {
      validator: function (v) {
        return v.length === 4;
      },
      return: { message: "Array must have a length of 4" },
    },
  },
  Answer: {
    type: String,
    required: true,
    enum: [],
    validate: {
      validator: function (v) {
        return this.Options.includes(v);
      },
      message: "Answer must be one of the options",
    },
  },
  Type: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    enum: ["easy", "medium", "hard"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Question", questionSchema);
