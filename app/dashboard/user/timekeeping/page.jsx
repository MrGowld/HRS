import RoleGuard from "@/components/RoleGuard";
import DashboardLayout from "@/components/DashboardLayout";

export default function TimekeepingPage() {
  return (
    <RoleGuard role="user">
      <DashboardLayout>
        <h1 className="text-2xl font-bold">Timekeeping</h1>
        <p className="mt-2 text-gray-600">
          Clock in/out and view your work hours here.
        </p>
      </DashboardLayout>
    </RoleGuard>
  );
}
