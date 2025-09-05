"use client";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  // Default values
  let title = "Welcome";
  let subtitle = "Have a great day at work";

  // Role-based navbar content
  if (user?.role === "admin") {
    title = "Welcome Admin";
    subtitle = "Monitor all the employees here";
  } else if (user?.role === "user") {
    title = "Welcome Back";
    subtitle = "Check your timekeeping and leaves here";
  }

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between bg-gray-50 px-8 py-5">
      {/* Branding */}
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}
