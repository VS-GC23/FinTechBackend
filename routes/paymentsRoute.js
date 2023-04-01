const express = require("express");
const paymentsController = require("../controllers/paymentsController");

const router = express.Router();

router.post("/initialise_payment", paymentsController.initialise_transcations);
router.get("/transaction_history", paymentsController.get_transaction_history);
router.post("/investments", paymentsController.initialise_investments)
router.post("/mutual_funds", paymentsController.initialise_mutualfunds);
router.post("/insurance", paymentsController.initialise_insurance)
router.get("/get_investments", paymentsController.get_investments_history)
router.get("/get_mutualfunds", paymentsController.get_mutualfunds_history)
router.get("/get_insurance", paymentsController.get_insurance_history)

module.exports = router;