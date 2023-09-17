var express = require("express");
var router = express.Router();
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

/* GET home page w/ user logged in. */
router.get("/:id", function (req, res, next) {
  res.render("index", { user: req.params.user });
});

module.exports = router;
