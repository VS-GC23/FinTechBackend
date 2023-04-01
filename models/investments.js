const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InvestmentSchema = new Schema({
    AccountNumber: {
      type: String,
      required: true,
    },
    IFSCCode: {
      type: String,
      required: true,
    },
    CustomerName: {
      type: String,
      required: true,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
    InvestmentID: {
      type: String,
      required: true,
    },
    UserID: {
      type: String,
      required: true
    },
    Description: {
      type: String,
      required: true
    }
  });

  const Investments_Fintech = mongoose.model("Investments_Fintech", InvestmentSchema)

  module.exports = Investments_Fintech