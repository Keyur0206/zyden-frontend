"use client";

import Modal from "../../common/modal";
import EmployeeForm from "./employeeForm";

export default function EmployeeModal({ open, onClose, initialData, title }) {
  if (!open) return null;

  return (
    <Modal isOpen={open} onClose={onClose}>
      <h2 className="text-xl font-semibold text-taskSecondary mb-5 text-center">{title}</h2>

      <EmployeeForm initialData={initialData} onClose={onClose} />
    </Modal>
  );
}
