const express = require("express");
const { handleGenerateNewShortUrl , handleGetAnalytics} = require("../controllers/url");
const router = express.Router();
console.log("2");
router.post("/" , handleGenerateNewShortUrl);

router.get("/analytics/:shortid", handleGetAnalytics);

module.exports = router;