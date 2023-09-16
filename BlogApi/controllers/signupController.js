const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

exports.signup_get = asyncHandler(async (req, res, next) => {
  res.render("signup", { title: "Sign up form" });
});

exports.signup_post = [
  body("firstName")
    .trim()
    .isLength({ min: 2 })
    .escape()
    .withMessage("First name must be at least 2 characters")
    .exists(),
  body("lastName")
    .trim()
    .isLength({ min: 2 })
    .escape()
    .withMessage("Last name must be at least 2 characters")
    .exists(),
  body("email").trim().escape().isEmail(),
  body("password").trim().escape().isLength({ min: 6 }),
  body("passwordConfirm")
    .trim()
    .escape()
    .custom((value, { req }) => {
      return value == req.body.password;
    }),
  body("membersPassword").trim().escape(),
  body("isAdmin").exists(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // let isMember = false;
    // if (body("membersPassword").trim().escape() == "assdfg") {
    //   console.log("Is a member");
    //   isMember = true;
    // }

    let isMember = req.body.password == req.body.passwordConfirm ? true : false;

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      isMember: isMember,
      isAdmin: req.body.isAdmin,
    });
    console.log(user);

    if (!errors.isEmpty()) {
      res.render("signup", {
        title: "Sign up form",
        user: user,
        errors: errors.array(),
      });
      return;
    } else {
      const userExists = await User.findOne({
        email: req.body.email,
      }).exec();

      if (userExists) {
        res.redirect("/signup", { error: "Email already in use" });
      } else {
        await user.save();
        res.redirect("/", { signupSuccess: "" });
      }
    }
  }),
];