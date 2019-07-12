const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = Schema({
  post: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = TestModel = mongoose.model("testpost", TestSchema);
