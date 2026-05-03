"use client";

import Modal from "../../common/modal";

export default function EmployeeViewModal({ open, onClose, data }) {
  if (!open || !data) return null;

  return (
    <Modal isOpen={open} onClose={onClose}>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-taskSecondary text-center">Employee Details</h2>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-taskTertiary">Name</span>
            <span className="text-taskSecondary font-medium">{data.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-taskTertiary">Email</span>
            <span className="text-taskSecondary">{data.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-taskTertiary">Phone</span>
            <span className="text-taskSecondary">{data.phone}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-taskTertiary">Department</span>
            <span className="text-taskSecondary">{data.department?.name || "-"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-taskTertiary">Designation</span>
            <span className="text-taskSecondary">{data.designation}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-taskTertiary">Salary</span>
            <span className="text-taskSecondary">₹ {data.salary}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-taskTertiary">Joining Date</span>
            <span className="text-taskSecondary">
              {data.joiningDate ? new Date(data.joiningDate).toLocaleDateString() : "-"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-taskTertiary">Status</span>
            <span
              className={`px-2 py-1 rounded-lg text-xs ${
                data.isDeleted ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
              }`}
            >
              {data.isDeleted ? "Inactive" : "Active"}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 cursor-pointer rounded-xl bg-taskSecondary text-taskPrimary"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
