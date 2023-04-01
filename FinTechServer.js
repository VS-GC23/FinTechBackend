require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user_routes = require("./routes/userRoutes");
<<<<<<< HEAD
// const transaction_routes = require("./routes/transactionRoutes");

const path = require("path");

=======
>>>>>>> 8bedaa03e043eedb9eba6202a563dffc882c97c3

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

//CSV reader part
const csvRoutes = require("./routes/csvRoutes");

app.use("/uploadCsv", csvRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));