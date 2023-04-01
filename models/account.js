const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    UserID : {
        type : String,
        required : true
    },
    AccountNumber : {
        type : String,
        required : true
    },
    IFSCCode : {
        type : String,
        required : true
    },
    Name : {
        type : String,
        required : true
    }
})

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;