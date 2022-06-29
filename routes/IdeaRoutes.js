const express = require("express");
const app = express();
const ideaModel = require("../models/Idea")

app.use(express.json());

/** データの取得 */
app.get("/ideas", async(req, res) => {
  // DB内のデータすべて返す
  const ideas = await ideaModel.find({});

  try {
    res.send(ideas);
  } catch {
    res.status(500).send(err);
  }
});

/** データの作成 */
app.post("/idea", async(req, res) => {
  // DB内のデータすべて返す
  const idea = new ideaModel(req.body);

  try {
    await idea.save();
    res.send(idea);
  } catch {
    res.status(500).send(err);
  }
});


module.exports = app;