import DataTable from "../DataTable";
import emp1 from "../../assets/emp2.png"// Import image

const InchargeMonthlyReport = () => {
  const columns = [
    { key: "sno", label: "#" },
    { key: "name", label: "Employee Name" },
    { key: "id", label: "Employee ID" },
    { key: "present", label: "Present" },
    { key: "absent", label: "Absent" },
    { key: "yard", label: "Yard" },
    { key: "zone", label: "Zone" },
    { key: "photo", label: "Photo", type: "image" },
  ];

  const data = [
    { sno: 1, name: "Vimal Raj/ Rathana Kumar", id: "NA", present: 27, absent: 5, yard: "Thirunagar colony(SHG/CW)", zone: "Zone 1", photo: emp1 },
    { sno: 2, name: "MayilVaganan/NarayanaSamy", id: "NA", present: 28, absent: 4, yard: "R.N Pudur(SHG/DRIVER)", zone: "Zone 1", photo: emp1 },
    { sno: 3, name: "Gowtham/Duraisamy", id: "NA", present: 24, absent: 8, yard: "R.N Pudur(SHG/CW)", zone: "Zone 1", photo: emp1 },
    { sno: 4, name: "Farman/Firose Ahamed", id: "NA", present: 26, absent: 6, yard: "B.P Agraharam(SHG/CW)", zone: "Zone 1", photo: emp1 },
  ];

  return <DataTable title="Incharge Monthly Report" columns={columns} data={data} />;
};

export default InchargeMonthlyReport;
