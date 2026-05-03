"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useGetDeletedEmployees } from "../../../hooks/employee/deleted/useGetDeletedEmployees";
import { usePermanentDeleteEmployee } from "../../../hooks/employee/deleted/usePermanentDeleteEmployee";
import { useRestoreEmployee } from "../../../hooks/employee/deleted/useRestoreEmployee";
import DataTable from "../../common/dataTable";
import DeleteModal from "../../common/deleteModal";
import EmployeeViewModal from "../employee/employeeViewModal";

export default function DeletedEmployeeTable() {
  const { data, isLoading } = useGetDeletedEmployees();
  const { mutate: restoreEmp, isPending: restoring } = useRestoreEmployee();
  const { mutate: deleteEmp, isPending: deleting } = usePermanentDeleteEmployee();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewData, setViewData] = useState(null);

  const employees = data?.data ?? [];

  const handleRestore = (id) => {
    restoreEmp(id, {
      onSuccess: () => {
        toast.success("Employee restored");
      },
      onError: (err) => {
        toast.error(err?.message || "Restore failed");
      },
    });
  };

  const handleView = (row) => {
    setViewData(row);
    setViewOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteEmp(deleteId, {
      onSuccess: () => {
        toast.success("Deleted permanently");
        setDeleteOpen(false);
      },
      onError: (err) => {
        toast.error(err?.message || "Delete failed");
      },
    });
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },

    {
      header: "Department",
      accessor: "department",
      render: (row) => row.department?.name || "-",
    },

    { header: "Designation", accessor: "designation" },

    {
      header: "Action",
      accessor: "action",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRestore(row._id);
            }}
            disabled={restoring}
            className="px-3 py-1 cursor-pointer rounded-lg border border-taskSecondary text-taskSecondary text-sm hover:bg-taskSecondary hover:text-taskPrimary transition"
          >
            Active
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(row._id);
            }}
            className="px-3 py-1 cursor-pointer rounded-lg border border-taskTertiary text-taskTertiary text-sm hover:bg-taskTertiary/10"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-5 space-y-5">
      <DataTable
        columns={columns}
        data={employees}
        loading={isLoading}
        onRowClick={(row) => handleView(row)}
      />

      <DeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={deleting}
        title="Permanent Delete"
        description="This action cannot be undone. Are you sure?"
      />

      <EmployeeViewModal open={viewOpen} onClose={() => setViewOpen(false)} data={viewData} />
    </div>
  );
}
