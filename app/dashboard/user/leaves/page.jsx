import RoleGuard from "@/components/RoleGuard";
import DashboardLayout from "@/components/DashboardLayout";

export default function UserLeavesPage() {
  return <RoleGuard role="user"></RoleGuard>;
}
