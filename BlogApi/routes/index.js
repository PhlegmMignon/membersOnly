var express = require("express");
var router = express.Router();
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

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

router.post(
  "/",

  passport.authenticate("local", {
    successRedirect: "/signup",
    failureRedirect: "/",
    failureFlash: true,
  })
);

function authFx() {}

//Get signup
router.get("/signup", signup_controller.signup_get);

//Post signup
router.post("/signup", signup_controller.signup_post);

//Get login

//Post login

module.exports = router;
