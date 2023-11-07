const mongoose = require("mongoose");

const ResultSchema = mongoose.Schema({
  score: {
    type: Number,
    required: true,
  },
  currentDate: {
    type: String,
    required: true,
  },
});

const Result = mongoose.model("Result", ResultSchema);

module.exports = Result;
