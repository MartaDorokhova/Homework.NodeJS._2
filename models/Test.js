const mongoose = require("mongoose");

const TestSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },

  rightVersion: {
    type: String,
    required: true,
  },
  firstVersion: {
    type: String,
    required: true,
  },
  secondVersion: {
    type: String,
    required: true,
  },
  thirdVersion: {
    type: String,
    required: true,
  },
});

const Test = mongoose.model("Test", TestSchema);

module.exports = Test;
