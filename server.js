const mongoose = require("mongoose");
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const cors = require('cors');

const app = express();
const PORT = 3000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json()); // Replaces bodyparser.json()
app.use(express.urlencoded({ extended: true })); // Replaces bodyparser.urlencoded()
app.use(cors());
app.use(express.static(__dirname)); // Serve static files

app.use((req, res, next) => {
    console.log(`📥 Received Request: ${req.method} ${req.url}`);
    console.log("📝 Request Body:", req.body);
    next();
});

// ✅ Import Routes
const aiRoutes = require('./backend/routes/ai');
const signupRoutes = require('./backend/routes/signuproute');
const loginRoutes = require('./backend/routes/loginroute');
const uploadRoutes = require('./backend/routes/uploadRoutes');
const emailRoutes = require("./backend/routes/emailRoutes");
const expertRoutes = require("./backend/routes/expertRoutes");  // Expert Routes

// ✅ Use Routes
app.use('/api/ai', aiRoutes);
app.use('/api/signup', signupRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/upload', uploadRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/experts", expertRoutes); // Experts API

// ✅ MongoDB Connection Status
mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB Connected!");
});

mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB Connection Error:", err);
});

// ✅ Check MongoDB Collections
async function checkCollections() {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("📂 Collections:", collections.map(col => col.name));
    } catch (error) {
        console.error("❌ Error fetching collections:", error);
    }
}

mongoose.connection.once("open", checkCollections);

// ✅ Default Route
app.get("/", (req, res) => {
    res.send("✅ Server is running!");
});

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ✅ Test Email Configuration
console.log("📧 Email:", process.env.EMAIL);
console.log("🔑 Password:", process.env.PASSWORD);
