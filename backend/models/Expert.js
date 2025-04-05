const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
    fullName: { type: String, required: true }, // ✅ Updated field name to camelCase
    email: { type: String, required: true, unique: true },
    expertise: { type: String, required: true },
    linkedin: { type: String, required: true }
});

const Expert = mongoose.model("Expert", expertSchema);
module.exports = Expert;
