const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MutualFundsSchema = new Schema({
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
    MutualFundsID: {
      type: String,
      required: true,
    },
    UserID: {
      type: String,
      required: true
    },
    Description: {
      type: String,
      required: true,
    },
  });
  
  const MutualFunds_Fintech = mongoose.model("MutualFunds_Fintech", MutualFundsSchema)

  module.exports = MutualFunds_Fintech