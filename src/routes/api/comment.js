const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
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
  gfs.collection("selfies");
});

//Route /api/comment/post
//upload comment and populate user data
//private

router.post(
  "/post",
  [
    auth,
    [
      check("comment", "Comment is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { comment } = req.body;
      const user = await UserModel.findById(req.user.id).select(
        "-password -email"
      );

      newComment = new CommentModel({
        user: req.user.id,
        comment,
        name: user.name,
        latitude: 9999,
        longitude: 9999
      });
      await newComment.save();
      await res.json(newComment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//Uploade Image with Gridfs
//@route /getall
//@desc get all images in server(need)
//Goal find images by Meta data
//@Auth public
router.get("/getallPic", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    files.map(file => {
      console.log(file.filename);

      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
      readStream.on("end", () => {
        console.log("file sent");
      });
    });
  });
});

//@route /get
//@desc get one images in server(need)
//Goal find images by Meta data
//@Auth public
router.get("/getPic", (req, res) => {
  gfs.files.findOne(
    { filename: "11e6dc475c73ec1272bf78bf47f21ba4.jpg" },
    (err, file) => {
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
    }
  );
});

//@route Post /upload
//@desc Uploads file to DB
//@Auth private
router.post("/uploadPic", auth, upload.single("myImg"), (req, res) => {
  if (req.file === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  } else {
    console.log(req.file.filename);
    console.log("uploaded an image");

    res.json({ uploaded: "hey" });
    // res.redirect("/");
  }
});

//@route GET /files
//@desc Display, all files in json
router.get("/files", (req, res) => {
  gfs.files.find().toArray((err, files) => {
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

//route GET /image/:filename
//@desc Display single file object
router.get("/images/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "no file exists"
      });
    }

    //check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      //Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
      console.log(res.data);
    } else {
      res.status(404).json({ err: "not an image" });
    }
  });
});

module.exports = router;
