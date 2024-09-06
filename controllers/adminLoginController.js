// controllers/adminLoginController.js
const jwt = require('jsonwebtoken');

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the entered email and password match the hardcoded credentials
    if (
      email === process.env.ADMIN_EMAIL && 
      password === process.env.ADMIN_PASSWORD
    ) {
      // Generate a JWT token for the admin
      const token = jwt.sign(
        { role: 'admin' }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );

      return res.status(200).json({ token, message: 'Admin logged in successfully!' });
    }

    // If credentials don't match
    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in.', error: error.message });
  }
};
