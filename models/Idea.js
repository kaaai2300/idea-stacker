const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema({
  content: {
    type: String,
    require: true,
    maxlength: 50
  },
  type: {
    type: Number,
    require: true,
    validate(value) {
      if (value > 2) throw new Error("予期せず値が入力されました。");
    }
  }
});

const Idea = mongoose.model("Idea", IdeaSchema);
module.exports = Idea;