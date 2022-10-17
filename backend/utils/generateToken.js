const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(user, process.env.AUTHENTICATION_KEY, {
    expiresIn: process.env.EXPIRES,
  });
}

module.exports = generateToken;
