const express = require('express');
const router = express.Router();
const Expert = require('../models/Expert');

// ✅ Route to register an expert
router.post("/register", async (req, res) => {
    try {
        console.log("📥 Received Request: POST /register");
        console.log("📝 Request Body:", req.body);

        const { fullName, email, expertise, linkedin } = req.body;

        // Validate all fields
        if (!fullName || !email || !expertise || !linkedin) {
            console.log("❌ Missing Fields:", { fullName, email, expertise, linkedin });
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if expert already exists
        const existingExpert = await Expert.findOne({ email });
        if (existingExpert) {
            console.log("⚠️ Expert already registered:", email);
            return res.status(400).json({ error: "Expert already registered" });
        }

        // Save new expert
        const newExpert = new Expert({ fullName, email, expertise, linkedin });
       const response  =  await newExpert.save();
       console.log(response)

        console.log("✅ Expert registered successfully!");
        res.status(201).json({ message: "Expert registered successfully!" });
        res.send('successful')

    } catch (error) {
        console.error("❌ Server Error:", error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

// ✅ Route to fetch all experts
router.get("/all", async (req, res) => {
    try {
        const experts = await Expert.find();
        res.status(200).json(experts);
    } catch (error) {
        console.error("❌ Error fetching experts:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
