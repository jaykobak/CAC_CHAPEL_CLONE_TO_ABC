import React, { useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { getUnits, deleteUnit, getMembers } from '@/services/api/apiEndpoints';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const UnitsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rowSelection, setRowSelection] = useState({});
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(false);

  // Column definitions
  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
      size: 40,
    },
    {
      accessorKey: 'title', 
      header: 'Unit Name',
      cell: ({ row }) => (
        <button 
          onClick={() => handleUnitClick(row.original)}
          className="text-blue-600 hover:underline"
        >
          {row.getValue('title')}
        </button>
      )
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleDelete(row.original.id)}
        >
          Delete
        </Button>
      ),
    },
  ];


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUnits();
        setData(Array.isArray(res) ? res : res?.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

 
  const handleUnitClick = async (unit) => {
    setSelectedUnit(unit);
    setMembersLoading(true);
    try {
      const response = await getMembers();
      // Filter members by unitId
      const unitMembers = response.data.filter(member => member.unitId === unit.id);
      setMembers(unitMembers);
    } catch (err) {
      setError('Failed to fetch members');
    } finally {
      setMembersLoading(false);
    }
  };

  // Close sidebar
  const closeSidebar = () => {
    setSelectedUnit(null);
    setMembers([]);
  };

  // Delete unit
  const handleDelete = async (unitId) => {
    try {
      await deleteUnit(unitId);
      setData(data.filter(unit => unit.id !== unitId));
      if (selectedUnit?.id === unitId) {
        closeSidebar();
      }
    } catch (err) {
      setError('Failed to delete unit');
    }
  };

  // Initialize table
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <p className="text-center">Loading table...</p>;
  }

  if (error) {
    return <p className="text-red-600 text-center">Error: {error}</p>;
  }

  return (
    <div className="flex h-full">
      {/* Main Table Content */}
      <div className={`${selectedUnit ? 'w-2/3' : 'w-full'} pr-4`}>
        <div className="space-y-4 w-full">
         
          
          <div className="rounded-md border text-nowrap max-w-full overflow-auto">
            <Table className="min-w-[800px]">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow 
                      key={row.id} 
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell 
                      colSpan={columns.length} 
                      className="h-24 text-center"
                    >
                      No units found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Selected rows actions */}
          {Object.keys(rowSelection).length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                onClick={() => {
                  const selectedIds = table.getSelectedRowModel().rows.map(row => row.original.id);
                  // Implement bulk delete
                  console.log('Selected IDs:', selectedIds);
                }}
              >
                Delete Selected ({Object.keys(rowSelection).length})
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Members Sidebar */}
      {selectedUnit && (
        <div className="w-1/3 border-l p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              Members in {selectedUnit.title}
            </h2>
            <button onClick={closeSidebar} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>
          
          {membersLoading ? (
            <p className="text-center">Loading members...</p>
          ) : members.length > 0 ? (
            <div className="space-y-2">
              {members.map(member => (
                <div key={member.id} className="p-3 border rounded-lg">
                  <p className="font-medium">{member.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No members in this unit</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UnitsPage;