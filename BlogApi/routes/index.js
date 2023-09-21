var express = require("express");
var router = express.Router();
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const Message = require("../models/message");

const signup_controller = require("../controllers/signupController");
const login_controller = require("../controllers/loginController");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

/* GET home page. */
router.get("/", function (req, res, next) {
  // console.log(req._passport.instance._userProperty);

  if (req.session.flash) {
    console.log(req.session.flash.error);
    res.render("index", {
      title: "Blog api project",
      user: req.user,
      message: req.session.flash.error[0],
    });
  }
  res.render("index", {
    title: "Blog api project",
    user: req.user,
  });
});

//Login to home page
router.post("/", [
  body("username").trim().escape(),
  body("password").trim().escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const user = await User.find({ email: req.body.username });

    next();
  }),
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true,
  }),
]);

//Logout to home
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//Get signup
router.get("/signup", signup_controller.signup_get);

//Post signup
router.post("/signup", signup_controller.signup_post);

//Get new message form
router.get("/create-post", function (req, res, next) {
  res.render("create-post", { title: "Create new post", user: req.user });
});

//Post new message form
router.post("/create-post", [
  body("title").escape().trim().exists().withMessage("Title is required"),
  body("content").escape().trim().exists().withMessage("Content is required"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id,
    });

    if (!errors.isEmpty()) {
      res.render("create-post", {
        title: req.body.title,
        content: req.body.content,
        errors: errors.array(),
      });
      return;
    } else {
      await message.save();
      res.redirect("/");
    }
  }),
]);

//Get upgrade to member
router.get("/upgrade", (req, res, next) => {
  res.render("upgrade", { title: "Upgrade to member", user: req.user });
});

//Post to upgrade to member
router.post("/upgrade", [
  body("passcode")
    .escape()
    .trim()
    .custom((value) => {
      return value == "assdfg";
    })
    .withMessage("Wrong passcode"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      password: req.user.password,
      isMember: true,
      isAdmin: req.user.isAdmin,
      _id: req.user.id,
    });

    if (!errors.isEmpty()) {
      res.render("upgrade", {
        title: "Invalid passcode",
        user: req.user,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedUser = await User.findByIdAndUpdate(req.user.id, user);

      //Possible bug: req.user may not work so you will see login page when you upgrade to member
      res.render("index", { title: "You're now a member!", user: req.user });
    }
  }),
]);
module.exports = router;
