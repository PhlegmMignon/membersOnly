const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date_created: { type: Date, default: Date.now },
  title: { type: String, required: [true, "Title required"], minLength: 1 },
  content: { type: String, required: [true, "Text required"], minLength: 1 },
});

MessageSchema.virtual("url").get(function () {
  return `/${this._id}`;
});

MessageSchema.virtual("date_created_formatted").get(function () {
  return DateTime.fromJSDate(this.date_created).toLocaleString(
    DateTime.DATE_MED
  );
});

module.exports = mongoose.model("Message", MessageSchema);
