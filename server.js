const express = require("express");
const app = express();
const ideaRouter = require("./routes/IdeaRoutes");
const PORT = 3000;
const mongoose = require("mongoose");

app.use(ideaRouter);
app.use(express.static("public"));

/** データベース接続 GSHk53.PxMPT9Mn */
mongoose.connect("mongodb://sankainoheya:GSHk53.PxMPT9Mn@ac-xbxtcok-shard-00-00.qebg9um.mongodb.net:27017,ac-xbxtcok-shard-00-01.qebg9um.mongodb.net:27017,ac-xbxtcok-shard-00-02.qebg9um.mongodb.net:27017/?ssl=true&replicaSet=atlas-qwlki5-shard-0&authSource=admin&retryWrites=true&w=majority")
  .then(console.log("DB connection successful"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log("server start"));