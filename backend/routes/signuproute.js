const express = require('express');
const router = express.Router();
const User = require('../models/usermodels');
const jwt = require('jsonwebtoken'); // ✅ Needed for token
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET; // ✅ Replace this with env variable in production

router.post('/', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('All fields are required');
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

       // const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password
        });

        await newUser.save();
        res.status(201).json({ message: 'Signup successful!' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
