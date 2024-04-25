const shortid = require('shortid');
const Url = require('../models/url');
async function handleGenerateNewShortUrl(req, res){
    const shortUrl = shortid();
    const url = req.body.url;
    if(!url) return res.status(400).json({error: 'url is required'});
    await Url.create({
        shortId: shortUrl,
        redirectUrl: url,
        visitedHistorty: [],
    });
    return res.json({ shortId: shortUrl});
};

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await Url.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics
};