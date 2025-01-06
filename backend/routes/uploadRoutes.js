const express = require('express');
const multer = require('multer');
const File = require('../models/file'); // Import the File model

const router = express.Router();

// Multer configuration to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route for uploading PDF files
router.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }

        // Create and save the file document
        const file = new File({
            name: req.file.originalname,
            data: req.file.buffer,
            contentType: req.file.mimetype,
        });

        await file.save();
       res.status(200).send("File uploaded and saved to database successfully");
        console.log("File uploaded and saved to database successfully");
    } catch (err) {
        console.error("Error uploading file:", err);
        res.status(500).send("Error uploading file");
    }
});

// Route for retrieving files by ID
router.get('/files/:id', async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) {
            return res.status(404).send("File not found");
        }

        res.set('Content-Type', file.contentType);
        res.send(file.data); // Send the binary file data
    } catch (err) {
        console.error("Error retrieving file:", err);
        res.status(500).send("Error retrieving file");
    }
});

module.exports = router;
