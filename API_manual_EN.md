# API Documentation 

This document describes an API for the AI Assistant that allows you to download PDF documents, ask questions, and get context-based answers from uploaded documents.

---

## Base URL

All API requests are made to the base URL:
```
http://localhost:5000
```

---

## API Endpoints

###1. Download a PDF document

#### Request
- **Method:** `POST`
- **URL:** `/upload`
- **Content type:** `multipart/form-data`
- **Parameters:**
- `file' (required): PDF file for download.

#### Request example
```bash
curl -X POST -F "file=@document.pdf" http://localhost:5000/upload
```

#### Answer
- **Successful response:**
  ```json
  {
    "message": "File uploaded successfully",
    "file_path": "documents/document.pdf"
  }
  ```
- **Error:**
``json
{
"error": "No file part"
}
``

---

###2. Ask a question based on the uploaded document

#### Request
- **Method:** `POST`
- **URL:** `/ask`
- **Content type:** `application/json`
- **Parameters:**
- `query' (required): The question to be answered.
  - `file_path' (required): The path to the uploaded PDF file.
  - `role` (optional): The role of the assistant (default is `assistant`).

#### Request example
```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "query": "What is the subject of the document?",
"file_path": "documents/document.pdf",
  "role": "expert"
}' http://localhost:5000/ask
```

#### Answer
- **Successful response:**
``json
{
"response": "The document describes the company's development plans for 2025"
}
``
- **Error:**
``json
{
"error": "Missing query or file_path"
}
``

---

## Usage example

1. **Upload a PDF document:**
``bash
   curl -X POST -F "file=@document.pdf" http://localhost:5000/upload
   ```
   Response:
``json
   {
     "message": "File uploaded successfully",
     "file_path": "documents/document.pdf"
   }
   ```

2. **Ask a question based on the uploaded document:**
   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{
     "query": "What is the main topic?",
     "file_path": "documents/document.pdf",
     "role": "expert"
   }' http://localhost:5000/ask
   ```
   Response:
``json
   {
     "response": "The main topic is artificial intelligence."
   }
   ```

---

## Error handling

The API returns the following HTTP status codes:

- **200 OK:** The request was completed successfully.
- **400 Bad Request:** Invalid request (for example, a required parameter is missing).
- **500 Internal Server Error:** Internal server error.

---

## Logging

All requests and errors are logged in the `logs/app.log` file. The logging level can be configured in the configuration file `config/config.json`.

---

## Configuration

API settings such as the host, port, document path, and API key for Ollama are stored in the `config/config.json` file. Configuration example:

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