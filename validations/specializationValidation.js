const { body } = require("express-validator");

exports.createSpecializationValidation = [
  body("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Specialization name is required"),
];
