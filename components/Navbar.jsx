"use client";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between bg-gray-50 px-8 py-5 ">
      {/* Branding */}
      <div className="flex flex-col">
        <h1 className="text-xl font-bold">Welcome Admin</h1>
        <p className="text-sm text-slate-500">Monitor all the employees here</p>
      </div>
    </div>
  );
}
