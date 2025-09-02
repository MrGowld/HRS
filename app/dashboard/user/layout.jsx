"use client";

import RoleGuard from "@/components/RoleGuard";
import DashboardLayout from "@/components/DashboardLayout";

export default function UserLayout({ children }) {
  return (
    <RoleGuard role="user">
      <DashboardLayout>{children}</DashboardLayout>
    </RoleGuard>
  );
}
