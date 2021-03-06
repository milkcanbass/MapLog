const config = require("config");
const mongoURI = config.get("mongoURI");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
  } catch (err) {
    //exit process with failure
    process.exit(1);
  }
};
module.exports = connectDB;
