var mongoose = require("mongoose");

module.exports = mongoose.model("ToDo", {
  title: String,
  completed: Boolean,
});
