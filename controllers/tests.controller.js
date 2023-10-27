const chalk = require("chalk");
const Test = require("../models/Test");

async function addTest({ question, answer }) {
  await Test.create({ question, answer });

  console.log(chalk.bgGreen("Test was added!"));
}

async function getNotes() {
  const tests = await Test.find();

  return tests;
}

module.exports = {
  addTest,
  getNotes,
};
