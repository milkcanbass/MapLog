const express = require("express");
const router = express.Router();

const TestModel = require("../../models/TestModel");

router.post("/post", async (req, res) => {
  try {
    const newPost = new TestModel({
      post: req.body.post
    });

    const a = await newPost.save();
    res.json(a);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
