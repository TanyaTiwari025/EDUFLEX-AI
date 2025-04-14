// backend/routes/consultationRoutes.js

const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/send-consultation-email", async (req, res) => {
  const {
    studentName,
    studentEmail,
    service,
    expertName,
    expertEmail
  } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your email
      pass: process.env.EMAIL_PASS  // your app password
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: expertEmail,
    subject: `New Consultation Request from ${studentName}`,
    text: `
You have received a new consultation request:

Student Name: ${studentName}
Student Email: ${studentEmail}
Requested Service: ${service}

Please reach out to the student at your earliest convenience.
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Consultation request email sent to the expert!" });
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    res.status(500).json({ error: "Failed to send consultation email." });
  }
});

module.exports = router;
