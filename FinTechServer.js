require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user_routes = require("./routes/userRoutes");
// const transaction_routes = require("./routes/transactionRoutes");

const path = require("path");


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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


app.use("/user", user_routes);


const dataRoutes = require("./routes/dataservicesRoutes")

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/bankstatements", dataRoutes);