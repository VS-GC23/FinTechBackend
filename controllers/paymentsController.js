const Transactions_Fintech = require("../models/transactions");
const MutualFunds_Fintech = require("../models/mutualfunds")
const Investments_Fintech = require("../models/investments")
const Insurance_Fintech = require("../models/insurance")
const User = require("../models/user")

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
    const body = req.body;
    const userEmail = req.email.Email
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

    const Body = JSON.stringify(body);

    const requestOptions = {
      method: "POST",
      body: Body,
      redirect: "follow",
    };
    const response = await fetch(
      "http://3.108.235.155:3001/payment/initialise-transaction",
      requestOptions
    );
    if (!response) {
      throw Error("Payment cannot be initialized");
    }
    const payments = new Transactions_Fintech({
      senderAccountNumber: body.sender.AccountNumber,
      receiverAccountNumber: body.receiver.AccountNumber,
      paymentAmount: body.paymentAmount,
      Description: req.body.Description,
      Amount: req.body.paymentAmount,
      TransactionDate: $now(),
      TransactionID: createTransactionID(),
      UserID: user.UserID
    });
    const new_payments = await payments.save();
    res.status(201).json(new_payments);
  } catch (err) {
    console.log(err);
  }
};

const get_transaction_history = async (req, res) => {
  try {
    const userEmail = req.email.Email
    const user = await User.findOne({Email: userEmail});
    const history = await Transactions_Fintech.findOne({UserID: user.UserID,});
    console.log(history);
    if (account == null) {
      res.status(404).json({ message: "Cannot find User" });
    }
    res.json(history);
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
    if (account == null) {
      res.status(404).json({ message: "Cannot find User" });
    }
    res.json(history);
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
    if (account == null) {
      res.status(404).json({ message: "Cannot find User" });
    }
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const get_insurance_history = async (req, res) => {
  try {
    const userEmail = req.email.Email
    const user = await User.findOne({Email: userEmail});
    const history = await Insurance_Fintech.findOne({UserID: user.UserID,});
    console.log(history);
    if (account == null) {
      res.status(404).json({ message: "Cannot find User" });
    }
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const initialise_investments = async (req, res) => {
  try {
    const body = req.body;
    const Body = JSON.stringify(body);
    const userEmail = req.email.Email
    const user = await User.findOne({Email: userEmail});

    const requestOptions = {
      method: "POST",
      body: Body,
      redirect: "follow",
    };
    const response = await fetch(
      "http://3.108.235.155:3001/payment/initialise-investment",
      requestOptions
    );
    if (!response) {
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
    res.status(500).json({ message: err.message });
  }
};

const initialise_mutualfunds = async (req, res) => {
  try {
    const body = req.body;
    const Body = JSON.stringify(body);
    const userEmail = req.email.Email
    const user = await User.findOne({Email: userEmail});

    const requestOptions = {
      method: "POST",
      body: Body,
      redirect: "follow",
    };
    const response = await fetch(
      "http://3.108.235.155:3001/payment/initialise-mutual-fund",
      requestOptions
    );
    if (!response) {
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
    res.status(201).json(new_mutualfunds);
  } catch (err) {
    console.log(err);
  }
};

const initialise_insurance = async (req, res) => {
  try {
    const body = req.body;
    const Body = JSON.stringify(body);
    const userEmail = req.email.Email
    const user = await User.findOne({Email: userEmail});

    const requestOptions = {
      method: "POST",
      body: Body,
      redirect: "follow",
    };
    const response = await fetch(
      "http://3.108.235.155:3001/payment/initialise-insurance",
      requestOptions
    );
    if (!response) {
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
