// routes/adminRoutes.js
const express = require("express");
const { loginAdmin } = require("../controllers/adminLoginController");

const router = express.Router();

// Admin login route
router.post("/login", loginAdmin);

module.exports = router;
