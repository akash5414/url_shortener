const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

function setUser(user) {
  console.log(user);
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.SECRET_KEY
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
