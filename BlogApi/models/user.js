const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
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
  membershipStatus: {
    type: String,
  },
  isAdmin: {
    type: String,
    default: false,
  },
});
