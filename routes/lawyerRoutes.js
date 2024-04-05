const express = require("express");
const router = express.Router();
const lawyerController = require("../controllers/lawyerAuthController");
const lawyerController2 = require("../controllers/lawyerController");

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

router.get(
  "/specialization/:specializationId",
  lawyerController2.getLawyersBySpecialization
);

router.get("/", lawyerController2.getAllLawyers);

module.exports = router;
