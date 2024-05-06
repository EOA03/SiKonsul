const express = require("express");
const router = express.Router();
const lawyerController = require("../controllers/lawyerAuthController");
const lawyerController2 = require("../controllers/lawyerController");
const authMiddleware = require("../middleware/authMiddleware");
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

router.get(
  "/profile/:lawyerId",
  authMiddleware,
  lawyerController2.getLawyerProfile
);

router.get("/", lawyerController2.getAllLawyers);
router.get("/:lawyerId", lawyerController2.getLawyerById);

module.exports = router;
