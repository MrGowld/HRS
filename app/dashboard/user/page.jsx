"use client";
import RoleGuard from "@/components/RoleGuard";

export default function UserDashboard() {
  return <RoleGuard role="user"></RoleGuard>;
}
