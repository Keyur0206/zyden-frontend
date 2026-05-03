"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({ children, isOpen, onClose, isLoading }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-taskSecondary/40 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-taskTertiary/30 bg-taskPrimary shadow-xl
            max-h-[90vh] overflow-hidden"
          >
            <button
              onClick={onClose}
              disabled={isLoading}
              className="absolute right-4  cursor-pointer bg-primary top-4 z-10 rounded-lg border border-taskTertiary/40 p-1 text-white transition  disabled:opacity-50"
            >
              <X size={18} />
            </button>

            <div className="p-6 pt-8 overflow-y-auto max-h-[90vh]">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
