// File upload processing
document.getElementById('uploadButton').addEventListener('click', () => {
    document.getElementById('file').click();
});

document.getElementById('file').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            document.getElementById('fileName').innerText = `File uploaded: ${file.name}`;
          //   alert(result.message);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file');
        }
    }
});

// Request Processing
document.getElementById('askForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('query').value;
    const fileInput = document.getElementById('file');
    const filePath = 'documents/' + fileInput.files[0].name;
    const role = document.getElementById('role').value;

    if (!query) {
        alert('Enter a question');
        return;
    }

    // Adding the user's question to the chat
    const chatWindow = document.getElementById('chatWindow');
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.innerText = `You: ${query}`;
    chatWindow.appendChild(userMessage);

   // Adding the "Type..." indicator
    const typingMessage = document.createElement('div');
    typingMessage.className = 'message bot';
    typingMessage.innerText = 'Bot: Type...';
    chatWindow.appendChild(typingMessage);

    // Scroll down the chat
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try {
        const response = await fetch('/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query, file_path: filePath, role })
        });
        const result = await response.json();

        // Replace "Prints..." with the answer
        typingMessage.innerText = `Bot: ${result.response}`;
    } catch (error) {
        console.error('Error asking question:', error);
        // Replace "Type..." with an error message.
        typingMessage.innerText = 'Bot: Error: Couldn t get a response';
    }

    // Clearing the input field
    document.getElementById('query').value = '';
    // Scroll down the chat
    chatWindow.scrollTop = chatWindow.scrollHeight;
});