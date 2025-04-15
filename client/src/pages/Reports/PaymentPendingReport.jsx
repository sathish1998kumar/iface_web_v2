import { useEffect, useState } from "react";
import paymentData from "../data/PaymentDetails.json"; // Assuming JSON file exists
import DataTable from "../DataTable";

const PaymentDetailsReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Load data from JSON (or replace with API call if needed)
    setData(paymentData.invoices);
  }, []);
  
  // Define columns for DataTable
  const columns = [
    { key: "id", label: "Invoice ID" },
    { key: "name", label: "Customer Name" },
    { key: "company", label: "Company Name" },
    { key: "amount", label: "Invoice Amount" },
    { key: "status", label: "Payment Status" },
    { key: "details", label: "Invoice Details" },
    { key: "date", label: "Invoice Date" }
  ];

  return (
    <div>
      <DataTable 
        data={data} columns={columns} title="Payment Details Report" 
      />
    </div>
  );
};

export default PaymentDetailsReport;
