from flask_cors import CORS
from flask import Flask, request, jsonify, render_template
from utils.document_processor import extract_text_from_pdf, save_document
from utils.rag import generate_response
import os
import json

app = Flask(__name__, template_folder='../web/templates', static_folder='../web/static')

# Route for the root page
@app.route('/')
def index():
    return render_template('index.html')

# The route to download the document
@app.route('/upload', methods=['POST'])
def upload_document():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    file_path = save_document(file, file.filename)
    return jsonify({"message": "File uploaded successfully", "file_path": file_path}), 200

# The route for the request to the model
@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    # Blocking incoming data
    print("Incoming data:", data)

    query = data.get('query')
    file_path = data.get('file_path')
    role = data.get('role', 'assistant')  # The default role is "Assistant"

    if not query or not file_path:
        return jsonify({"error": "Missing query or file_path"}), 400

    try:
        context = extract_text_from_pdf(file_path)
        response = generate_response(query, context, role)  # Passing the role to the function
        return jsonify({"response": response}), 200
    except Exception as e:
        # Logging the error
        print("Error in ask_question:", str(e))
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    with open('../config/config.json') as config_file:
        config = json.load(config_file)
    app.run(host=config['server']['host'], port=config['server']['port'])