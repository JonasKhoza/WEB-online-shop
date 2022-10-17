const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(user, process.env.AUTHENTICATION_KEY, {
    expiresIn: 24 * 60 * 60,
  });
}

module.exports = generateToken;
