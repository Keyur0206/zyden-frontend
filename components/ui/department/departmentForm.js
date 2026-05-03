"use client";

import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useCreateDepartment } from "../../../hooks/department/useCreateDepartment";
import { useUpdateDepartment } from "../../../hooks/department/useUpdateDepartment";
import {
  createDepartmentValidation,
  updateDepartmentValidation,
} from "../../../validation/department/department";

export default function DepartmentForm({ initialData = { name: "" }, onClose }) {
  const isEdit = !!initialData?.id;

  const { mutate: createDept, isPending: isCreating } = useCreateDepartment();
  const { mutate: updateDept, isPending: isUpdating } = useUpdateDepartment();

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: initialData?.name || "",
    },

    validationSchema: isEdit ? updateDepartmentValidation : createDepartmentValidation,

    onSubmit: (values, { resetForm }) => {
      const payload = {
        name: values.name.trim(),
      };

      const handleSuccess = (data) => {
        if (data?.success) {
          toast.success(data.message || (isEdit ? "Updated successfully" : "Created successfully"));

          resetForm();
          setTimeout(() => {
            onClose();
          }, 100);
        } else {
          toast.error(data.message || "Operation failed");
        }
      };

      const handleError = (error) => {
        let message = "Something went wrong";

        if (error?.message?.includes("E11000")) {
          message = "Department name already exists";
        } else if (Array.isArray(error?.data)) {
          message = error.data[0];
        } else {
          message = error?.message || message;
        }

        toast.error(message);
      };

      if (isEdit) {
        updateDept(
          { id: initialData.id, payload },
          {
            onSuccess: handleSuccess,
            onError: handleError,
          },
        );
      } else {
        createDept(payload, {
          onSuccess: handleSuccess,
          onError: handleError,
        });
      }
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } = formik;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm text-taskSecondary mb-1">Department Name</label>

        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter department name"
          className={`w-full px-4 py-3 rounded-xl border bg-taskPrimary text-taskSecondary outline-none transition
            ${
              touched.name && errors.name
                ? "border-red-500"
                : "border-taskTertiary/40 focus:border-taskSecondary"
            }`}
        />

        {touched.name && errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <button
        type="submit"
        disabled={isCreating || isUpdating}
        className="w-full py-3 cursor-pointer rounded-xl bg-taskSecondary text-taskPrimary font-semibold transition hover:opacity-90 disabled:opacity-60"
      >
        {isCreating || isUpdating
          ? "Saving..."
          : isEdit
            ? "Update Department"
            : "Create Department"}
      </button>
    </form>
  );
}
