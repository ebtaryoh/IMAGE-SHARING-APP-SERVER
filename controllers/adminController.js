const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Admin Registration (for initial setup, remove in production)
exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    admin = new Admin({ email, password });
    await admin.save();

    res.status(201).json({ msg: "Admin registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return validation errors
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      admin: {
        id: admin.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
