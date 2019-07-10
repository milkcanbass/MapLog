const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  name: {
    type: String,
    require: true
  },
  comment: {
    type: String,
    require: true
  },
  filename: {
    type: String
  },
  latitude: {
    type: Number,
    require: true
  },
  longitude: {
    type: Number,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = CommentModel = mongoose.model("comment", CommentSchema);
