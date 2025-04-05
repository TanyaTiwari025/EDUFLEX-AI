require("dotenv").config();
const nodemailer = require("nodemailer");

// Configure transport settings
const transporter = nodemailer.createTransport({
    service: "gmail", // Change if using another email service
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
    },
});

// Function to send email to the expert
async function sendExpertEmail(expertEmail, studentName, serviceRequested) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: expertEmail,
        subject: "New Consultation Request",
        text: `${studentName} has requested a consultation for "${serviceRequested}". Please review and accept the request.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent to expert successfully.");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

// Function to send consultation email from student
async function sendConsultationEmail(studentEmail, studentName, message) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Admin or expert receiving the consultation request
        subject: "New Student Consultation Request",
        text: `Student Name: ${studentName}\nEmail: ${studentEmail}\nMessage: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Consultation email sent successfully.");
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: "Failed to send email" };
    }
}

module.exports = { sendExpertEmail, sendConsultationEmail };
