"use client";

import Modal from "../../common/modal";
import DepartmentForm from "./departmentForm";

export default function DepartmentModal({ open, onClose, initialData, title }) {
  if (!open) return null;

  return (
    <Modal isOpen={open} onClose={onClose}>
      <h2 className="text-xl font-semibold text-taskSecondary mb-5 text-center">{title}</h2>

      <DepartmentForm initialData={initialData} onClose={onClose} />
    </Modal>
  );
}
