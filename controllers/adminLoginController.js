// controllers/adminLoginController.js

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the entered email and password match the hardcoded credentials
    if (
      email === process.env.ADMIN_EMAIL && 
      password === process.env.ADMIN_PASSWORD
    ) {
      return res.status(200).json({ message: 'Admin logged in successfully!' });
    }

    // If credentials don't match
    return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in.', error: error.message });
  }
};
