const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schem({
  user: { type: Schema.Types.ObjectId, ref: "Message", required: true },
  date_created: { type: Date, default: Date.now },
  title: { type: String, required: [true, "Title required"] },
  text: { type: String, required: [true, "Text required"] },
});

MessageSchema.virtual("url").get(function () {
  return `/catalog/book/${this._id}`;
});

BookInstanceSchema.virtual("due_back_formatted").get(function () {
  return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

BookInstanceSchema.virtual("due_back_yyyy_mm_dd").get(function () {
  return DateTime.fromJSDate(this.due_back).toISODate(); // format 'YYYY-MM-DD'
});

module.exports = mongoose.model("Message", MessageSchema);
