import { useEffect, useState } from 'react';
import reportData from '../data/MonthlyReport.json'; // Assuming the JSON is in the same directory or adjust the path accordingly
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

const MonthlyReport = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("");
    const [visibleColumns, setVisibleColumns] = useState({
        sno: true,
        employee_name: true,
        employee_id: true,
        present: true,
        absent: true,
        yard: true,
    });
    const [showDropdown, setShowDropdown] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    useEffect(() => {
        // Load the data (this could also come from an API if needed)
        setData(reportData);
    }, []);

    // Handle Search
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setFilter(value);
        if (value) {
            setData(
                reportData.filter(
                    (row) =>
                        row.employee_name.toLowerCase().includes(value) ||
                        row.employee_id.toLowerCase().includes(value)
                )
            );
        } else {
            setData(reportData);
        }
    };

    // Export to PDF
    const exportToPDF = () => {
        const input = document.getElementById("report-table");
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
            pdf.save("MonthlyReport.pdf");
        });
    };

    // Export to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
        XLSX.writeFile(workbook, "MonthlyReport.xlsx");
    };

    // Toggle Column Visibility
    const toggleColumn = (column) => {
        setVisibleColumns((prev) => ({
            ...prev,
            [column]: !prev[column],
        }));
    };

    // Handle Sorting
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        setData((prevData) => {
            return [...prevData].sort((a, b) => {
                if (a[key] < b[key]) {
                    return direction === 'ascending' ? -1 : 1;
                }
                if (a[key] > b[key]) {
                    return direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        });
    };

    const getSortIndicator = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '↑' : '↓';
        }
        return '';
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Monthly Employee Attendance Report</h1>
            
            <div className="flex flex-wrap justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={filter}
                    onChange={handleSearch}
                    className="p-2 border rounded w-full sm:w-1/3 mb-2 sm:mb-0"
                />
                <div className="flex gap-2">
                    <button
                        onClick={exportToPDF}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Download PDF
                    </button>
                    <button
                        onClick={exportToExcel}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Export Excel
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Column Visibility
                        </button>
                        {showDropdown && (
                            <div className="absolute top-10 right-0 bg-white border rounded shadow-lg z-10 w-40">
                                {Object.keys(visibleColumns).map((column) => (
                                    <label
                                        key={column}
                                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={visibleColumns[column]}
                                            onChange={() => toggleColumn(column)}
                                        />
                                        {column.replace('_', ' ').toUpperCase()}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table
                    id="report-table"
                    className="table-auto border-collapse border border-gray-300 w-full bg-white shadow-md"
                >
                    <thead>
                        <tr>
                            {visibleColumns.sno && (
                                <th
                                    className="border border-gray-300 px-4 py-2 cursor-pointer"
                                    onClick={() => handleSort('sno')}
                                >
                                    # {getSortIndicator('sno')}
                                </th>
                            )}
                            {visibleColumns.employee_name && (
                                <th
                                    className="border border-gray-300 px-4 py-2 cursor-pointer"
                                    onClick={() => handleSort('employee_name')}
                                >
                                    Employee Name {getSortIndicator('employee_name')}
                                </th>
                            )}
                            {visibleColumns.employee_id && (
                                <th
                                    className="border border-gray-300 px-4 py-2 cursor-pointer"
                                    onClick={() => handleSort('employee_id')}
                                >
                                    Employee ID {getSortIndicator('employee_id')}
                                </th>
                            )}
                            {visibleColumns.present && (
                                <th
                                    className="border border-gray-300 px-4 py-2 cursor-pointer"
                                    onClick={() => handleSort('present')}
                                >
                                    Present {getSortIndicator('present')}
                                </th>
                            )}
                            {visibleColumns.absent && (
                                <th
                                    className="border border-gray-300 px-4 py-2 cursor-pointer"
                                    onClick={() => handleSort('absent')}
                                >
                                    Absent {getSortIndicator('absent')}
                                </th>
                            )}
                            {visibleColumns.yard && (
                                <th
                                    className="border border-gray-300 px-4 py-2 cursor-pointer"
                                    onClick={() => handleSort('yard')}
                                >
                                    Yard {getSortIndicator('yard')}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((employee) => (
                            <tr key={employee.sno}>
                                {visibleColumns.sno && (
                                    <td className="border border-gray-300 px-4 py-2">{employee.sno}</td>
                                )}
                                {visibleColumns.employee_name && (
                                    <td className="border border-gray-300 px-4 py-2">
                                        {employee.employee_name}
                                    </td>
                                )}
                                {visibleColumns.employee_id && (
                                    <td className="border border-gray-300 px-4 py-2">{employee.employee_id}</td>
                                )}
                                {visibleColumns.present && (
                                    <td className="border border-gray-300 px-4 py-2">{employee.present}</td>
                                )}
                                {visibleColumns.absent && (
                                    <td className="border border-gray-300 px-4 py-2">{employee.absent}</td>
                                )}
                                {visibleColumns.yard && (
                                    <td className="border border-gray-300 px-4 py-2">{employee.yard}</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MonthlyReport;
