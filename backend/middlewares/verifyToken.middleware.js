const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const cookies = req.headers.cookie;

  let cookie = cookies && cookies.split(";");
  let tokenCookie;
  if (cookies && cookie.length > 0) {
    for (selectedCookie of cookie) {
      if (selectedCookie.includes("token")) {
        tokenCookie = selectedCookie;
      }
    }
  }

  let token;
  let decoded;

  try {
    if (tokenCookie) {
      token = tokenCookie.split("=")[1];
      decoded = jwt.verify(token, process.env.AUTHENTICATION_KEY);
      req.user = decoded;
    } else {
      return res.json({ message: "Unauthorized user! Please login" });
    }
  } catch (error) {
    res.status(401).json("   Unauthorized! Please login");
    next(error);
  }

  next();
}

module.exports = verifyToken;
