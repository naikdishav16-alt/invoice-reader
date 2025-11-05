from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from invoice_reader import read_invoices

app = Flask(__name__)
CORS(app)

INPUT_DIR = os.path.join("..", "Data", "Files", "Input")

@app.route("/api/invoices")
def get_invoices():
    return jsonify(read_invoices())

@app.route("/api/upload", methods=["POST"])
def upload_file():
    file = request.files.get('file')
    if not file or not file.filename:
        return jsonify({"error": "No file provided"}), 400
    
    os.makedirs(INPUT_DIR, exist_ok=True)
    file.save(os.path.join(INPUT_DIR, file.filename))
    
    return jsonify({"message": "Uploaded"}), 201

if __name__ == "__main__":
    app.run(debug=True)