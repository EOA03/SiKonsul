const express = require("express");
const router = express.Router();
const lawyerController = require("../controllers/lawyerAuthController");
const lawyerValidation = require("../validations/lawyerValidation");
const validateRequests = require("../middleware/validateRequests");

router.post(
  "/auth/register",
  lawyerValidation.registerValidation,
  validateRequests,
  lawyerController.register
);

router.post(
  "/auth/login",
  lawyerValidation.loginValidation,
  validateRequests,
  lawyerController.login
);

module.exports = router;
