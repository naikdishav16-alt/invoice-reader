#  Invoice Reader

A simple full-stack project to read and summarize CSV invoice files.  
Built using **Flask (Python)** for the backend and **React** for the frontend.

---

## Project Structure

invoice-reader/
│
├── backend/ # Flask backend API
│ ├── app.py # Main Flask app
│ ├── invoice_reader.py # Reads CSV invoices
│ ├── requirements.txt # Backend dependencies
│
├── frontend/ # React frontend
│ ├── src/ # React components
│ ├── public/
│ ├── package.json
│
├── Data/
│ └── Files/
│ └── Input/ # CSV files uploaded here
│
├── Logs/
│
└── README.md

yaml
Copy code

---

## How to Run the Project

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
Runs on: http://127.0.0.1:5000

2️ Frontend
bash
Copy code
cd frontend
npm install
npm start
Runs on: http://localhost:3000

 Features
Drag and drop invoice CSV upload

Invoice summary table (Name, Vendor, Date, Amount)

Delete all invoices option

Auto-refresh table after upload

 Example CSV
c
Copy code
Name,Vendor,Date,Amount
Titus,Amazon,2025-11-04,1500
Disha,Flipkart,2025-11-05,2000
Adithya,Apple,2025-11-06,2500
