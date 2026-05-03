"use client";

import { useState } from "react";
import { useGetDepartments } from "../../../hooks/department/useGetDepartments";
import { useGetEmployees } from "../../../hooks/employee/useGetEmployees";
import DataTable from "../../common/dataTable";
import EmployeeModal from "./employeeModel";
import EmployeeViewModal from "./employeeViewModal";

export default function EmployeeTable() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewData, setViewData] = useState(null);

  const { data, isLoading } = useGetEmployees({
    search,
    department,
    minSalary,
    maxSalary,
    sort,
    page,
    limit,
  });

  const handleView = (row) => {
    setViewData(row);
    setViewOpen(true);
  };

  const { data: deptData } = useGetDepartments();
  const departments = deptData?.data ?? [];

  const rawEmployees = Array.isArray(data?.data) ? data.data : (data?.data?.employees ?? []);

  const totalItems =
    data?.total ??
    data?.data?.total ??
    data?.pagination?.total ??
    data?.pagination?.total_items ??
    rawEmployees.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  const employees = rawEmployees.map((item, index) => ({
    ...item,
    serial: (page - 1) * limit + index + 1,
  }));

  const handleEdit = (row) => {
    setEditData({
      id: row._id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      department: row.department?._id,
      designation: row.designation,
      salary: row.salary,
      joiningDate: row.joiningDate?.split("T")[0],
      isDeleted: row.isDeleted,
    });
    setOpen(true);
  };

  const columns = [
    { header: "ID", accessor: "serial" },
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
      header: "Salary",
      accessor: "salary",
      render: (row) => `₹ ${row.salary}`,
    },

    {
      header: "Joining Date",
      accessor: "joiningDate",
      render: (row) => (row.joiningDate ? new Date(row.joiningDate).toLocaleDateString() : "-"),
    },

    {
      header: "Action",
      accessor: "action",
      render: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(row);
          }}
          className="px-3 py-1 cursor-pointer rounded-lg border border-taskSecondary text-taskSecondary text-sm"
        >
          Edit
        </button>
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
        Add Employee
      </button>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <input
          placeholder="Search by Name or Email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 rounded-xl border border-taskTertiary/40 bg-taskPrimary text-taskSecondary"
        />

        <select
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 rounded-xl border border-taskTertiary/40 bg-taskPrimary text-taskSecondary"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Min Salary"
          value={minSalary}
          onChange={(e) => {
            setMinSalary(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 rounded-xl border border-taskTertiary/40"
        />

        <input
          placeholder="Max Salary"
          value={maxSalary}
          onChange={(e) => {
            setMaxSalary(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 rounded-xl border border-taskTertiary/40"
        />

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 rounded-xl border border-taskTertiary/40 bg-taskPrimary text-taskSecondary"
        >
          <option value="">Sort</option>
          <option value="salary_asc">Salary ↑</option>
          <option value="salary_desc">Salary ↓</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={employees}
        loading={isLoading}
        onRowClick={(row) => handleView(row)}
      />

      <div className="flex justify-between items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 cursor-pointer  rounded-lg border border-taskTertiary text-taskSecondary disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-taskSecondary text-sm">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 rounded-lg cursor-pointer   border border-taskTertiary text-taskSecondary disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="flex gap-2">
        {[5, 10, 20].map((l) => (
          <button
            key={l}
            onClick={() => {
              setLimit(l);
              setPage(1);
            }}
            className={`px-3 py-1 rounded-lg text-sm border ${
              limit === l
                ? "bg-taskSecondary text-taskPrimary"
                : "border-taskTertiary text-taskSecondary"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <EmployeeModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        initialData={editData || {}}
        title={editData ? "Edit Employee" : "Add Employee"}
      />

      <EmployeeViewModal open={viewOpen} onClose={() => setViewOpen(false)} data={viewData} />
    </div>
  );
}
