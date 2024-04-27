const express = require("express");
const Url = require("../models/url");
const { restrictTo } = require("../middlewares/auth");
const router = express.Router();

router.get("/admin/urls", restrictTo('ADMIN'), async(req, res)=>{
  const allUrl = await Url.find({ });
  return res.render("home" , {
    urls: allUrl,
  });
})

router.get("/", restrictTo('ADMIN', "NORMAL"), async(req, res) => {
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
