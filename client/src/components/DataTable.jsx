import React, { useEffect, useRef } from 'react';


import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-dt';

import 'datatables.net-buttons-dt/css/buttons.dataTables.min.css';
import 'datatables.net-buttons-dt';

import 'datatables.net-buttons/js/buttons.html5.min';
import 'datatables.net-buttons/js/buttons.print.min';

// jQuery is required for DataTables
import $ from 'jquery';

const DataTable = () => {
  const tableRef = useRef();

  useEffect(() => {
    // Destroy any existing DataTable instance
    if ($.fn.dataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    // Initialize DataTable
    $(tableRef.current).DataTable({
      dom: '<"flex flex-wrap justify-between items-center mb-4"Bf>rt<"flex justify-between items-center mt-4"ip>',
      buttons: [
        {
          extend: 'copy',
          text: 'Copy',
          className: 'bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600',
        },
        {
          extend: 'csv',
          text: 'CSV',
          className: 'bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600',
        },
        {
          extend: 'excel',
          text: 'Excel',
          className: 'bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600',
        },
        {
          extend: 'pdf',
          text: 'PDF',
          className: 'bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600',
        },
        {
          extend: 'print',
          text: 'Print',
          className: 'bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600',
        },
      ],
      responsive: true,
      data: generateData(),
      columns: generateColumns(),
    });

    return () => {
      // Cleanup: Destroy DataTable on component unmount
      if ($.fn.dataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
    };
  }, []);

  const generateData = () => {
    return Array.from({ length: 10 }, (_, index) => [
      `Name ${index + 1}`,
      Math.floor(Math.random() * 50) + 20,
      ['USA', 'Canada', 'Mexico', 'UK'][Math.floor(Math.random() * 4)],
      `Data ${index + 1}`,
      `Data ${index + 1}`,
    ]);
  };

  const generateColumns = () => [
    { title: 'Name' },
    { title: 'Age' },
    { title: 'Country' },
    { title: 'Column 4' },
    { title: 'Column 5' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Responsive Data Table</h1>
      <div className="overflow-x-auto">
        <table
          id="example"
          ref={tableRef}
          className="display stripe hover w-full text-sm text-left text-gray-800"
        ></table>
      </div>
    </div>
  );
};

export default DataTable;
