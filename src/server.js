const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

const connectDB = require("./config/db");
connectDB();

app.use(express.json({ extended: false }));

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/comment", require("./routes/api/comment"));

app.get("*", (req, res) => {
  console.log("for other request");
});

app.listen(port, () => {
  console.log(`running server on port ${port}`);
});
