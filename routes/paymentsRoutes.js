const express = require("express");
const authenticateToken = require("../middleware/auth");
const bodyParser = require("body-parser");
const paymentsController = require("../controllers/paymentsController");

const jsonParser = bodyParser.json();
const router = express.Router();

router.post("/initialise-payment", authenticateToken, jsonParser, paymentsController.initialise_transcations);
router.get("/transaction-history", authenticateToken, paymentsController.get_transaction_history);
router.post("/investments", authenticateToken, jsonParser, paymentsController.initialise_investments);
router.post("/mutual-funds", authenticateToken, jsonParser, paymentsController.initialise_mutualfunds);
router.post("/insurance", authenticateToken, jsonParser, paymentsController.initialise_insurance);
router.get("/get-investments", authenticateToken, paymentsController.get_investments_history);
router.get("/get-mutualfunds", authenticateToken, paymentsController.get_mutualfunds_history);
router.get("/get-insurance", authenticateToken, paymentsController.get_insurance_history);

module.exports = router;