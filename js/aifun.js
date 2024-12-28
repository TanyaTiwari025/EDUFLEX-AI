document.getElementById('ai-submit').addEventListener('click', async () => {
    const prompt = document.getElementById('ai-input').value;

    if (!prompt) {
        alert('Please enter a question.');
        return;
    }

    const responseDiv = document.getElementById('ai-response');
    responseDiv.innerHTML = 'Thinking...';

    try {
        const response = await fetch('/api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();

        if (response.ok) {
            responseDiv.innerHTML = data.message;
        } else {
            responseDiv.innerHTML = 'Error: Unable to get a response.';
        }
    } catch (error) {
        responseDiv.innerHTML = 'Error: Network issue.';
        console.error(error);
    }
});
