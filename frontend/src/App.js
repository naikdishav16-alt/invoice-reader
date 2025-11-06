import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [invoices, setInvoices] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filter, setFilter] = useState("");

  // Fetch invoices from backend
  const fetchInvoices = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/invoices");
      if (!res.ok) throw new Error("Failed to fetch invoices");
      const data = await res.json();
      setInvoices(data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Upload CSV file
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("✅ Upload successful!");
        fetchInvoices();
      } else {
        alert("❌ Upload failed!");
      }
    } catch (error) {
      alert("⚠️ Upload failed: " + error.message);
    }
  };

  // Sort table by clicking on column header
  const handleSort = (column) => {
    const order = column === sortColumn && sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...invoices].sort((a, b) => {
      if (a[column] < b[column]) return order === "asc" ? -1 : 1;
      if (a[column] > b[column]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setInvoices(sorted);
    setSortColumn(column);
    setSortOrder(order);
  };

  // Filter table rows by search text
  const filteredInvoices = invoices.filter((invoice) =>
    Object.values(invoice)
      .join(" ")
      .toLowerCase()
      .includes(filter.toLowerCase())
  );

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📂 Invoice Reader</h1>
      <p>Drag and drop a CSV file here or click below:</p>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => handleFileUpload(e.target.files[0])}
        style={{ marginBottom: "10px" }}
      />

      <br />
      <input
        type="text"
        placeholder="🔍 Filter by name, vendor, date..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          margin: "10px 0",
          padding: "8px",
          width: "250px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <button
  onClick={async () => {
    if (window.confirm("Are you sure you want to delete all invoices?")) {
      const res = await fetch("http://127.0.0.1:5000/api/delete_all", {
        method: "DELETE",
      });
      if (res.ok) {
        alert("🗑 All invoices deleted!");
        setInvoices([]);
      } else {
        alert("❌ Failed to delete invoices!");
      }
    }
  }}
  style={{
    marginLeft: "10px",
    padding: "8px 15px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }}
>
  Delete All Invoices
</button>


      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0", cursor: "pointer" }}>
            <th onClick={() => handleSort("File")}>File ⬍</th>
            <th onClick={() => handleSort("Name")}>Name ⬍</th>
            <th onClick={() => handleSort("Vendor")}>Vendor ⬍</th>
            <th onClick={() => handleSort("Date")}>Date ⬍</th>
            <th onClick={() => handleSort("Amount")}>Amount ⬍</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.length > 0 ? (
            filteredInvoices.map((invoice, index) => (
              <tr key={index} style={{ textAlign: "center", borderBottom: "1px solid #ddd" }}>
                <td>{invoice.File}</td>
                <td>{invoice.Name}</td>
                <td>{invoice.Vendor}</td>
                <td>{invoice.Date}</td>
                <td>{invoice.Amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ padding: "10px", color: "gray" }}>
                No invoices found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
