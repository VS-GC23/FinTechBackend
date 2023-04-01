const express = require("express");
const authenticateToken = require("../middleware/auth");
const router = express.Router();
const bodyParser = require("body-parser");
const accountController = require("../controllers/accountController");

const jsonParser = bodyParser.json();

router.post("/details", authenticateToken, jsonParser, accountController.get_details);


module.exports = router;