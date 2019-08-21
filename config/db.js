const config = require("config");
const mongoURI = config.get("mongoURI");
const mongoose = require("mongoose");

const connectDB = async () => {
  // const mongoURI =
  //   "mongodb+srv://mapchat:Tokoroten1215@cluster0-hjnjq.mongodb.net/test?retryWrites=true&w=majority";

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
