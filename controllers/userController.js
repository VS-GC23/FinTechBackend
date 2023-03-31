const User = require("../models/user");
const Account = require("../models/account");
const Aadhar = require("../models/aadhar");
const jwt = require("jsonwebtoken");
// const Aadhar = require("../models/aadhar");

function createUserID(length){
    const characterString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for(let i=0;i<length;i++){
        const index = Math.floor(Math.random()*characterString.length);
        randomString += characterString[index];
    }
    return randomString;
}

const sign_up = async (req, res)=>{
    try{
        const newUserEmail = req.body.Email;
        const existingUser = await User.findOne({Email : newUserEmail});
        const existingUserCheck = existingUser ? true : false;
    
        if(!existingUserCheck){
            const UserID = createUserID(20);

            const AccountNumber = req.body.AccountNumber;

            const AadharNumber = req.body.AadharNumber;
            const aadhar = await Aadhar.findOne({AadharNumber : AadharNumber });
            const aadharCheck = aadhar ? true : false;

            if(!aadharCheck){
                const newAadhar = new Aadhar({
                    AadharNumber : req.body.AadharNumber,
                    IrisCode : Buffer.from(req.body.IrisCode).toString('base64'),
                    FingerPrintCode : Buffer.from(req.body.FingerPrintCode).toString('base64')
                })

                newAadhar.save()
                .then((result)=>{
                    console.log("AADHAR ADDED");
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
            else{
                console.log("AADHAR ALREADY EXISTS");
            }

            // adding account
            const existingAccount = await Account.findOne({AccountNumber : AccountNumber, IFSCCode : req.body.IFSCCode});
            if(!existingAccount){
                const account = new Account({
                    UserID : UserID,
                    AccountNumber : AccountNumber,
                    IFSCCode : req.body.IFSCCode,
                    Name : req.body.Name
                });
                account.save()
                .then((result)=>{
                    console.log(result);
                })
                .catch((err)=>{
                    console.log(err);
                })
            }
            else{
                console.log("ACCOUNT ALREADY EXISTS");
            }


            const newUserDetails = {
                UserID : UserID,
                Name : req.body.Name,
                Email : req.body.Email,
                Address : req.body.Address,
                ContactNumber : req.body.ContactNumber,
                // AccountNumber : AccountNumberCheck ? [AccountNumber] : [],
                AadharNumber : req.body.AadharNumber,
                Password : req.body.Password,
            }
            const user = new User(newUserDetails);
            user.save()
            .then((result)=>{
                res.status(201).json({message : "ACCOUNT CREATED SUCCESSFULLY"});
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        else{
            throw Error("USER ALREADY EXISTS");
        }
    }
    catch(err){
        console.log(err);
        res.status(501).json({message: err.message});
    }
}

const sign_in = async (req, res)=>{
    
    try {
        const user = await User.findOne({...req.body});
        const userCheck = user ? true : false;
    
        if(userCheck){
            const accessToken = jwt.sign({Email : user.Email}, process.env.ACCESS_TOKEN_SECRET);
            res.json({accessToken : accessToken});
        }
        else{
            throw Error("Invalid Login! Please check your email and password!");
        }
    }
    catch (err) {
        console.log(err);
        res.status(501).json({message: err.message});
    }
}

const reset_password = async (req, res)=>{
    try {
        const userEmail = req.email.Email;
        const newPassowrd = req.body.newPassword;
    
        const user = await User.findOne({Email : userEmail});
        if(user){
            User.updateOne({Email : userEmail}, {Password : newPassowrd})
            .then((result)=>{
                res.send(result);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        else{
            throw Error("USER DOES NOT EXIST");
        }
    }
    catch (err) {
        console.log(err);
        res.status(501).json({message:err.message});
    }
}

const get_user_details = (req, res)=>{
    const userEmail = req.email.Email;
    User.findOne({Email : userEmail})
    .then((result)=>{
        const user = {
            Name : result.Name,
            Email : result.Email,
            Address : result.Address,
            ContactNumber : result.ContactNumber,
            AccountNumber : result.AccountNumber,
            AadharNumber : result.AadharNumber
        }
        res.send(user);
    })
    .catch((err)=>{
        console.log(err);
        res.status(501).json({message : err.message});
    })
}

const update_user_details = async (req, res)=>{
    try{
        const userEmail = req.email.Email;
        const prevUser = await User.findOne({Email : userEmail});
        const newUserDetails = {
            Name : req.body.Name ? req.body.Name : prevUser.Name,
            ContactNumber : req.body.ContactNumber ? req.body.ContactNumber : prevUser.ContactNumber,
            Address : req.body.Address ? req.body.Address : prevUser.Address
        }
        User.updateOne({Email : userEmail}, newUserDetails)
        .then((result)=>{
            res.send("DETAILS UPDATED");
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    catch(err){
        console.log(err);
        res.status(501).json({message : err.message});
    }
}

const update_adhar_details = async (req, res)=>{
    try{
        const userEmail = req.email.Email;
        const user = await User.findOne({Email : userEmail});
        const userCheck = user ? true : false;
        
        if(userCheck){
            const AadharNumber = user.AadharNumber;
            const prevAadhar = await Aadhar.findOne({AadharNumber : AadharNumber});
            const newAadharDetails = {
                IrisCode : req.body.IrisCode ? Buffer.from(req.body.IrisCode).toString('base64') : prevAadhar.IrisCode,
                FingerPrintCode : req.body.FingerPrintCode ? Buffer.from(req.body.FingerPrintCode).toString('base64') : prevAadhar.FingerPrintCode 
            }
            Aadhar.updateOne({AadharNumber : AadharNumber}, newAadharDetails)
            .then((result)=>{
                res.send("AADHAR UPDATED");
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        else{
            throw Error("INVALID AADHAR NUMBER");
        }
    }
    catch(err){
        console.log(err);
        res.status(501).json({message : err.message});
    }
}

const add_bank_details = async (req, res)=>{
    try {
        const userEmail = req.email.Email;
        const user = await User.findOne({Email : userEmail});

        const UserID = user.UserID;
        const AccountNumber = req.body.AccountNumber;
        const IFSCCode = req.body.IFSCCode;
        const Name = req.body.Name;

        const existingAccount = await Account.findOne({AccountNumber : AccountNumber, IFSCCode : IFSCCode});
        const existingAccountCheck = existingAccount ? true : false;

        if(!existingAccountCheck){
            const newAccountDetails = {
                UserID : UserID,
                AccountNumber : AccountNumber,
                IFSCCode : IFSCCode,
                Name : Name
            }
            const newAccount = new Account(newAccountDetails);
            newAccount.save()
            .then((result)=>{
                res.send(result);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        else{
            throw Error("ACCOUNT ALREADY EXISTS");
        }
    }
    catch (err) {
        console.log(err);
        res.status(501).json({message : err.message});  
    }
}

const update_bank_details = async (req, res)=>{
    try {
        const userEmail = req.email.Email;
        const user = await User.findOne({Email : userEmail});
        
        const prevAccountDetails = {
            UserID : user.UserID,
            AccountNumber : req.body.prevAccountNumber,
            IFSCCode : req.body.prevIFSCCode,
            Name : req.body.prevName
        }

        const prevAccount = await Account.findOne({AccountNumber : req.body.prevAccountNumber, IFSCCode : req.body.prevIFSCCode});
        const prevAccountCheck = prevAccount ? true : false;
        
        if(prevAccountCheck){
            const newAccountDetails = {
                AccountNumber : req.body.newAccountNumber ? req.body.newAccountNumber : req.body.prevAccountNumber,
                IFSCCode : req.body.newIFSCCode ? req.body.newIFSCCode : req.body.prevIFSCCode,
                Name : req.body.newName ? req.body.newName : req.body.prevName
            };
            Account.updateOne(prevAccountDetails, newAccountDetails)
            .then((result)=>{
                res.send("ACCOUNT UPDATED");
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        else{
            throw Error("WRONG ACCOUNT DETAILS PASSED");
        }
    }
    catch (err) {
        console.log(err);
        res.status(501).json({message : err.message});  
    }
}

const get_bank_details = async (req, res)=>{
    try {
        const userEmail = req.email.Email;
        const user = await User.findOne({Email : userEmail});
        const bankDetails = await Account.find({UserID : user.UserID});
        res.send(bankDetails);
    }
    catch (err) {
        console.log(err);
        res.status(501).json({message : err.message});   
    }
}

module.exports = {
    sign_up,
    sign_in,
    reset_password,
    get_user_details,
    update_user_details,
    update_adhar_details,
    add_bank_details,
    update_bank_details,
    get_bank_details
}