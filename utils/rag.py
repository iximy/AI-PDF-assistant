from ollama import Client
import json

with open('config/config.json') as config_file:
    config = json.load(config_file)

# Initializing the Ollama client
client = Client(host=config['ollama']['host'])

def generate_response(query, context, role="assistant"):
    # Forming a message with context and query
    messages = [
        {"role": "system", "content": f"You are a {role}. Provide helpful and accurate answers."},
        {"role": "user", "content": f"Context: {context}\n\nQuery: {query}"}
    ]

    # Sending a request to the model
    response = client.chat(
        model=config['ollama']['model_name'],
        messages=messages
    )

    # Returning the response
    return response['message']['content']