const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoURI =
    "mongodb+srv://mapchat:Tokoroten1215@cluster0-hjnjq.mongodb.net/test?retryWrites=true&w=majority";

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);

    //exit process with failure
    process.exit(1);
  }
};
module.exports = connectDB;
