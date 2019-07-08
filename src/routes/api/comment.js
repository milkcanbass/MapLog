const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

//middleWare
const auth = require("../../middleWare/auth");

const CommentModel = require("../../models/CommentModel");
const UserModel = require("../../models/UserModel");

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
module.exports = router;
