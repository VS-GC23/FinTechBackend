const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    type:{
      type: String,
    },
    description: {
      type: String,
    },
    debit: {
      type: Number,

    },
    credit: {
      type: Number,
    },
    balance: {
      type: Number,
    }
  }
);

module.exports = History = mongoose.model("History", historySchema);