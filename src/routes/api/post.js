const express = require("express");
const router = express.Router();
const upload = require("../../../config/multer");
const config = require("config");
const mongoose = require("mongoose");
const mongoURI = config.get("mongoURI");
const Grid = require("gridfs-stream");

//middleWare
const auth = require("../../middleWare/auth");

const CommentModel = require("../../models/CommentModel");
const UserModel = require("../../models/UserModel");

//Create mongo connection
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true });

//Init gfs
let gfs;
//Init stream
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("myImgs");
});

//@route Post /api/comment/uploadImg
//@desc Uploads file to DB
//@Auth private
router.post("/uploadImg", auth, upload.single("myImg"), (req, res) => {
  if (req.file === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  } else {
    console.log("uploaded an image");
    res.json({ msg: "imageUploaded" });
  }
});

//Need update to use below///

//@route /get
//@desc get one images in server(need)
//Goal find images by Meta data
//@Auth public
router.get("/getImg", (req, res) => {
  let filename = req.query.filename;
  console.log(filename);

  gfs.files.findOne({ filename: filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "no file exist"
      });
    }
    try {
      const readStream = gfs.createReadStream(file.filename);

      const bufs = [];
      readStream.on("data", function(chunk) {
        bufs.push(chunk);
      });
      readStream.on("end", function() {
        const fbuf = Buffer.concat(bufs);
        const base64 = fbuf.toString("base64");
        res.json(base64);
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ err: "server error" });
    }
  });
});

//Get all images by metaData
router.get("/getRes", (req, res) => {
  gfs.files.find({}, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "no file exist"
      });
    }
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
    readStream.on("close", () => {
      console.log("file found");
    });
  });
});

//@route GET /files
//@desc Display, all files in json
router.get("/files", auth, (req, res) => {
  let userId = req.query.id;

  gfs.files.find({ "metadata.id": userId }).toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "No files exist"
      });
    }

    // Files exist
    res.json(files);
  });
});

//@route /delete
//@desc get one images in server(need)
//Goal find images by Meta data
//@Auth public

router.delete("/files", auth, (req, res) => {
  let userId = req.query.id;
  gfs.remove(
    { _id: "5d3678323ff63e587a72a255", root: "myImgs" },
    (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
      res.send("succeed");
      res.redirect("/");
    }
  );
});

module.exports = router;
