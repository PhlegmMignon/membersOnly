var express = require("express");
var router = express.Router();

const signup_controller = require("../controllers/signupController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Blog api project" });
});

//Get signup
router.get("/signup", signup_controller.signup_get);

//Post signup
router.post("/signup", signup_controller.signup_post);

//Get login
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Log in" });
});

module.exports = router;
