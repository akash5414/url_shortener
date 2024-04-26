const {getUser} = require('../service/auth');

async function restrictToLoggedinUserOnly(req, res, next){
    const userUid = req.cookies?.uid;
    if(!userUid) return res.redirect("/login");
    console.log("userUid:" ,userUid);
    const user = getUser(userUid);
    console.log("user:" ,user);
    if(!user) return res.redirect("/login");
    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const userId = req.cookies?.uid;
    const user = getUser(userId);
    req.user = user;
    next();
};

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
}