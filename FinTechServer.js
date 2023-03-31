require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user_routes = require("./routes/userRoutes");
const transaction_routes = require("./routes/transactionRoutes");

const app = express();

const dbURI = process.env.MONGODB_URI;

// connecting to mongoDB Atlas server
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>{
    app.listen(8080,"0.0.0.0");
    console.log("Server Running On Port 8080");
})
.catch((err)=>{
    console.log(err);
})

app.use(cors());

app.use("/user", user_routes);