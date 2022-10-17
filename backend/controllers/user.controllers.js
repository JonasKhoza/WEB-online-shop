const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//INSTALL IT(BCRYPTJS) FIRST THING IN THE MORNING
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");
function getSignup(req, res, next) {}

//Creating a user
async function getUserSignup(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const fullName = req.body.fullname;
  const street = req.body.street;
  const postal = req.body.postal;
  const city = req.body.city;
  const contacts = req.body.contacts;

  if (
    !email.includes("@") ||
    password.trim().length < 6 ||
    !fullName ||
    !street ||
    !postal ||
    !city ||
    !contacts
  ) {
    return res.json({
      message:
        "Invalid credentials, please enter correct input. Password must not be less than 6 characters long and email must be valid",
    });
  }

  let existingUser;

  try {
    existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.json({ message: "User already exists! Maybe try and login!" });
    }
  } catch (error) {
    res.status(500).json({
      message:
        "Unfortunately, something went wrong in our server while trying to sign you in!",
    });
    next(error);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 15);
    const userModel = new User(
      email,
      hashedPassword,
      fullName,
      street,
      postal,
      city,
      contacts
    );

    const createdUser = await userModel.saveUser();
    if (createdUser) {
      res.json({ success: "Successfully created user" });
    }
  } catch (error) {
    res.status(500).json({
      message:
        "Unfortunately, something went wrong in our server while trying to sign you in!",
    });
    return next(error);
  }
}

async function getUserLogin(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  let existingUser;

  try {
    existingUser = await User.findByEmail(email);
    if (!existingUser) {
      return res.json({ message: "No user with this email available" });
    }
  } catch (error) {
    next(error);
  }

  let EqualPasssWords;

  try {
    EqualPasssWords = await bcrypt.compare(password, existingUser.password);
    if (!EqualPasssWords) {
      return res.json({
        message: "Invalid password! Please check your inputs!",
      });
    }
  } catch (error) {
    next(error);
  }

  const user = {
    id: existingUser._id,
    email: existingUser.email,
    fullName: existingUser.fullName,
    isAdmin: existingUser.isAdmin,
  };

  req.session.uid = existingUser._id;

  const token = generateToken(user);

  res.status(200).cookie("token", token, {
    path: "/",
    sameSite: "none",
    secure: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  // res.cookie(String(existingUser._id), token, {
  //   path: "/",
  //   expires: new Date(Date.now() + 1000 * 30), // 30 seconds
  //   httpOnly: true,
  //   sameSite: "lax",
  // cookie.serialize(authKey, correctKey, options);
  // });
  // res.setHeaders("Set-Coookie", "isLogged=true");
  // res.append("Set-Cookie", "age=44; path=/");
  // res.setHeader("Set-Cookie", "age=44; name=ok; something=else; path=/");

  res.status(201).json({
    success: "You are logged in",
    user: { id: existingUser._id, isAdmin: existingUser.isAdmin },
  });

  // sends cookie with sessionID automatically in response
  // res.json({ isLogged: "Successfully logged in" }, { user: uid });

  //If res.ok in then Navigate("/") from frontend
}
function getLogin(req, res, next) {}
function isAuth(req, res) {
  const user = req.user;
  try {
    if (user) {
      return res.status(201).json(user);
    }
  } catch (error) {
    res.status(400).json({ message: "Not found" });
  }
}
function destroyCookie(req, res, next) {
  const cookies = req.headers.cookie;

  let cookie = cookies && cookies.split(";");

  if (cookies && cookie.length > 0) {
    for (selectedCookie of cookie) {
      if (selectedCookie.includes("token")) {
        res.clearCookie("token");
      }
    }
  }
  req.message = "Done";

  next();
}
function logoutUser(req, res) {
  res.clearCookie("token");
  res.json({ message: "Deleted" });
}
module.exports = {
  getSignup: getSignup,
  getUserSignup: getUserSignup,
  getUserLogin: getUserLogin,
  getLogin: getLogin,
  isAuth: isAuth,
  logoutUser: logoutUser,
  destroyCookie: destroyCookie,
};
