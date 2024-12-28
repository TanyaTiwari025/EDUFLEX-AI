const axios = require('axios');

const getAIResponse = async (req, res) => {
    try {
        const { prompt } = req.body;

        // Call OpenAI API
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const aiMessage = response.data.choices[0].message.content;
        res.status(200).json({ message: aiMessage });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Something went wrong with the AI response.' });
    }
};

module.exports = { getAIResponse };
