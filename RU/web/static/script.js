// Обработка загрузки файла
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
            document.getElementById('fileName').innerText = `Загружен файл: ${file.name}`;
          //  alert(result.message);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file');
        }
    }
});

// Обработка запроса
// Обработка запроса
document.getElementById('askForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.getElementById('query').value;
    const fileInput = document.getElementById('file');
    const filePath = 'documents/' + fileInput.files[0].name;
    const role = document.getElementById('role').value;

    if (!query) {
        alert('Введите вопрос');
        return;
    }

    // Добавляем вопрос пользователя в чат
    const chatWindow = document.getElementById('chatWindow');
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.innerText = `Вы: ${query}`;
    chatWindow.appendChild(userMessage);

    // Добавляем индикатор "Печатает..."
    const typingMessage = document.createElement('div');
    typingMessage.className = 'message bot';
    typingMessage.innerText = 'Бот: Печатает...';
    chatWindow.appendChild(typingMessage);

    // Прокручиваем чат вниз
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

        // Заменяем "Печатает..." на ответ
        typingMessage.innerText = `Бот: ${result.response}`;
    } catch (error) {
        console.error('Error asking question:', error);
        // Заменяем "Печатает..." на сообщение об ошибке
        typingMessage.innerText = 'Бот: Ошибка: Не удалось получить ответ';
    }

    // Очищаем поле ввода
    document.getElementById('query').value = '';
    // Прокручиваем чат вниз
    chatWindow.scrollTop = chatWindow.scrollHeight;
});