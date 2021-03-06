const config = require("config");
const mongoURI = config.get("mongoURI");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const path = require("path");
const multer = require("multer");

//create Storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          metadata: req.body,
          bucketName: "myImgs"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage: storage, limits: { fileSize: 1000000 } }); //Maximum size is 1
module.exports = upload;
