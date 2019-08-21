const express = require("express");
const app = express();
const path = require("path");

const port = process.env.PORT || 5000;

const connectDB = require("../config/db");
connectDB();

app.use(express.json({ extended: false }));

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/post", require("./routes/api/post"));

//serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`running server on port ${port}`);
});
