"use client";
import RoleGuard from "@/components/RoleGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";

export default function EmployeeDirectory() {
  const employees = [
    { id: 1, name: "John Doe", role: "Developer", status: "Active" },
    { id: 2, name: "Sarah Connor", role: "HR Officer", status: "Active" },
    { id: 3, name: "Mike Ross", role: "Intern", status: "Active" },
  ];

  return (
    <RoleGuard role="admin">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Employee Directory</h2>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Employee</DialogTitle>
              </DialogHeader>
              {/* Form Fields for Employee */}
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Employee Name"
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Role"
                  className="w-full border rounded px-3 py-2"
                />
                <select className="w-full border rounded px-3 py-2">
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <Button type="submit" className="w-full">
                  Save
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="divide-y">
              {employees.map((emp) => (
                <li key={emp.id} className="py-2 flex justify-between">
                  <div>
                    <p className="font-medium">{emp.name}</p>
                    <p className="text-sm text-muted-foreground">{emp.role}</p>
                  </div>
                  <span className="text-xs text-green-600">{emp.status}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                View Full Directory
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
}
