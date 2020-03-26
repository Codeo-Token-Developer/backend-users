const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var logHistorySchema = new Schema({
  history: {
    type: Map
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const loghistory = mongoose.model("loghistory", logHistorySchema);
module.exports = loghistory;
