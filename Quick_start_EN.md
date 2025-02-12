# Instructions on how to quickly launch a project from Git

This guide will help you quickly deploy and launch an AI agent with a chatbot function and RAG functionality on your local computer or server.

---

## Preliminary requirements

1. **Install Python 3.8 or higher:**
- Download and install Python from [official website](https://www.python.org/downloads /).
   - Make sure that Python is added to the PATH.

2. **Install Git:**
- Download and install Git from [official website](https://git-scm.com/downloads ).

3. **Install Ollama:**
   - Follow the instructions on the [Ollama official website](https://ollama.ai /) to install and configure the model.

---

## Steps to launch the project

### 1. Clone the repository

Open the terminal and run the command to clone the repository:

```bash
git clone https://github.com/iximy/ai-pdf-assistant.git
cd ai-agent
```


---

### 2. Install the dependencies

Create a virtual environment and install the necessary dependencies:
Software: Python, ollama, git 
Libraries: os, Json, ollama,Flask, logging, os, PyPDF2

---

###3. Set up the configuration

Create a configuration file `config/config.json` and fill it in according to your settings:

```json
{
    "ollama": {
        "model_name": "ollama-model",
        "api_key": "your_api_key_here"
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

###4. Start the server

Start the server using the command:

```bash
python main.py
```

The server will be available at `http://localhost:5000 `.

---

### 5. Use the web interface

Open a browser and navigate to `http://localhost:5000 `. You will see a web interface that allows you to:

- Upload PDF documents.
- Ask questions based on uploaded documents.

---

###6. Use the API

You can interact with the API via the command line or using tools such as Postman.

#### Example of a document upload request:
``bash
curl -X POST -F'file=@document.pdf " http://localhost:5000/upload
```

#### Example of a question request:
``bash
curl -X POST -H "Content-Type: application/json" -d '{"query": "What is the main topic?", "file_path": "documents/document.pdf"}' http://localhost:5000/ask
```

---

## Additional commands

- **Server shutdown:** Press Ctrl+C in the terminal where the server is running.

---