import React, { useState } from "react";
import { Button, Modal, TextField, MenuItem, Box, Typography } from "@mui/material";
import { FaSort, FaEdit, FaTrash, FaSave, FaTimes, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PaymentDetailsReport = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [data, setData] = useState([
    { id: 1, name: "John Doe", company: "ABC Corp", amount: "$100", status: "Pending", details: "Invoice #123", date: "2024-02-01" },
    { id: 2, name: "Jane Smith", company: "XYZ Ltd", amount: "$200", status: "Process", details: "Invoice #124", date: "2024-02-02" },
    { id: 3, name: "Michael Johnson", company: "LMN Inc", amount: "$150", status: "Paid", details: "Invoice #125", date: "2024-02-03" },
    { id: 4, name: "Emily Davis", company: "DEF LLC", amount: "$250", status: "Pending", details: "Invoice #126", date: "2024-02-04" },
    { id: 5, name: "William Brown", company: "GHI Enterprises", amount: "$300", status: "Process", details: "Invoice #127", date: "2024-02-05" }
  ]);

  const [editEntry, setEditEntry] = useState(null);
  const [deleteEntry, setDeleteEntry] = useState(null);

  // Sorting Function
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    return (sortConfig.direction === "asc" ? 1 : -1) * a[sortConfig.key].localeCompare(b[sortConfig.key]);
  });

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Payment Details Report", 20, 10);
    doc.autoTable({
      head: [["Name", "Company", "Amount", "Status", "Details", "Date"]],
      body: data.map(item => [item.name, item.company, item.amount, item.status, item.details, item.date])
    });
    doc.save("payment_report.pdf");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Payment Details Report</h2>  
      <div className="flex justify-end mb-6 pr-4">
       <Button variant="contained" color="secondary" onClick={generatePDF} className="px-4 py-2">
       <FaFilePdf className="mr-2" /> Download PDF
       </Button>
     </div>
      <table className="w-full border rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            {[
              { key: "name", label: "Name" },
              { key: "company", label: "Company" },
              { key: "amount", label: "Amount" },
              { key: "status", label: "Status" },
              { key: "details", label: "Details" },
              { key: "date", label: "Date" }
            ].map(column => (
              <th key={column.key} className="p-2 cursor-pointer" onClick={() => setSortConfig({ key: column.key, direction: sortConfig.direction === "asc" ? "desc" : "asc" })}>
                {column.label} <FaSort className="inline" />
              </th>
            ))}
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map(item => (
            <tr key={item.id} className="border-t text-center">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.company}</td>
              <td className="p-2">{item.amount}</td>
              <td className={`p-2 font-semibold ${item.status === "Pending" ? "text-red-500" : item.status === "Process" ? "text-yellow-500" : "text-green-500"}`}>
                {item.status}
              </td>
              <td className="p-2">{item.details}</td>
              <td className="p-2">{item.date}</td>
              <td className="p-2 space-x-2">
                <Button size="small" onClick={() => setEditEntry(item)}><FaEdit className="text-blue-500" /></Button>
                <Button size="small" onClick={() => setDeleteEntry(item)}><FaTrash className="text-red-500" /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Modal open={!!editEntry} onClose={() => setEditEntry(null)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 350, bgcolor: 'background.paper', boxShadow: 24, p: 3, borderRadius: 2 }}>
          <Typography variant="h6" className="text-center mb-4">Edit Entry</Typography>
          <TextField label="Name" value={editEntry?.name || ''} onChange={(e) => setEditEntry({ ...editEntry, name: e.target.value })} fullWidth margin="dense" />
          <TextField label="Company" value={editEntry?.company || ''} onChange={(e) => setEditEntry({ ...editEntry, company: e.target.value })} fullWidth margin="dense" />
          <TextField label="Amount" value={editEntry?.amount || ''} onChange={(e) => setEditEntry({ ...editEntry, amount: e.target.value })} fullWidth margin="dense" />
          <TextField label="Status" select value={editEntry?.status || ''} onChange={(e) => setEditEntry({ ...editEntry, status: e.target.value })} fullWidth margin="dense">
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Process">Process</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
          </TextField>
          <TextField label="Details" value={editEntry?.details || ''} onChange={(e) => setEditEntry({ ...editEntry, details: e.target.value })} fullWidth margin="dense" />
          <TextField label="Date" type="date" value={editEntry?.date || ''} onChange={(e) => setEditEntry({ ...editEntry, date: e.target.value })} fullWidth margin="dense" />
          <div className="flex justify-between mt-4">
            <Button variant="contained" color="secondary" onClick={() => setEditEntry(null)}><FaTimes /> Cancel</Button>
            <Button variant="contained" color="primary" onClick={() => { setData(data.map((item) => (item.id === editEntry.id ? editEntry : item))); setEditEntry(null); }}><FaSave /> Save</Button>
          </div>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={!!deleteEntry} onClose={() => setDeleteEntry(null)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 350, bgcolor: 'background.paper', boxShadow: 24, p: 3, borderRadius: 2 }}>
          <Typography variant="h6" className="text-center mb-4">Confirm Delete</Typography>
          <Typography className="text-center mb-4">Are you sure you want to delete <b>{deleteEntry?.name}</b>?</Typography>
          <div className="flex justify-between">
            <Button variant="contained" color="secondary" onClick={() => setDeleteEntry(null)}><FaTimes /> Cancel</Button>
            <Button variant="contained" color="error" onClick={() => { setData(data.filter(item => item.id !== deleteEntry.id)); setDeleteEntry(null); }}><FaTrash /> Delete</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PaymentDetailsReport;
