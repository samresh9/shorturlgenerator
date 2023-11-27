const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  handleUrlDelete,
  handleReturnAllUrls,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShortUrl);
// router.get("/" handleReturnAllUrls)
router.post("/delete", handleUrlDelete);
router.get("/analytics/:shortid", handleGetAnalytics);
module.exports = router;
