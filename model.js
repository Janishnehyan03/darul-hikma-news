const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    img: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const News = mongoose.model("News", newsSchema);
module.exports = News;
