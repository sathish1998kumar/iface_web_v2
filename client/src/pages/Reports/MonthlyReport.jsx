import { useEffect, useState } from 'react';
import reportData from '../data/MonthlyReport.json'; // Assuming the JSON is in the same directory or adjust the path accordingly
import DataTable from '../DataTable';

const MonthlyReport = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Load the data (this could also come from an API if needed)
        setData(reportData);
    }, []);

    // Define columns for DataTable
    const columns = [
        { key: 'sno', label: '#' },
        { key: 'employee_name', label: 'Employee Name' },
        { key: 'employee_id', label: 'Employee ID' },
        { key: 'present', label: 'Present' },
        { key: 'absent', label: 'Absent' },
        { key: 'yard', label: 'Yard' }
    ];

    return (
        <div>
            <DataTable data={data} columns={columns} title="Monthly Employee Attendance Report" />
        </div>
    );
};

export default MonthlyReport;
