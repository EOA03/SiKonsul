const express = require("express");
const {
  blockAccount,
  unblockAccount,
} = require("../controllers/adminController");

const router = express.Router();

router.post("/block/:accountId", blockAccount);
router.post("/unblock/:accountId", unblockAccount);

module.exports = router;
