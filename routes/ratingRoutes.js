const express = require("express");
const router = express.Router();
const RatingController = require("../controllers/ratingController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/add", authMiddleware, RatingController.addOrUpdateRating);

module.exports = router;
