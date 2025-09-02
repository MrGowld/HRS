"use client";
import RoleGuard from "@/components/RoleGuard";

export default function UserDashboard() {
  return (
    <RoleGuard role="user">
      <div>
        <h1 className="p-6 text-2xl font-bold">User Dashboard</h1>
        <p className="px-6">Welcome, User! 🙌</p>
      </div>
    </RoleGuard>
  );
}
