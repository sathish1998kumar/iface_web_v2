import React from "react";
import DataTable from "../DataTable";

const initialData = [
  { sno: 1, shift: "Shift 1", timeSlot: "5am-6am", animator: 0, ft_dbc: 0, incharge: 22, mcc_shg: 0, per_cw: 109, pt_dbc: 33, shg_cw: 114, shg_driver: 25, total: 303 },
  { sno: 2, shift: "", timeSlot: "6am-6:30am", animator: 0, ft_dbc: 0, incharge: 19, mcc_shg: 0, per_cw: 215, pt_dbc: 146, shg_cw: 575, shg_driver: 112, total: 1067 },
  { sno: 3, shift: "", timeSlot: "6:30am-7am", animator: 0, ft_dbc: 0, incharge: 4, mcc_shg: 0, per_cw: 12, pt_dbc: 22, shg_cw: 51, shg_driver: 16, total: 105 },
  { sno: 4, shift: "", timeSlot: "7am-1pm", animator: 2, ft_dbc: 0, incharge: 9, mcc_shg: 24, per_cw: 9, pt_dbc: 34, shg_cw: 98, shg_driver: 7, total: 183 },
  { sno: "Total:", shift: "", timeSlot: "", animator: 2, ft_dbc: 0, incharge: 55, mcc_shg: 24, per_cw: 345, pt_dbc: 235, shg_cw: 855, shg_driver: 161, total: 1677 },
];

const columns = [
  { label: "Sno", key: "sno" },
  { label: "Shift", key: "shift" },
  { label: "Time Slot", key: "timeSlot" },
  { label: "Animator", key: "animator" },
  { label: "FT/DBC", key: "ft_dbc" },
  { label: "Incharge", key: "incharge" },
  { label: "MCC/SHG", key: "mcc_shg" },
  { label: "PER/CW", key: "per_cw" },
  { label: "PT/DBC", key: "pt_dbc" },
  { label: "SHG/CW", key: "shg_cw" },
  { label: "SHG/Driver", key: "shg_driver" },
  { label: "Total", key: "total" },
];

const TimeBasedReport = () => {
  return <DataTable title="Time Based Report" columns={columns} data={initialData} />;
};

export default TimeBasedReport;
