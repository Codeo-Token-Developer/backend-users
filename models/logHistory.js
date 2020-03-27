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
}, {versionKey: false, timestamps: {createdAt: 'created_at'}});

const loghistory = mongoose.model("loghistory", logHistorySchema);
module.exports = loghistory;
