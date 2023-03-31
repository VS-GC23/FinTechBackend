const express = require("express");
const authenticateToken = require("../middleware/auth");
const router = express.Router();
const bodyParser = require("body-parser");
const userController = require("../controllers/userController");

const jsonParser = bodyParser.json();

router.post("/sign-up", jsonParser, userController.sign_up);

router.post("/sign-in", jsonParser, userController.sign_in);

router.post("/reset-password", authenticateToken, jsonParser, userController.reset_password);

router.get("/details", authenticateToken, userController.get_user_details);

router.post("/update-user", authenticateToken, jsonParser, userController.update_user_details);

router.post("/update-aadhar", authenticateToken, jsonParser, userController.update_adhar_details);

router.post("/add-bank-details", authenticateToken, jsonParser, userController.add_bank_details);

router.post("/update-bank-details", authenticateToken, jsonParser, userController.update_bank_details);

router.get("/get-bank-details", authenticateToken, userController.get_bank_details);


module.exports = router;