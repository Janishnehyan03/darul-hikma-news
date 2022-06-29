const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
const News = require("./model");
const cors = require("cors");
const morgan = require("morgan");

const fs = require("fs");
const path = require("path");
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("dev"));

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log("connected");
  }
);

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res, next) => {
  const obj = {
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };
  News.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      // item.save();
      res.status(200).json({
        success: true,
        item,
      });
    }
  });
});
app.get("/api/news", async (req, res) => {
  const data = await News.find()
  // .sort({ createdAt: -1 });
  res.status(200).json(data);
});
app.delete("/api/:id", async (req, res) => {
  try {
    // delete file from folder
    // let data = await News.findById(req.params.id);
    // fs.unlinkSync(
    //   path.join(__dirname + "/uploads/" + path + req.params.id)
    // );
    // delete from db
    await News.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(3000, () => {
  console.log(`server listening on port`);
});
