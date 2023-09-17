var express = require("express");
var router = express.Router();
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

const signup_controller = require("../controllers/signupController");
const login_controller = require("../controllers/loginController");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Blog api project", user: req.user });
});

router.post("/", [
  body("email").trim().escape(),
  body("password").trim().escape(),

  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
]);

//Get signup
router.get("/signup", signup_controller.signup_get);

//Post signup
router.post("/signup", signup_controller.signup_post);

//Get login

//Post login

module.exports = router;
