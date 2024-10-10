const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const signupRoutes = require('./backend/routes/signuproute');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Serve static files (HTML)
app.use(express.static(__dirname));

// Use signup routes
app.use('/', signupRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
