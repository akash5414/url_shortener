const express = require("express");
const Url = require("../models/url");
const router = express.Router();

router.get("/", async(req, res) => {
  if(!req.user) return res.render("login");
  const allUrl = await Url.find({ createdBy: req.user._id });
  return res.render("home" , {
    urls: allUrl,
  });
});

router.get("/signup", (req, res)=>{
    return res.render("signup");
})

router.get("/login", (req, res)=>{
    return res.render("login");
})



module.exports = router;
