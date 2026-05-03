"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import DeleteModal from "../../../components/common/deleteModal";
import { useDeleteDepartment } from "../../../hooks/department/useDeleteDepartment";
import { useGetDepartments } from "../../../hooks/department/useGetDepartments";
import DataTable from "../../common/dataTable";
import DepartmentModal from "./departmentModal";

export default function Table() {
  const { data, isLoading, isError } = useGetDepartments();
  const { mutate: deleteDept, isPending: isDeleting } = useDeleteDepartment();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const departments = data?.data ?? [];

  const handleEdit = (row) => {
    setEditData({
      id: row._id || row.id,
      name: row.name,
    });
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteDept(deleteId, {
      onSuccess: (data) => {
        if (data?.success) {
          toast.success("Deleted successfully");
          setDeleteOpen(false);
        } else {
          toast.error(data?.message || "Delete failed");
        }
      },
      onError: (error) => {
        toast.error(error?.message || "Delete failed");
      },
    });
  };

  const columns = [
    { header: "ID", accessor: "serial" },
    { header: "Department Name", accessor: "name" },

    {
      header: "Action",
      accessor: "action",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row)}
            className="px-3 py-1 cursor-pointer rounded-lg border border-taskSecondary text-taskSecondary text-sm"
          >
            Edit
          </button>

          <button
            onClick={() => handleDeleteClick(row._id || row.id)}
            className="px-3 py-1 cursor-pointer rounded-lg border border-taskTertiary text-taskTertiary text-sm"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-5 space-y-5">
      <button
        onClick={() => {
          setEditData(null);
          setOpen(true);
        }}
        className="px-5 py-2.5 rounded-xl bg-taskSecondary text-taskPrimary"
      >
        Add Department
      </button>

      <DataTable columns={columns} data={departments} loading={isLoading} error={isError} />

      <DepartmentModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        initialData={editData || { name: "" }}
        title={editData ? "Edit Department" : "Add Department"}
      />

      <DeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        title="Delete Department"
        description="Are you sure you want to delete this department?"
      />
    </div>
  );
}
