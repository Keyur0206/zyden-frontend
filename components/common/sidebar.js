"use client";

import Cookies from "js-cookie";
import { Building2, LayoutDashboard, Menu, Users, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token", { path: "/" });

    router.push("/login");
  };

  const links = [
    { name: "Department", href: "/admin/department", icon: Building2 },
    { name: "Employee", href: "/admin/employee", icon: Users },
    { name: "Inactive", href: "/admin/inactive", icon: LayoutDashboard },
  ];

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setOpen(true)}
          className={`${open ? "hidden" : ""} border border-taskTertiary/40 px-3 py-2 rounded-lg text-taskSecondary bg-taskPrimary`}
        >
          <Menu size={20} />
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 z-40 h-full w-72 bg-taskSecondary/95 text-taskPrimary transform transition-all duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
      >
        <div className="flex h-full flex-col justify-between p-6">
          <div className="space-y-10">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Admin Panel</h1>

              <button
                onClick={() => setOpen(false)}
                className="md:hidden border border-taskPrimary/20 p-2 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="space-y-2">
              {links.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition
                      ${
                        isActive
                          ? "bg-taskPrimary text-taskSecondary font-semibold"
                          : "hover:bg-taskPrimary/10"
                      }`}
                  >
                    <link.icon size={18} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <button
              onClick={handleLogout}
              className="w-full flex cursor-pointer items-center justify-center gap-2 px-4 py-3 rounded-xl border border-taskPrimary/20 text-sm transition hover:bg-taskPrimary/10"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-taskSecondary/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
