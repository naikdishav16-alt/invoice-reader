import os
import csv
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Folder to store invoice files
INPUT_FOLDER = os.path.join("Data", "Files", "Input")
os.makedirs(INPUT_FOLDER, exist_ok=True)


# 🔹 Function to read all invoices from CSV files
def read_invoices():
    invoices = []
    if not os.path.exists(INPUT_FOLDER):
        return invoices

    for file in os.listdir(INPUT_FOLDER):
        if file.endswith(".csv"):
            file_path = os.path.join(INPUT_FOLDER, file)
            try:
                with open(file_path, newline="", encoding="utf-8") as csvfile:
                    reader = csv.DictReader(csvfile)
                    for row in reader:
                        invoices.append({
                            "File": file,
                            "Name": row.get("Name", ""),
                            "Vendor": row.get("Vendor", ""),
                            "Date": row.get("Date", ""),
                            "Amount": row.get("Amount", "")
                        })
            except Exception as e:
                print(f"Error reading {file}: {e}")
    return invoices


# 🔹 API: Get all invoices
@app.route("/api/invoices", methods=["GET"])
def get_invoices():
    return jsonify(read_invoices())


# 🔹 API: Upload a new CSV file
@app.route("/api/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    try:
        file_path = os.path.join(INPUT_FOLDER, file.filename)
        file.save(file_path)
        return jsonify({"message": "File uploaded successfully!"}), 200
    except Exception as e:
        print("Upload error:", e)
        return jsonify({"error": str(e)}), 500


# 🔹 API: Delete all invoices
@app.route("/api/delete_all", methods=["DELETE"])
def delete_all_invoices():
    try:
        if os.path.exists(INPUT_FOLDER):
            for file in os.listdir(INPUT_FOLDER):
                file_path = os.path.join(INPUT_FOLDER, file)
                if os.path.isfile(file_path):
                    os.remove(file_path)
        return jsonify({"message": "All invoices deleted successfully!"}), 200
    except Exception as e:
        print("Error deleting invoices:", e)
        return jsonify({"error": str(e)}), 500


# 🔹 Run Flask app
if __name__ == "__main__":
    app.run(debug=True)

