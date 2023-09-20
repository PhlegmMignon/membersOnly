const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

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

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    //Admins are automatically members
    let isMember =
      req.body.isAdmin == 1
        ? true
        : req.body.membersPassword == "assdfg"
        ? true
        : false;

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      } else {
        const user = new User({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPassword,
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
            res.redirect("/");
          }
        }
      }
    });
  }),
];
