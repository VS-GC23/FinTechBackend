const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aadharSchema = new Schema({
    AadharNumber : {
        type : String,
        required : true
    },
    IrisCode: {
        type : String,
        required : true
    },
    FingerPrintCode : {
        type : String, 
        required : true
    }
})

const Aadhar = mongoose.model("Aadhar", aadharSchema);

module.exports = Aadhar;