module.exports = function (test) {
  return {
    id: test.id,
    question: test.question,
    rightVersion: test.rightVersion,
    versions: [test.firstVersion, test.secondVersion, test.thirdVersion],
    firstVersion: test.firstVersion,
    secondVersion: test.secondVersion,
    thirdVersion: test.thirdVersion,
  };
};
