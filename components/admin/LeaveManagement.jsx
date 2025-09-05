"use client";
import RoleGuard from "@/components/RoleGuard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LeaveManagement() {
  const leaveRequests = [
    { id: 1, name: "Jane Smith", type: "Vacation", dates: "Aug 25 - Aug 28" },
    { id: 2, name: "Mark Lee", type: "Sick Leave", dates: "Aug 22" },
  ];

  return (
    <RoleGuard role="admin">
      <div className="mt-8">
        <h1 className="text-xl font-semibold mb-4">Leave Management</h1>
        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {leaveRequests.length > 0 ? (
              leaveRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{req.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {req.type} — {req.dates}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="success">
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive">
                      Decline
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No pending leave requests 🎉
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </RoleGuard>
  );
}
