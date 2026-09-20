const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../authentication/jwt-auth");
const { handleHashPassword, comparePassword } = require("./bcryptAuth");

require("../authentication/google");

const frontend_url = process.env.FRONTEND_URL;

const handleUserSignup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already registered" });
    }

    const assignRole = "patient";

    const hashedPassword = await handleHashPassword(password);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: assignRole,
    });

    const token = generateToken(newUser);

    return res
      .cookie("LoggedInToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(201)
      .json({
        message: "SignUp successfully",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      });
  } catch (error) {
    next(error);
  }
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is Required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is Required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not Registered" });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "INVALID CREDENTIAL" });
    }

    const token = generateToken(user);

    return res
      .cookie("LoggedInToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      });
  } catch (error) {
    next(error);
  }
};

const handleLogout = (req, res) => {
  res.clearCookie("LoggedInToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  return res.status(200).json({ message: "Logged out successfully" });
};

const handleGoogleAuth = (req, res) => {
  return res.status(200).json({
    message: "Verification via google",
    user: {
      googleId: req.user.googleId,
      username: req.user.username,
      email: req.user.email,
    },
  });
};

const handleAuth = (req, res) => {
  return res.status(200).json({
    user: req.user,
    message: "Authenticated",
  });
};

const handleGoogleSetCookie = (req, res) => {
  if (!frontend_url) {
    return res.status(500).send("frontend_url not set");
  }

  if (!req.user)
    return res.redirect(`${frontend_url}/login?error=missing-user`);

  const token = generateToken(req.user);

  res.cookie("LoggedInToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
  });

  return res.redirect(`${frontend_url}/oauth-google`);
};

module.exports = {
  handleUserSignup,
  handleUserLogin,
  handleLogout,
  handleGoogleAuth,
  handleAuth,
  handleGoogleSetCookie,
};
