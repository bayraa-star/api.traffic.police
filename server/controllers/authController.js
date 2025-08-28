const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const JWT_SECRET = process.env.JWT_SECRET;

// Register a new user
const register = async (req, res) => {
  const { username, email, phone, password } = req.body;
  console.log(req.body);

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({
      username,
      email,
      phone,
      password,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Oops! We don't understand your request.", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

    console.log(`User ${user.email} with ID: ${user.id} logged in.`);
    res.status(200).json({ 
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          phone: user.phone,
          role: user.role,
          expiresIn: '86400'
        }
    });
  } catch (error) {
    res.status(500).json({ message: "Oops! We don't understand your request.", error: error.message });
  }
}

module.exports = {
  register,
  login,
};