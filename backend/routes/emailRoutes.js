const express = require("express");
const router = express.Router();
const { sendExpertEmail } = require("../controllers/emailService"); // ✅ use the service

router.post("/send-consultation-email", async (req, res) => {
  const {
    studentName,
    studentEmail,
    service,
    expertName,
    expertEmail
  } = req.body;

  try {
    await sendExpertEmail(expertEmail, studentName, studentEmail, service); // ✅ call helper
    res.status(200).json({ message: "Consultation request email sent to the expert!" });
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    res.status(500).json({ error: "Failed to send consultation email." });
  }
});

module.exports = router;
