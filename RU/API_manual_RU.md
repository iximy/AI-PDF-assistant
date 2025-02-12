# Документация API 

Этот документ описывает API для AI ассистента, который позволяет загружать PDF документы, задавать вопросы и получать ответы на основе контекста из загруженных документов

---

## Базовый URL

Все запросы API выполняются к базовому URL:
```
http://localhost:5000
```

---

## Эндпоинты API

### 1. Загрузка PDF документа

#### Запрос
- **Метод:** `POST`
- **URL:** `/upload`
- **Тип содержимого:** `multipart/form-data`
- **Параметры:**
  - `file` (обязательный): PDF файл для загрузки.

#### Пример запроса
```bash
curl -X POST -F "file=@document.pdf" http://localhost:5000/upload
```

#### Ответ
- **Успешный ответ:**
  ```json
  {
    "message": "File uploaded successfully",
    "file_path": "documents/document.pdf"
  }
  ```
- **Ошибка:**
  ```json
  {
    "error": "No file part"
  }
  ```

---

### 2. Задать вопрос на основе загруженного документа

#### Запрос
- **Метод:** `POST`
- **URL:** `/ask`
- **Тип содержимого:** `application/json`
- **Параметры:**
  - `query` (обязательный): Вопрос, на который нужно ответить.
  - `file_path` (обязательный): Путь к загруженному PDF файлу.
  - `role` (опциональный): Роль помощника (по умолчанию `assistant`).

#### Пример запроса
```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "query": "Какая тема документа?",
  "file_path": "documents/document.pdf",
  "role": "expert"
}' http://localhost:5000/ask
```

#### Ответ
- **Успешный ответ:**
  ```json
  {
    "response": "Документ описывает планы развития компании на 2025 год"
  }
  ```
- **Ошибка:**
  ```json
  {
    "error": "Missing query or file_path"
  }
  ```

---

## Пример использования

1. **Загрузите PDF документ:**
   ```bash
   curl -X POST -F "file=@document.pdf" http://localhost:5000/upload
   ```
   Ответ:
   ```json
   {
     "message": "File uploaded successfully",
     "file_path": "documents/document.pdf"
   }
   ```

2. **Задайте вопрос на основе загруженного документа:**
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{
     "query": "What is the main topic?",
     "file_path": "documents/document.pdf",
     "role": "expert"
   }' http://localhost:5000/ask
   ```
   Ответ:
   ```json
   {
     "response": "The main topic is artificial intelligence."
   }
   ```

---

## Обработка ошибок

API возвращает следующие коды состояния HTTP:

- **200 OK:** Запрос выполнен успешно.
- **400 Bad Request:** Неверный запрос (например, отсутствует обязательный параметр).
- **500 Internal Server Error:** Внутренняя ошибка сервера.

---

## Логирование

Все запросы и ошибки логируются в файл `logs/app.log`. Уровень логирования можно настроить в конфигурационном файле `config/config.json`.

---

## Конфигурация

Настройки API, такие как хост, порт, путь к документам и ключ API для Ollama, хранятся в файле `config/config.json`. Пример конфигурации:

```json
{
    "ollama": {
        "model_name": "llama3.1",
        "host": "http://localhost:11434"
    },
    "server": {
        "host": "0.0.0.0",
        "port": 5000
    },
    "logging": {
        "level": "INFO",
        "file": "logs/app.log"
    },
    "documents_path": "documents/"
}
```

---
