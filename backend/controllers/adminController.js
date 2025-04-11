const adminLogin = (req, res) => {
    const { username, password } = req.body;
  
    // Replace with your actual admin credentials
    if (username === 'admin' && password === 'admin123') {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  };
  
  module.exports = { adminLogin };
  