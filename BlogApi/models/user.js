const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Name is required"],
    minLength: 2,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: [true, "Name is required"],
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email address is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: "Password required",
    minLength: 6,
    maxLength: 15,
  },
  isMember: {
    type: Boolean,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

UserSchema.virtual("url").get(function () {
  return `/users/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
