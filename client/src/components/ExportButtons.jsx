import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import the autoTable plugin
import PropTypes from "prop-types";

const ExportButtons = ({ data, logo }) => {
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Employees");

    const currentDate = getCurrentDate();
    const fileName = `EmployeeData_${currentDate}.xlsx`;

    XLSX.writeFile(wb, fileName);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Add company logo if provided
    if (logo) {
      doc.addImage(logo, "PNG", 10, 10, 30, 30); // Adjust position and size
    }

    // Add a title to the PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Employee Data", 70, 20); // Center title

    // Add table content using autoTable
    const tableData = data.map((row, index) => [
      index + 1,
      row.yardName,
      row.present,
      row.absent,
      row.zone,
      row.inchargeName,
    ]);

    doc.autoTable({
      head: [["#", "Yard Name", "Present", "Absent", "Zone", "Incharge Name"]],
      body: tableData,
      startY: 50, // Adjust start position below the logo
    });

    const currentDate = getCurrentDate();
    const fileName = `EmployeeData_${currentDate}.pdf`;

    // Save the PDF
    doc.save(fileName);
  };

  return (
    <div className="mb-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
        onClick={exportToExcel}
      >
        Export to Excel
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
        onClick={exportToPDF}
      >
        Export to PDF
      </button>
    </div>
  );
};

ExportButtons.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      yardName: PropTypes.string.isRequired,
      present: PropTypes.number.isRequired,
      absent: PropTypes.number.isRequired,
      zone: PropTypes.string.isRequired,
      inchargeName: PropTypes.string.isRequired,
      inchargePhoto: PropTypes.string, // Optional
    })
  ).isRequired,
  logo: PropTypes.string, // Optional logo
};

export default ExportButtons;
