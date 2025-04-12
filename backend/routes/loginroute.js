const express = require("express");
const jwt = require("jsonwebtoken");
const User = require('../models/usermodels');
const bcrypt = require('bcrypt');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found. Kindly register first." });
    }

   // const isMatch = await user.comparePassword(password);

   const isMatch = await bcrypt.compare(password,user.password);

   
   console.log(isMatch)
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Password or Email" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    // Send as HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 2 * 60 * 60 * 1000 // 2 hours
    });

    res.status(200).json({ message: "Login successful" });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
