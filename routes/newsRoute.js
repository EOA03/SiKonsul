const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

router.get("/news/feed", newsController.getLatestNews);

module.exports = router;