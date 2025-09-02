import RoleGuard from "@/components/RoleGuard";
import DashboardLayout from "@/components/DashboardLayout";

export default function UserLeavesPage() {
  return (
    <RoleGuard role="user">
      <DashboardLayout>
        <h1 className="text-2xl font-bold">My Leaves</h1>
        <p className="mt-2 text-gray-600">
          Request and track your leave applications here.
        </p>
      </DashboardLayout>
    </RoleGuard>
  );
}
