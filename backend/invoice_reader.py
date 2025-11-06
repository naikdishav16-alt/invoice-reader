import os
import csv

INPUT_DIR = os.path.join("..", "Data", "Files", "Input")

def read_invoices():
    invoices = []
    if not os.path.exists(INPUT_DIR):
        print("Input folder not found:", INPUT_DIR)
        return invoices

    for file in os.listdir(INPUT_DIR):
        if file.endswith(".csv"):
            filepath = os.path.join(INPUT_DIR, file)
            with open(filepath, encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    invoices.append({
                        "File": file,
                        "Name": row.get("Name", ""),
                        "Vendor": row.get("Vendor", ""),
                        "Date": row.get("Date", ""),
                        "Amount": row.get("Amount", "")
                    })
    return invoices
