import designationData from "../data/Designation.json";
import DataTable from "../DataTable";

const DesignationReport = () => {
  const columns = [
    { key: "sno", label: "#" },
    { key: "designation", label: "Designation" },
    { key: "total", label: "Total" },
    { key: "present", label: "Present" },
    { key: "absent", label: "Absent" }
  ];

  return <DataTable data={designationData} columns={columns} title="Designation Report" />;
};

export default DesignationReport;
