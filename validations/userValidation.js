const { body } = require("express-validator");

exports.registerValidation = [
  body("name").not().isEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("NIK")
    .isLength({ min: 16, max: 16 })
    .withMessage("NIK must be 16 characters long"),
  body("occupation").optional()
];

exports.loginValidation = [
  body("email").isEmail().withMessage("Enter a valid email"),
];

exports.changeEmailValidation = [
  body("email").isEmail().withMessage("Enter a valid email"),
];

exports.changePasswordValidation = [
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
