// controllers/authController.js

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Helper to generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ========================
// Register new user
// ========================
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      return next(new Error("Email already exists"));
    }

    // Create user (password will be hashed in User model pre-save hook)
    const user = await User.create({
      name,
      email,
      password,
      role: role || "citizen",
    });

    // Generate JWT token
    const token = generateToken(user);

    // Send response (without password)
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error); // pass to centralized error middleware
  }
};

// ========================
// Login user
// ========================
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      return next(new Error("Invalid credentials"));
    }

    // Check password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      return next(new Error("Invalid credentials"));
    }

    // Generate token
    const token = generateToken(user);

    // Send response (without password)
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// ========================
// Logout user
// ========================
exports.logoutUser = async (req, res, next) => {
  try {
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};