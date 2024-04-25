const express = require('express');
const Url = require('../models/url')
const router = express.Router();

router.get('/' , (req,res)=>{
    return res.render("home");
})

router.get('/analytics', async(req, res)=>{
    const allUrl = await Url.find({});
    return res.render("analytics",{
        urls: allUrl
    });
  });

module.exports = router;