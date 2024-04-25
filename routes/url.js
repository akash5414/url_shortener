const express = require('express');
const {handleGenerateNewShortUrl ,handleGetAnalytics ,handleRedirect } = require('../controllers/url');
const router = express.Router();
const Url = require('../models/url');

router.post("/", handleGenerateNewShortUrl);
router.get("/analytics/:shortId", handleGetAnalytics);
router.get("/:shortId", handleRedirect);
  
module.exports = router;