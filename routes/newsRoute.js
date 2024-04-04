const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

router.get("/feed", newsController.getNewsFeed);

module.exports = router;
