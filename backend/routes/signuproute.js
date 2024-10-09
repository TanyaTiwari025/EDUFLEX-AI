const express = require('express');
const router = express.Router();
const User = require('../models/usermodels');
const bcrypt = require('bcrypt');

// Handle form submission for signup
router.post('/signup', async (req, res) => {
  
    const { firstName,lastName,email, password } = req.body;

    // Simple validation
    if ( !email || !password) {
        return res.status(400).send('All fields are required');
    }
    try {
    // Check for existing user
    const existingUser = await User.findOne( { email:"email" });
    if (existingUser) {
        return res.status(400).send('Username or email already exists');
    }

   

    // Create a new user instance
    const newUser = new User({firstName,lastName,email, password});

  
        
        // Save user to the database
        await newUser.save();
        res.send('Signup successful! User data saved.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
