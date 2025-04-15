import DataTable from "../DataTable";
import monthlyreport from "../data/MonthlyReport.json";

const InchargeMonthlyReport = () => {
  const columns = [
    { key: "sno", label: "#" },
    { key: "employee_name", label: "Employee Name" },
    { key: "employee_id", label: "Employee ID" },
    { key: "present", label: "Present" },
    { key: "absent", label: "Absent" },
    { key: "yard", label: "Yard" },
  ];

  return <DataTable data={monthlyreport} columns={columns} title="Incharge Monthly Report" />;
};

export default InchargeMonthlyReport;