import PyPDF2
import os
import json

with open('config/config.json') as config_file:
    config = json.load(config_file)

def extract_text_from_pdf(file_path):
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ''
        for page in reader.pages:
            text += page.extract_text()
        return text

def save_document(file, filename):
    documents_path = config['documents_path']
    if not os.path.exists(documents_path):
        os.makedirs(documents_path)
    file_path = os.path.join(documents_path, filename)
    with open(file_path, 'wb') as f:
        f.write(file.read())
    return file_path