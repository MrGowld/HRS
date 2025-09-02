"use client";

import RoleGuard from "@/components/RoleGuard";
import QuickStats from "@/components/admin/Quickstats";
import TimekeepingOverview from "@/components/admin/Timekeeping";
import LeaveManagement from "@/components/admin/LeaveManagement";
import EmployeeDirectory from "@/components/admin/Employees";

export default function AdminDashboard() {
  return (
    <RoleGuard role="admin">
      <div className="bg-gray-50 p-6">
        <QuickStats />
        <TimekeepingOverview />
        <EmployeeDirectory />
        <LeaveManagement />
      </div>
    </RoleGuard>
  );
}
