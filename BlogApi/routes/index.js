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

// passport.serializeUser((user, done) => {
//   console.log("serialized");
//   done(null, user.id);
// });
// passport.deserializeUser(async (id, done) => {
//   try {
//     console.log("deserialized");

//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });
// );
// passport.serializeUser((user, done) => {
//   console.log("serialized");
//   done(null, user.id);
// });
// passport.deserializeUser(async (id, done) => {
//   try {
//     console.log("deserialized");

//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

/* GET home page. */
router.get("/", function (req, res, next) {
  // console.log(req._passport.instance._userProperty);
  res.render("index", { title: "Blog api project", user: req.user });
});

//Post home page
router.post(
  "/",

  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true,
  })
);

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
    console.log(message);

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

module.exports = router;
