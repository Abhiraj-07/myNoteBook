const express = require("express");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const jwt_secreat = "FEasdfasdfgsadeghdf43435d45gdsfgdf";

const User = require("../models/User");
const auth = require("../middleware/authentication");
const router = express.Router();

// to create a user
router.post(
  "/createuser",
  [
    body("email").isEmail().withMessage("invalid email address"),
    body("firstName")
      .isLength({ min: 3 })
      .withMessage("the name must have minimum length of 3"),
    body("password")
      .isLength({ min: 3, max: 15 })
      .withMessage("your password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("your password should have at least one sepcial character"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        console.log(req.body.password, req.body.confirmPassword);
        throw new Error("confirm password does not match");
      }
      return true;
    }),
  ],
  async (req, res) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);
    const hasError = !error.isEmpty();

    if (hasError) {
      success = true;
      return res.status(422).json({ error: error.array(), success });
    } else {
    }

    try {
      // taking the user from the clinet
      let user = User(req.body);
      console.log(user);
      // hashing the password
      var salt = bcrypt.genSaltSync(10);
      user.password = await bcrypt.hash(user.password, salt);

      // saving the user in our database
      let Suser = await user.save();

      // creating the jwt token
      let id = Suser._id.toString();
      var AuthToken = await jwt.sign(id, jwt_secreat);
      success = true;

      return res.send({ AuthToken, success });
    } catch (e) {
      return res.send(e);
    }
  }
);

// to login user
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("invalid email address"),
    body("password").exists().withMessage(" password required"),
  ],
  async (req, res) => {
    try {
      let user = req.body;
      let findUser = await User.findOne({ email: user.email });
      if (findUser != null) {
        let check = await bcrypt.compare(user.password, findUser.password);
        if (check) {
          success = true;
          findUser.password = null;
          let id = findUser._id.toString();
          var AuthToken = await jwt.sign(id, jwt_secreat);
          return res.send({ AuthToken, success });
        } else {
          success = false;

          return res.send({ message: " invalid credentials", success });
        }
      } else {
        success = false;

        return res.send({ message: " please Creat a account first ", success });
      }
    } catch (e) {
      return res.send({ e, success });
    }
  }
);

// to getuser
router.get("/getuser", auth, async (req, res) => {
  try {
    let id = req.id;
    let user = await User.findById(id).select("-password");
    return res.send(user);
  } catch (e) {
    return res.send(e);
  }
});

module.exports = router;
