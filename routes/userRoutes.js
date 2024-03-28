const express = require("express");
const router = express.Router();
const userController = require("../controllers/userAuthController");
const userValidation = require("../validations/userValidation");
const validateRequests = require("../middleware/validateRequests");

router.post(
  "/auth/register",
  userValidation.registerValidation,
  validateRequests,
  userController.register
);

router.post(
  "/auth/login",
  userValidation.loginValidation,
  validateRequests,
  userController.login
);

module.exports = router;
