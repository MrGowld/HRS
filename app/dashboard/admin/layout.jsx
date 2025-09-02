"use client";

import RoleGuard from "@/components/RoleGuard";
import DashboardLayout from "@/components/DashboardLayout";

export default function AdminLayout({ children }) {
  return (
    <RoleGuard role="admin">
      <DashboardLayout className="bg-gray-100 text-slate-700">
        {children}
      </DashboardLayout>
    </RoleGuard>
  );
}
