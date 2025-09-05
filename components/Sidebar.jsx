"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import {
  Users,
  CalendarCheck,
  ClipboardList,
  Home,
  UserCircle,
  Clock4,
  LogOut,
} from "lucide-react";

export default function Sidebar({ pathname }) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const { user, logout } = useAuth();

  const icons = {
    Dashboard: <Home size={18} />,
    Employees: <Users size={18} />,
    Attendance: <CalendarCheck size={18} />,
    Timekeeping: <ClipboardList size={18} />,
    Leaves: <CalendarCheck size={18} />,
    DTR: <Clock4 size={18} />,
  };

  // Menus for each role
  const adminMenu = [
    { name: "Dashboard", href: "/dashboard/admin" },
    { name: "Employees", href: "/dashboard/admin/employees" },
    { name: "Attendance", href: "/dashboard/admin/attendance" },
    { name: "Timekeeping", href: "/dashboard/admin/timekeeping" },
    { name: "Leaves", href: "/dashboard/admin/leaves" },
    { name: "DTR", href: "/dashboard/admin/DTR" },
  ];

  const userMenu = [
    { name: "Dashboard", href: "/dashboard/user/" },
    { name: "Attendance", href: "/dashboard/user/attendance" },
    { name: "Leaves", href: "/dashboard/user/leaves" },
    { name: "DTR", href: "/dashboard/user/DTR" },
  ];

  const menu = user?.role === "admin" ? adminMenu : userMenu;

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-white border-r flex flex-col transition-all duration-300`}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-4 cursor-pointer border-b hover:bg-gray-100"
      >
        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
        {isOpen && <span className="font-bold text-gray-800">My Company</span>}
      </div>

      <nav className="flex-1 px-2 space-y-1 mt-2">
        {menu.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {icons[item.name] || <Home size={18} />}
              {isOpen && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {user && (
        <div className="p-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCircle size={22} className="text-gray-600" />
            {isOpen && (
              <span className="text-sm font-medium text-gray-700 capitalize">
                {user.role}
              </span>
            )}
          </div>

          {isOpen && (
            <button
              onClick={() => router.push("/login")}
              className="text-gray-500 hover:text-red-600"
            >
              <LogOut size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
