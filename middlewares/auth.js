const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookies = req.cookies?.token;
  req.user = null;
  if (!tokenCookies) return next();

  const token = tokenCookies;
  const user = getUser(token);

  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");

    return next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};
