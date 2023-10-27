const express = require("express");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");
const { getNotes, addTest } = require("./controllers/tests.controller");

const port = 3006;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/tests", async (req, res) => {
  res.render("index", {
    title: "Express App",
    tests: await getNotes(),
    created: false,
    error: false,
  });
});

app.post("/", async (req, res) => {
  try {
    await addTest(req.body.question, req.body.answer, req.body.version);
    res.render("index", {
      title: "Express App",
      tests: await getNotes(),
      created: true,
      error: false,
    });
  } catch (e) {
    console.error("Creation error", e);
    res.render("index", {
      title: "Express App",
      tests: await getNotes(),
      created: false,
      error: true,
    });
  }
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
