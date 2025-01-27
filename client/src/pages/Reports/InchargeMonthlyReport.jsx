import { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import emp1 from '../emp1.png';  // Import your image

const InchargeMonthlyReport = () => {
    const initialData = [
        { sno: 1, name: "Vimal Raj/ Rathana Kumar", id: "NA", present: 27, absent: 5, yard: "Thirunagar colony(SHG/CW)", zone: "Zone 1", photo: emp1 },
        { sno: 2, name: "MayilVaganan/NarayanaSamy", id: "NA", present: 28, absent: 4, yard: "R.N Pudur(SHG/DRIVER)", zone: "Zone 1", photo: emp1 },
        { sno: 3, name: "Gowtham/Duraisamy", id: "NA", present: 24, absent: 8, yard: "R.N Pudur(SHG/CW)", zone: "Zone 1", photo: emp1 },
        { sno: 4, name: "Farman/Firose Ahamed", id: "NA", present: 26, absent: 6, yard: "B.P Agraharam(SHG/CW)", zone: "Zone 1", photo: emp1 },
        { sno: 5, name: "Karthikeyan/Ramasamy", id: "00", present: 19, absent: 13, yard: "Veerappanchatram(SHG/CW)", zone: "Zone 1", photo: emp1 },
        { sno: 6, name: "Mathanraj/Ponnuvel", id: "NA", present: 27, absent: 5, yard: "B.P Agraharam(MCC/SHG)", zone: "Zone 1", photo: emp1 },
        { sno: 7, name: "Sundarrajan/Subramani", id: "NA", present: 26, absent: 6, yard: "Vairapalayam(MCC/SHG)", zone: "Zone 1", photo: emp1 },
        { sno: 8, name: "Maheshwari/Ramasamy", id: "00", present: 24, absent: 8, yard: "B.P Agraharam(PT/DBC)", zone: "Zone 1", photo: emp1 },
    ];

    const [data, setData] = useState(initialData);
    const [filter, setFilter] = useState("");
    const [visibleColumns, setVisibleColumns] = useState({
        sno: true,
        name: true,
        id: true,
        present: true,
        absent: true,
        yard: true,
        zone: true,
        photo: true,
    });
    const [showDropdown, setShowDropdown] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    // Handle Search
    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setFilter(value);
        if (value) {
            setData(
                initialData.filter(
                    (row) =>
                        row.name.toLowerCase().includes(value) ||
                        row.zone.toLowerCase().includes(value)
                )
            );
        } else {
            setData(initialData);
        }
    };

    // Export to PDF
    const exportToPDF = () => {
        const input = document.getElementById("report-table");
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
            pdf.save("InchargeMonthlyReport.pdf");
        });
    };

    // Export to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
        XLSX.writeFile(workbook, "InchargeMonthlyReport.xlsx");
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

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Incharge Monthly Report</h1>
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
                                        {column}
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
                                <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={() => handleSort('sno')}>
                                    #
                                </th>
                            )}
                            {visibleColumns.name && (
                                <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>
                                    Employee Name
                                </th>
                            )}
                            {visibleColumns.id && (
                                <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={() => handleSort('id')}>
                                    Employee ID
                                </th>
                            )}
                            {visibleColumns.present && (
                                <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={() => handleSort('present')}>
                                    Present
                                </th>
                            )}
                            {visibleColumns.absent && (
                                <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={() => handleSort('absent')}>
                                    Absent
                                </th>
                            )}
                            {visibleColumns.yard && (
                                <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={() => handleSort('yard')}>
                                    Yard
                                </th>
                            )}
                            {visibleColumns.zone && (
                                <th className="border border-gray-300 px-4 py-2 cursor-pointer" onClick={() => handleSort('zone')}>
                                    Zone
                                </th>
                            )}
                            {visibleColumns.photo && (
                                <th className="border border-gray-300 px-4 py-2">
                                    Photo
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.sno}>
                                {visibleColumns.sno && (
                                    <td className="border border-gray-300 px-4 py-2">{row.sno}</td>
                                )}
                                {visibleColumns.name && (
                                    <td className="border border-gray-300 px-4 py-2">
                                        {row.name}
                                    </td>
                                )}
                                {visibleColumns.id && (
                                    <td className="border border-gray-300 px-4 py-2">{row.id}</td>
                                )}
                                {visibleColumns.present && (
                                    <td className="border border-gray-300 px-4 py-2">
                                        {row.present}
                                    </td>
                                )}
                                {visibleColumns.absent && (
                                    <td className="border border-gray-300 px-4 py-2">
                                        {row.absent}
                                    </td>
                                )}
                                {visibleColumns.yard && (
                                    <td className="border border-gray-300 px-4 py-2">{row.yard}</td>
                                )}
                                {visibleColumns.zone && (
                                    <td className="border border-gray-300 px-4 py-2">{row.zone}</td>
                                )}
                                {visibleColumns.photo && (
                                    <td className="border border-gray-300 px-4 py-2">
                                        <img src={row.photo} alt={row.name} className="w-16 h-16 object-cover" />
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InchargeMonthlyReport;
