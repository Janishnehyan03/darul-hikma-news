const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: String,
  details: String,
  img: {
    data: Buffer,
    contentType: String,
  },
},{
  timestamps:true
});
const News = mongoose.model("News", newsSchema);
module.exports = News;
