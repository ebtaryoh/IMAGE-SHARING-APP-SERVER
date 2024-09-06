// const express = require("express");
// const router = express.Router();
// const { check } = require("express-validator");
// const { loginAdmin, registerAdmin } = require("../controllers/adminController");

// // Admin Registration (for initial setup)
// router.post(
//   "/register",
//   [
//     check("email", "Please include a valid email").isEmail(),
//     check("password", "Password must be at least 6 characters").isLength({
//       min: 6,
//     }),
//   ],
//   registerAdmin
// );

// // Admin Login
// router.post(
//   "/login",
//   [
//     check("email", "Please include a valid email").isEmail(),
//     check("password", "Password is required").exists(),
//   ],
//   loginAdmin
// );

// module.exports = router;
