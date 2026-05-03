import * as Yup from "yup";

export const createDepartmentValidation = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Department name must be at least 2 characters")
    .required("Department name is required"),
});

export const updateDepartmentValidation = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Department name must be at least 2 characters")
    .required("Department name is required"),
});
