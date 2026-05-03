"use client";

import Modal from "./modal";

export default function DeleteModal({
  open,
  onClose,
  onConfirm,
  isLoading = false,
  title = "Delete",
  description = "Are you sure you want to delete this item?",
}) {
  if (!open) return null;

  return (
    <Modal isOpen={open} onClose={onClose} isLoading={isLoading}>
      <div className="space-y-6 text-center">
        <h2 className="text-lg font-semibold text-taskSecondary">{title}</h2>

        <p className="text-sm text-taskTertiary">{description}</p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-5 py-2.5 cursor-pointer rounded-xl border border-taskTertiary text-taskTertiary text-sm"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-5 py-2.5 cursor-pointer rounded-xl bg-taskSecondary text-taskPrimary text-sm font-medium transition hover:opacity-90 disabled:opacity-60"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
