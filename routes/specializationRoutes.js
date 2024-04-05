const express = require("express");
const router = express.Router();
const specializationController = require("../controllers/specializationController");
const specializationValidation = require("../validations/specializationValidation");
const validateRequests = require("../middleware/validateRequests");

router.post(
  "/create",
  specializationValidation.createSpecializationValidation,
  validateRequests,
  specializationController.createSpecialization
);

router.get("/", specializationController.getSpecializations);

router.put("/:id", specializationController.updateSpecialization);

router.delete("/:id", specializationController.deleteSpecialization);

module.exports = router;
