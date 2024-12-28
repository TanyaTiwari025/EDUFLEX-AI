const express = require('express');
const { getAIResponse } = require('../controllers/aiController');

const router = express.Router();

// POST route to handle AI requests
router.post('/', getAIResponse);

module.exports = router;
