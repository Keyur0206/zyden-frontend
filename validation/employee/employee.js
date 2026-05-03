import * as Yup from "yup";

export const createEmployeeValidation = Yup.object({
  name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),

  email: Yup.string().email("Invalid email").required("Email is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
    .required("Phone is required"),

  department: Yup.string().length(24, "Invalid department").required("Department is required"),

  designation: Yup.string().required("Designation is required"),

  salary: Yup.number()
    .typeError("Salary must be a number")
    .moreThan(0, "Salary must be greater than 0")
    .required("Salary is required"),

  joiningDate: Yup.date()
    .max(new Date(), "Joining date cannot be in future")
    .required("Joining date is required"),
});

export const updateEmployeeValidation = createEmployeeValidation.shape({
  isDeleted: Yup.boolean().optional(),
});
