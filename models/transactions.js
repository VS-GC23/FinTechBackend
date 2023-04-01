const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransactionsSchema = new Schema({
  TransactionID: {
    type: String,
    required: true,
  },
  UserID: {
    type: String,
    required: true,
  },
  senderAccountNumber: {
    type: String,
    required: true,
  },
  senderIFSCCode: {
    type: String,
    required: true,
  },
  RecipientAccountNumber: {
    type: String,
    required: true,
  },
  RecipientIFSCCode: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  TransactionDate: {
    type: Date
  },
  Description: {
    type: String,
    required: true
  }
});

const Transactions_Fintech = mongoose.model("Transaction", TransactionsSchema);

module.exports = Transactions_Fintech
