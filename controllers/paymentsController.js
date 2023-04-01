"use strict";
const Transactions_Fintech = require("../models/transactions");
const MutualFunds_Fintech = require("../models/mutualfunds")
const Investments_Fintech = require("../models/investments")
const Insurance_Fintech = require("../models/insurance")
const User = require("../models/user");
const fetch = require('node-fetch');

const localBankURL = "http://localhost:3001";
const EC2URL = "http://3.108.235.155:3001"

function createTransactionID(){
  const characterString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for(let i=0;i<10;i++){
      const index = Math.floor(Math.random()*characterString.length);
      randomString += characterString[index];
  }
  return randomString;
}

const initialise_transcations = async (req, res) => {
  try {
    const Body = JSON.stringify(req.body);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Accept", "application/json");
    const userEmail = req.email.Email
    console.log(userEmail);
    const user = await User.findOne({Email: userEmail});
    // const body = {
    //   sender: {
    //     AccountNumber: req.body.sender.AccountNumber,
    //     IFSCCode: req.body.sender.IFSCCode,
    //     CustomerName: req.body.sender.CustomerName,
    //   },
    //   receiver: {
    //     AccountNumber: req.body.receiver.AccountNumber,
    //     IFSCCode: req.body.receiver.IFSCCode,
    //     CustomerName: req.body.receiver.CustomerName,
    //   },
    //   paymentAmount: req.body.paymentAmount,
    // };

    const requestOptions = {
      method: "POST",
      body: Body,
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      `${EC2URL}/payment/initialise-transaction`,
      requestOptions
    );
    console.log(response.status);
    if (response.status === 501) {
      throw Error("Payment cannot be initialized");
    }
    const payments = new Transactions_Fintech({
      TransactionID: createTransactionID(),
      UserID: user.UserID,
      senderAccountNumber: req.body.sender.AccountNumber,
      senderIFSCCode: req.body.sender.IFSCCode,
      RecipientAccountNumber: req.body.receiver.AccountNumber,
      RecipientIFSCCode: req.body.receiver.IFSCCode,
      Amount: req.body.paymentAmount,
      TransactionDate: Date.now(),
      Description: req.body.Description
    });
    const new_payments = await payments.save();
    let body = (await response.json()).body;
    console.log(body);
    res.status(201).json({message: response.message});
  } catch (err) {
    console.log(err);
    res.status(501).json({message : err.message})
  }
};

const get_transaction_history = async (req, res) => {
  try {
    const userEmail = req.email.Email
    const user = await User.findOne({Email: userEmail});
    const history = await Transactions_Fintech.findOne({UserID: user.UserID,});
    console.log(history);
    if (!user) {
      res.status(404).json({ message: "Cannot find User" });
    }
    else{
      res.json(history);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const get_investments_history = async (req, res) => {
  try {
    const userEmail = req.email.Email
    const user = await User.findOne({Email: userEmail});
    const history = await Investments_Fintech.findOne({UserID: user.UserID,});
    console.log(history);
    if (!user) {
      res.status(404).json({ message: "Cannot find User" });
    }
    else{
      res.json(history);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const get_mutualfunds_history = async (req, res) => {
  try {
    const userEmail = req.email.Email
    const user = await User.findOne({Email: userEmail});
    const history = await MutualFunds_Fintech.findOne({UserID: user.UserID,});
    console.log(history);
    if (!user) {
      res.status(404).json({ message: "Cannot find User" });
    }
    else{
      res.json(history);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const get_insurance_history = async (req, res) => {
  try {
    const userEmail = req.email.Email
    const user = await User.findOne({Email: userEmail});
    const history = await Insurance_Fintech.findOne({UserID: user.UserID});
    console.log(history);
    if (!user) {
      res.status(404).json({ message: "Cannot find User" });
    }
    else{
      res.json(history);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const initialise_investments = async (req, res) => {
  try {
    const Body = JSON.stringify(req.body);
    console.log(req.body);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Accept", "application/json");
    const userEmail = req.email.Email
    const user = await User.findOne({Email: userEmail});

    const requestOptions = {
      method: "POST",
      body: Body,
      headers: myHeaders,
      redirect: "follow"
    };
    const response = await fetch(
      `${EC2URL}/payment/initialise-investment`,
      requestOptions
    );
    if (response.status === 501) {
      throw Error("Payment cannot be initialized");
    }
    const Investments = new Investments_Fintech({
      AccountNumber: req.body.AccountNumber,
      paymentAmount: req.body.paymentAmount,
      Description: req.body.Description,
      InvestmentID: req.body.InvestmentID,
      CustomerName: req.body.CustomerName,
      IFSCCode: req.body.IFSCCode,
      UserID: user.UserID
    });
    const new_investments = await Investments.save();
    res.status(201).json(new_investments);
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
};

const initialise_mutualfunds = async (req, res) => {
  try {
    const Body = JSON.stringify(req.body);
    const userEmail = req.email.Email
    const user = await User.findOne({Email: userEmail});
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Accept", "application/json");

    const requestOptions = {
      method: "POST",
      body: Body,
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      `${EC2URL}/payment/initialise-mutual-fund`,
      requestOptions
    );
    if (response.status === 501) {
      throw Error("Payment cannot be initialized");
    }
    const mutualfunds = new MutualFunds_Fintech({
      AccountNumber: req.body.AccountNumber,
      paymentAmount: req.body.paymentAmount,
      Description: req.body.Description,
      MutualFundsID: req.body.MutualFundsID,
      CustomerName: req.body.CustomerName,
      IFSCCode: req.body.IFSCCode,
      UserID: user.UserID
    });
    const new_mutualfunds = await mutualfunds.save();
    res.status(201).json(response);
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: err.message });
  }
};

const initialise_insurance = async (req, res) => {
  try {
    const Body = JSON.stringify(req.body);
    console.log(req.body);
    const userEmail = req.email.Email
    const user = await User.findOne({Email: userEmail});
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Accept", "application/json");

    const requestOptions = {
      method: "POST",
      body: Body,
      headers: myHeaders,
      redirect: "follow",
    };
    const response = await fetch(
      `${EC2URL}/payment/initialise-insurance`,
      requestOptions
    );
    if (response.status === 501) {
      throw Error("Payment cannot be initialized");
    }
    const insurance = new Insurance_Fintech({
      AccountNumber: req.body.AccountNumber,
      Description: req.body.Description,
      InsuranceID: req.body.InsuranceID,
      CustomerName: req.body.CustomerName,
      IFSCCode: req.body.IFSCCode,
      UserID: user.UserID
    });
    const new_insurance = await insurance.save();
    res.status(201).json(new_insurance);
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: err.message });
  }
};
module.exports = {
  initialise_transcations,
  get_transaction_history,
  initialise_investments,
  initialise_mutualfunds,
  initialise_insurance,
  get_insurance_history,
  get_investments_history,
  get_mutualfunds_history,
  get_transaction_history
};
