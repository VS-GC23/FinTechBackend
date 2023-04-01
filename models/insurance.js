const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const InsuranceSchema = new Schema({
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
    InsuranceID: {
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

  const Insurance_Fintech = mongoose.model("Insurance", InsuranceSchema)

  module.exports = Insurance_Fintech