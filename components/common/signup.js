"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useAdminRegister } from "../../hooks/auth/useRegister";
import { registerSchema } from "../../validation/auth/registerSchema";

export default function SignupPage() {
  const router = useRouter();

  const { isPending: resRegisterPending, mutate: resRegisterMutate } = useAdminRegister();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => handleRegister(values),
  });

  const { values, handleSubmit, handleChange, handleBlur, touched, errors, resetForm } = formik;

  const handleRegister = useCallback(
    (payload) => {
      resRegisterMutate(payload, {
        onSuccess: (data) => {
          if (data.success) {
            toast.success(data.message || "User created");
            resetForm();
            router.push("/login");
          }
        },
        onError: (error) => {
          toast.error(error.message || "Registration failed");
        },
      });
    },
    [resRegisterMutate, router, resetForm],
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f7efe2] via-[#f5f0e8] to-[#e8dfcf] flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-6xl grid md:grid-cols-2 rounded-4xl overflow-hidden border border-taskTertiary/30">
        <div className="hidden md:flex flex-col justify-between bg-taskSecondary text-taskPrimary p-10">
          <div className="space-y-6">
            <div className="border border-taskPrimary/20 px-4 py-1 rounded-full w-fit text-sm">
              Employee Management System
            </div>

            <h1 className="text-4xl font-bold leading-tight">Build Your Workforce System</h1>

            <p className="text-taskPrimary/70 text-sm leading-6 max-w-sm">
              Create your account to start managing employees, assigning roles, and organizing
              operations in one place.
            </p>
          </div>

          <div className="space-y-4 text-sm text-taskPrimary/70">
            <div className="border border-taskPrimary/20 rounded-xl p-4">
              Secure account creation process
            </div>
            <div className="border border-taskPrimary/20 rounded-xl p-4">
              Easy onboarding experience
            </div>
            <div className="border border-taskPrimary/20 rounded-xl p-4">
              Scalable system structure
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-taskPrimary px-6 py-10 sm:px-10">
          <form method="post" onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
              <p className="text-xs uppercase tracking-widest text-taskTertiary">Sign Up</p>
              <h2 className="text-3xl font-bold text-taskSecondary">Create Account</h2>
              <p className="text-sm text-taskTertiary">Start your employee management journey</p>
            </div>

            <div className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm text-taskSecondary">Full Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className={`w-full px-4 py-3 rounded-xl border bg-taskPrimary text-taskSecondary outline-none transition
                ${touched.name && errors.name ? "border-red-500" : "border-taskTertiary/40"}
                focus:border-taskSecondary`}
                />
                <p className="text-xs text-red-500">{touched.name && errors.name}</p>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-taskSecondary">Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={`w-full px-4 py-3 rounded-xl border bg-taskPrimary text-taskSecondary outline-none transition
                ${touched.email && errors.email ? "border-red-500" : "border-taskTertiary/40"}
                focus:border-taskSecondary`}
                />
                <p className="text-xs text-red-500">{touched.email && errors.email}</p>
              </div>

              <div className="space-y-1">
                <label className="text-sm text-taskSecondary">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Minimum 6 characters"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={`w-full px-4 py-3 rounded-xl border bg-taskPrimary text-taskSecondary outline-none transition
                ${touched.password && errors.password ? "border-red-500" : "border-taskTertiary/40"}
                focus:border-taskSecondary`}
                />
                <p className="text-xs text-red-500">{touched.password && errors.password}</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={resRegisterPending}
              className="w-full py-3 rounded-xl bg-taskSecondary text-taskPrimary font-semibold transition hover:opacity-90 disabled:opacity-60"
            >
              {resRegisterPending ? "Creating account..." : "Register"}
            </button>

            <p className="text-center text-sm text-taskTertiary">
              Already have an account?{" "}
              <Link href="/login" className="text-taskSecondary font-semibold underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
