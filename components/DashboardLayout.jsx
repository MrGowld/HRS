"use client";

import { useAuth } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  const { user } = useAuth();
  const pathname = usePathname();

  // Define menus
  const menus = {
    admin: [
      { name: "Home", href: "/dashboard/admin" },
      { name: "Employees", href: "/dashboard/admin/employees" },
      { name: "Attendance", href: "/dashboard/admin/attendance" },
    ],
    user: [
      { name: "Dashboard", href: "/dashboard/user" },
      { name: "Timekeeping", href: "/dashboard/user/timekeeping" },
      { name: "Leaves", href: "/dashboard/user/leaves" },
    ],
  };

  const menu = user?.role === "admin" ? menus.admin : menus.user;

  return (
    <div className="flex h-screen">
      <Sidebar menu={menu} pathname={pathname} />

      {/* Content Area */}
      <div className="flex flex-1 flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
