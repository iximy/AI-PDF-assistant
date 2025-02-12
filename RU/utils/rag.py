from ollama import Client
import json

with open('config/config.json') as config_file:
    config = json.load(config_file)

# Инициализация клиента Ollama
client = Client(host=config['ollama']['host'])

def generate_response(query, context, role="assistant"):
    # Формируем сообщение с контекстом и запросом
    messages = [
        {"role": "system", "content": f"You are a {role}. Provide helpful and accurate answers."},
        {"role": "user", "content": f"Context: {context}\n\nQuery: {query}"}
    ]

    # Отправляем запрос к модели
    response = client.chat(
        model=config['ollama']['model_name'],
        messages=messages
    )

    # Возвращаем ответ
    return response['message']['content']