const shortid = require('shortid');
const Url = require('../models/url');
async function handleGenerateNewShortUrl(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'});
    const shortUrl = shortid();
    await Url.create({
        shortId: shortUrl,
        redirectUrl: body.url,
        visitedHistorty: [],
        createdBy: req.user._id,
    });
    return res.render('home', { id : shortUrl });
};

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await Url.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory?.length,
        analytics: result.visitHistory,
    })
}

async function handleRedirect(req, res){
    const shortId = req.params.shortId;
    const result = await Url.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timeStamp: Date.now(),
                }
            }
        }
    )
    return res.redirect(result.redirectUrl);
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetAnalytics,
    handleRedirect,
};