// src/pages/Units/List.jsx
import React from 'react';
import DataTable from "@/components/Admin/Units/Table/Table";
import AddMember from "@/components/Admin/Units/addUnit.jsx/addunit";


function list() {
  return (
    <div className="flex flex-col space-y-5">
    <div className="flex items-start justify-between">
      <h1 className="text-lg font-semibold">All Units</h1>
      <AddMember />
    </div>
    <DataTable />
  </div>
  )
}

export default list