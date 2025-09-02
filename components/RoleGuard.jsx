"use client";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function RoleGuard({ role, children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    } else if (user.role !== role) {
      router.replace(`/dashboard/${user.role}`);
    }
  }, [user, router, role]);

  if (!user || user.role !== role) return null;

  return <>{children}</>;
}
