"use client";

import { useFormik } from "formik";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { useAdminLogin } from "../../hooks/auth/useLogin";
import { loginSchema } from "../../validation/auth/loginSchema";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    const role = localStorage.getItem("role");

    if (!token || !role) return;

    if (role === "admin") {
      router.replace("/admin");
      return;
    }

    router.replace("/");
  }, [router]);

  const { isPending: resLoginPending, mutate: resLoginMutate } = useAdminLogin();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => handleLogin(values),
  });

  const { values, handleSubmit, handleChange, handleBlur, touched, errors, resetForm } = formik;

  const handleLogin = useCallback(
    (payload) => {
      resLoginMutate(payload, {
        onSuccess: (data) => {
          console.log("FULL LOGIN RESPONSE:", data);

          if (data.success) {
            const token = data?.data?.token;
            const role = data?.data?.user?.role;

            if (token) {
              Cookies.set("token", token, {
                expires: 1,
                path: "/",
              });
            }

            if (role) {
              localStorage.setItem("role", role);
            }

            toast.success(data.message || "Login successful");
            resetForm();

            router.push("/admin/employee");
          }
        },
        onError: (error) => {
          toast.error(error.message || "Login failed");
        },
      });
    },
    [resLoginMutate, resetForm, router],
  );

  return (
    <div className="min-h-screen  bg-linear-to-br from-[#f7efe2] via-[#f5f0e8] to-[#e8dfcf] flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-6xl grid md:grid-cols-2 rounded-4xl overflow-hidden border border-taskTertiary/30">
        <div className="hidden md:flex flex-col justify-between bg-taskSecondary text-taskPrimary p-10">
          <div className="space-y-6">
            <div className="border border-taskPrimary/20 px-4 py-1 rounded-full w-fit text-sm">
              Employee Management System
            </div>

            <h1 className="text-4xl font-bold leading-tight">Smart Workforce Control</h1>

            <p className="text-taskPrimary/70 text-sm leading-6 max-w-sm">
              A centralized system to manage employees, monitor activities, and simplify internal
              operations with clarity and control.
            </p>
          </div>

          <div className="space-y-4 text-sm text-taskPrimary/70">
            <div className="border border-taskPrimary/20 rounded-xl p-4">
              Maintain structured employee records
            </div>
            <div className="border border-taskPrimary/20 rounded-xl p-4">
              Control roles and permissions
            </div>
            <div className="border border-taskPrimary/20 rounded-xl p-4">
              Improve operational efficiency
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-taskPrimary px-6 py-10 sm:px-10">
          <form method="post" onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
            <div className="text-center space-y-2">
              <p className="text-xs uppercase tracking-widest text-taskTertiary">Sign In</p>
              <h2 className="text-3xl font-bold text-taskSecondary">Access Account</h2>
              <p className="text-sm text-taskTertiary">Continue to your dashboard</p>
            </div>

            <div className="space-y-5">
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
                  placeholder="Enter your password"
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
              disabled={resLoginPending}
              className="w-full py-3 rounded-xl bg-taskSecondary text-taskPrimary font-semibold transition hover:opacity-90 disabled:opacity-60"
            >
              {resLoginPending ? "Signing in..." : "Login"}
            </button>

            <p className="text-center text-sm text-taskTertiary">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-taskSecondary font-semibold underline">
                Create account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
