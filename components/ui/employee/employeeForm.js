"use client";

import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useGetDepartments } from "../../../hooks/department/useGetDepartments";
import { useCreateEmployee } from "../../../hooks/employee/useCreateEmployee";
import { useUpdateEmployee } from "../../../hooks/employee/useUpdateEmployee";
import {
  createEmployeeValidation,
  updateEmployeeValidation,
} from "../../../validation/employee/employee";

export default function EmployeeForm({ initialData = {}, onClose }) {
  const isEdit = !!initialData?.id;

  const { mutate: createEmp, isPending: isCreating } = useCreateEmployee();
  const { mutate: updateEmp, isPending: isUpdating } = useUpdateEmployee();
  const { data: deptData } = useGetDepartments();

  const departments = deptData?.data ?? [];

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      department: initialData?.department || "",
      designation: initialData?.designation || "",
      salary: initialData?.salary || "",
      joiningDate: initialData?.joiningDate || "",
      isDeleted: initialData?.isDeleted ?? false,
    },

    validationSchema: isEdit ? updateEmployeeValidation : createEmployeeValidation,

    onSubmit: (values, { resetForm }) => {
      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone,
        department: values.department,
        designation: values.designation,
        salary: Number(values.salary),
        joiningDate: values.joiningDate,
        ...(isEdit && { isDeleted: values.isDeleted }),
      };

      const handleSuccess = (data) => {
        if (data?.success) {
          toast.success(isEdit ? "Updated successfully" : "Created successfully");
          resetForm();
          setTimeout(() => onClose(), 100);
        } else {
          toast.error(data?.message || "Operation failed");
        }
      };

      const handleError = (err) => {
        toast.error(err?.message || "Something went wrong");
      };

      if (isEdit) {
        updateEmp(
          { id: initialData.id, payload },
          { onSuccess: handleSuccess, onError: handleError },
        );
      } else {
        createEmp(payload, {
          onSuccess: handleSuccess,
          onError: handleError,
        });
      }
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue } = formik;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-taskSecondary mb-1.5">Name</label>
        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter name"
          className={`w-full px-4 py-3 rounded-xl border bg-taskPrimary text-taskSecondary outline-none transition-all duration-200
      ${
        touched.name && errors.name
          ? "border-red-500"
          : "border-taskTertiary/50 focus:border-taskSecondary focus:ring-2 focus:ring-taskSecondary/10"
      }`}
        />
        {touched.name && errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-taskSecondary mb-1.5">Email</label>
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter email"
          className={`w-full px-4 py-3 rounded-xl border bg-taskPrimary text-taskSecondary outline-none transition-all duration-200
      ${
        touched.email && errors.email
          ? "border-red-500"
          : "border-taskTertiary/50 focus:border-taskSecondary focus:ring-2 focus:ring-taskSecondary/10"
      }`}
        />
        {touched.email && errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-taskSecondary mb-1.5">Phone</label>
        <input
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter phone"
          className={`w-full px-4 py-3 rounded-xl border bg-taskPrimary text-taskSecondary outline-none transition-all duration-200
      ${
        touched.phone && errors.phone
          ? "border-red-500"
          : "border-taskTertiary/50 focus:border-taskSecondary focus:ring-2 focus:ring-taskSecondary/10"
      }`}
        />
        {touched.phone && errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-taskSecondary mb-1.5">Department</label>
        <select
          value={values.department}
          onChange={(e) => setFieldValue("department", e.target.value)}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 rounded-xl border bg-taskPrimary text-taskSecondary outline-none transition-all duration-200 appearance-none
      ${
        touched.department && errors.department
          ? "border-red-500"
          : "border-taskTertiary/50 focus:border-taskSecondary focus:ring-2 focus:ring-taskSecondary/10"
      }`}
        >
          <option value="">Select department</option>
          {departments.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>
        {touched.department && errors.department && (
          <p className="mt-1 text-sm text-red-500">{errors.department}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-taskSecondary mb-1.5">Designation</label>
        <input
          name="designation"
          value={values.designation}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter designation"
          className={`w-full px-4 py-3 rounded-xl border bg-taskPrimary text-taskSecondary outline-none transition-all duration-200
      ${
        touched.designation && errors.designation
          ? "border-red-500"
          : "border-taskTertiary/50 focus:border-taskSecondary focus:ring-2 focus:ring-taskSecondary/10"
      }`}
        />
        {touched.designation && errors.designation && (
          <p className="mt-1 text-sm text-red-500">{errors.designation}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-taskSecondary mb-1.5">Salary</label>
        <input
          name="salary"
          value={values.salary}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter salary"
          className={`w-full px-4 py-3 rounded-xl border bg-taskPrimary text-taskSecondary outline-none transition-all duration-200
      ${
        touched.salary && errors.salary
          ? "border-red-500"
          : "border-taskTertiary/50 focus:border-taskSecondary focus:ring-2 focus:ring-taskSecondary/10"
      }`}
        />
        {touched.salary && errors.salary && (
          <p className="mt-1 text-sm text-red-500">{errors.salary}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-taskSecondary mb-1.5">Joining Date</label>
        <input
          type="date"
          name="joiningDate"
          value={values.joiningDate}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3 rounded-xl border bg-taskPrimary text-taskSecondary outline-none transition-all duration-200
      ${
        touched.joiningDate && errors.joiningDate
          ? "border-red-500"
          : "border-taskTertiary/50 focus:border-taskSecondary focus:ring-2 focus:ring-taskSecondary/10"
      }`}
        />
        {touched.joiningDate && errors.joiningDate && (
          <p className="mt-1 text-sm text-red-500">{errors.joiningDate}</p>
        )}
      </div>

      {isEdit && !values.isDeleted && (
        <button
          type="button"
          onClick={() => setFieldValue("isDeleted", true)}
          className="w-full py-3 cursor-pointer rounded-xl border border-taskSecondary text-taskSecondary hover:bg-taskSecondary hover:text-taskPrimary transition"
        >
          Mark as Inactive
        </button>
      )}

      {isEdit && values.isDeleted && (
        <p className="text-sm text-taskTertiary text-center">This employee is inactive</p>
      )}

      <button
        type="submit"
        disabled={isCreating || isUpdating}
        className="w-full py-3 cursor-pointer rounded-xl bg-taskSecondary text-taskPrimary font-semibold transition hover:opacity-90 disabled:opacity-60 shadow-sm"
      >
        {isCreating || isUpdating ? "Saving..." : isEdit ? "Update Employee" : "Create Employee"}
      </button>
    </form>
  );
}
