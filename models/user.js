const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    UserID : {
        type : String,
        required : true
    },
    Name : {
        type : String,
        required : true
    },
    Email : {
        type : String,
        required : true
    },
    Address : {
        type : String,
        required : true
    },
    ContactNumber : {
        type : String,
        required : true
    },
    AadharNumber : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;