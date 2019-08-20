const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

//UserModel
const UserModel = require("../../models/UserModel");

//JwtSecret key
const jwtSecret = config.get("jwtSecret");

const auth = require("../../middleWare/auth");

//api/auth
//get user name and email
//private

router.get("/", auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//route api/auth/register
//register user
//public
router.post(
  "/register",
  [
    check("name", "Name is required. \r\n")
      .not()
      .isEmpty(),
    check("email", "Please use valid email. \r\n").isEmail(),
    check(
      "password",
      "Please enter a password at least 5 characters or more. \r\n"
    ).isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const obj = errors.errors;
      const textArray = [];
      obj.map(msg => {
        const message = msg.msg;
        textArray.push(message);
      });

      return res.status(422).send(textArray);
    }
    const { name, email, password } = req.body;
    try {
      let user = await UserModel.findOne({ email });
      if (user) {
        return res.status(400).send("User already existed");
      }

      user = new UserModel({
        name,
        email,
        password
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//route api/auth/login
//login user
//public

router.post(
  "/login",
  [
    check("email", "Please use valid email").isEmail(),
    check(
      "password",
      "Please enter a password at least 5 characters or more"
    ).isLength({ min: 5 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const obj = errors.errors;
      const textArray = [];
      obj.map(msg => {
        const message = msg.msg;
        textArray.push(message);
      });

      return res.status(422).send(textArray);
    }
    const { email, password } = req.body;
    try {
      let user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).send("User doesn't exist");
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send("Invalid Credentials");
      }

      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;

        res.json({ token: token, name: user.name });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
