const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const News = require("./model");
const cors = require("cors");
const morgan = require("morgan");


const path = require("path");
dotenv.config();

console.log(process.env.NODE_ENV);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log("connected");
  }
);

app.post("/upload", async (req, res, next) => {
  console.log(req.body);
  try {
    let data = await News.create(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});
app.get("/news", async (req, res) => {
  const data = await News.find();
  // .sort({ createdAt: -1 });
  res.status(200).json(data);
});
app.delete("/:id", async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listening on port`, port);
});
