// const asyncHandler = require("express-async-handler");
// const { body, validationResult } = require("express-validator");
// const User = require("../models/user");

// exports.login_get = asyncHandler(async (req, res, next) => {
//   res.render("login", { title: "Log in" });
// });

// exports.login_post = [
//   body("email").trim().escape(),
//   body("password").trim().escape(),

//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//   }),
//   // asyncHandler(async (req, res, next) => {
//   //   const errors = validationResult(req);

//   //   if (!errors.isEmpty()) {
//   //     res.render("login", {
//   //       title: "Log in",
//   //       errors: errors.array(),
//   //     });
//   //     return;
//   //   } else {
//   //     const user = await User.find({
//   //       email: req.body.email,
//   //       password: req.body.password,
//   //     }).exec();

//   //     if (user.length == 0) {
//   //       res.render("login", {
//   //         title: "Log in",
//   //         error: "Incorrect username/password",
//   //       });
//   //     } else {
//   //       res.redirect("/users/:userId");
//   //     }
//   //   }
//   // }),
// ];
