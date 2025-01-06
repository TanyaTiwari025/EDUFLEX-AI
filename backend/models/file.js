const mongoose = require('mongoose');

// Define the FileSchema
const FileSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the file
    data: { type: Buffer, required: true }, // File data as a binary buffer
    contentType: { type: String, required: true }, // MIME type of the file
    uploadDate: { type: Date, default: Date.now }, // Upload timestamp
});

// Export the model
module.exports = mongoose.model('File', FileSchema);
