var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const router = express.Router();
require("dotenv").config();
const mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

//Connects to mongodb.
mongoose.set("strictQuery", false);
const mongoDB = process.env.Blog_API_KEY;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.use("/messages", messagesRouter);
// app.use("/signup", signupRouter);
// app.use("/login", loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

//Home page
////Sign up btn: Links to sign up form
//////Fields: email, first + last name, password. Must have confirm password field. Member's secret password. Admin checkbox
//////Go back button
////Log in btn
//////Form for email + password. Submit btn
//////Go back btn
////Load 10 msgs w/ author + date posted for non members
//////Has delete btn for admins

//Secure passwords with bcrypt
