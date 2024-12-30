document.getElementById('ai-submit').addEventListener('click', async () => {
    const prompt = document.getElementById('ai-input').value;
    
    if (!prompt) {
        alert('Please enter a question.');
        return;
    }

    const responseDiv = document.getElementById('ai-response');
    responseDiv.innerHTML = 'Thinking...';

    try {
        const response = await fetch('http://localhost:3000/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({ prompt }),
        });
        console.log(prompt)
        const data = await response.json();
        const text = JSON.stringify(data.result, null, 2)
        console.log(text)
        if (response.ok) {
            responseDiv.innerHTML = text.replace(/\*/g, "").replace(/\n/g, "");
        } else {
            responseDiv.innerHTML = 'Error: Unable to get a response.';
        }
    } catch (error) {
        responseDiv.innerHTML = 'Error: Network issue.';
        console.error(error);

        
    }
});
