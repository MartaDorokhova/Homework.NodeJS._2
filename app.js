const express = require("express");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");
const {
  addTest,
  getTests,
  editTest,
  deleteTest,
  getTest,
} = require("./controllers/tests.controller");
const {
  addResult,
  getResults,
  deleteResult,
  getResult,
} = require("./controllers/result.controller");
const mapTest = require("./helpers/mapTest");
const mapResult = require("./helpers/mapResult");

const port = 3006;
const app = express();

app.use(express.static("../Test_frontend/build"));

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/results", async (req, res) => {
  const results = await getResults(req);
  res.send({ data: { results: results.map(mapResult) } });
});

app.post("/results", async (req, res) => {
  const newResult = await addResult({
    score: req.body.score,
    currentDate: req.body.currentDate,
  });
  res.send({ data: mapResult(newResult) });
});

app.get(`/results/:id`, async (req, res) => {
  const result = await getResult(req.params.id);
  res.send({ data: mapResult(result) });
});

app.delete(`/results/:id`, async (req, res) => {
  await deleteResult(req.params.id);
  res.send({ error: null });
});
app.get("/tests", async (req, res) => {
  const tests = await getTests(req);
  res.send({ data: { tests: tests.map(mapTest) } });
});

app.get(`/tests/:id`, async (req, res) => {
  const test = await getTest(req.params.id);
  res.send({ data: mapTest(test) });
});

//тут надо будет добавить app.use(authenticated) для контроля ролей

app.post(
  "/tests",
  /*тут надо будет добавить проверку роли - hasRole([ROLES.ADMIN])*/ async (
    req,
    res
  ) => {
    const newTest = await addTest({
      question: req.body.question,
      rightVersion: req.body.rightVersion,
      firstVersion: req.body.firstVersion,
      secondVersion: req.body.secondVersion,
      thirdVersion: req.body.thirdVersion,
    });

    res.send({ data: mapTest(newTest) });
  }
);

app.patch(
  "/tests/:id",
  /*тут надо будет добавить проверку роли - hasRole([ROLES.ADMIN])*/ async (
    req,
    res
  ) => {
    const updateTest = await editTest(req.params.id, {
      question: req.body.question,
      rightVersion: req.body.rightVersion,
      firstVersion: req.body.firstVersion,
      secondVersion: req.body.secondVersion,
      thirdVersion: req.body.thirdVersion,
    });

    res.send({ data: mapTest(updateTest) });
  }
);

app.delete("/tests/:id", async (req, res) => {
  await deleteTest(req.params.id);

  res.send({ error: null });
});

app.delete(`/results/:id`, async (req, res) => {
  await deleteResult(req.params.id);
  res.send({ error: null });
});

mongoose
  .connect(
    "mongodb+srv://martadorohova:qweqwe123@cluster0.qteawng.mongodb.net/tests?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.green(`Server has been started on port ${port}...`));
    });
  });
