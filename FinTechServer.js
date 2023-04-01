require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user_routes = require("./routes/userRoutes");
const payment_routes = require("./routes/paymentsRoutes");

const path = require("path");


const app = express();
app.use(cors());

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
app.use("/payments", payment_routes);

//CSV reader part
const csvRoutes = require("./routes/csvRoutes");

app.use("/uploadCsv", csvRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));