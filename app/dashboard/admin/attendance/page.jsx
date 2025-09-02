import RoleGuard from "@/components/RoleGuard";
import DashboardLayout from "@/components/DashboardLayout";

export default function AttendancePage() {
  return (
    <RoleGuard role="admin">
      <h1 className="text-2xl font-bold">Attendance</h1>
      <p className="mt-2 text-gray-600">
        View and manage employee attendance logs here.
      </p>
    </RoleGuard>
  );
}
