"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button"; // ShadCN Button
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar
      <header className="flex justify-between items-center p-6 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-600">HR System</h1>
        <div className="space-x-4">
          <Link href="/auth/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/auth/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="flex flex-1 items-center justify-between px-20 py-40 bg-gray-50">
        <div className="max-w-xl space-y-6">
          <h2 className="text-4xl font-extrabold leading-tight">
            Smarter <span className="text-blue-800">HR Management</span> for
            Your Business
          </h2>
          <p className="text-gray-600 text-lg">
            Manage attendance, timekeeping, and leave credits in one simple,
            modern system.
          </p>
          <div className="space-x-4">
            <Link href="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Dashboard Preview Image */}
        {/* <div className="hidden md:block relative w-[500px] h-[350px] rounded-xl shadow-lg overflow-hidden">
          <Image
            src="/dashboard-preview.png" // Add an image in /public
            alt="Dashboard Preview"
            fill
            className="object-cover"
          />
        </div> */}
      </section>

      {/* Features Section */}
      <section className="py-20 px-12 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12">
          Why choose our HR System?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
            <h4 className="font-semibold text-lg mb-2">⏱ Timekeeping</h4>
            <p className="text-gray-600">
              Simple clock-in/clock-out system with attendance tracking.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
            <h4 className="font-semibold text-lg mb-2">📅 Leave Management</h4>
            <p className="text-gray-600">
              Request, approve, and manage leaves with ease.
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow-sm">
            <h4 className="font-semibold text-lg mb-2">👥 Employee Records</h4>
            <p className="text-gray-600">
              Keep all employee data in one organized place.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-4 bg-gray-100 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HR System. All rights reserved.
      </footer>
    </div>
  );
}
