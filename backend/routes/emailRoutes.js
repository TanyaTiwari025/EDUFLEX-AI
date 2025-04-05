const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Email sending route
router.post("/send-consultation-email", async (req, res) => {
    const { name, email, message } = req.body;

    // Email configuration
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // Add your email in .env
            pass: process.env.EMAIL_PASS, // Add your password in .env
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "expert@example.com", // Replace with actual recipient
        subject: "New Consultation Request",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send email" });
    }
});

module.exports = router;
