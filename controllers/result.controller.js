const Result = require("../models/Result");

function addResult(result) {
  return Result.create(result);
}

async function getResults() {
  const results = await Result.find();

  return results;
}

function deleteResult(id) {
  return Result.deleteOne({ _id: id });
}

function getResult(id) {
  return Result.findById(id);
}

module.exports = {
  addResult,
  getResults,
  deleteResult,
  getResult,
};
