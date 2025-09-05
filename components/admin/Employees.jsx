"use client";
import RoleGuard from "@/components/RoleGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EmployeeDirectory() {
  const employees = [
    { id: 1, name: "John Doe", role: "Developer", status: "Active" },
    { id: 2, name: "Sarah Connor", role: "HR Officer", status: "Active" },
    { id: 3, name: "Mike Ross", role: "Intern", status: "Active" },
  ];

  return (
    <RoleGuard role="admin">
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Employee Directory</h2>
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
