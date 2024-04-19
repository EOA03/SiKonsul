const express = require("express");
const router = express.Router();
const userController = require("../controllers/userAuthController");
const profileController = require("../controllers/userProfileController");
const premiumController = require("../controllers/premiumController");
const userController2 = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
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

router.get(
  "/profile",
  authMiddleware,
  validateRequests,
  profileController.getUserProfile
);

router.put(
  "/change-email",
  authMiddleware,
  userValidation.changeEmailValidation,
  validateRequests,
  profileController.changeEmail
);

router.put(
  "/change-password",
  authMiddleware,
  userValidation.changePasswordValidation,
  validateRequests,
  profileController.changePassword
);

router.put(
  "/premium",
  authMiddleware,
  validateRequests,
  premiumController.userPremium
)

router.get(
  "/lawyer/:specializationId",
  authMiddleware,
  validateRequests,
  userController2.getLawyersBySpecialization
);

router.get(
  "/user/lawyer/profile/:lawyerId",
  authMiddleware,
  validateRequests,
  userController2.getLawyerProfileById
);

module.exports = router;
