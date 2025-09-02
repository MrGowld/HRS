"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default function TimekeepingOverview() {
  const [search, setSearch] = useState("");

  const data = [
    {
      name: "John Doe",
      clockIn: "8:59 AM",
      clockOut: "5:01 PM",
      status: "On Time",
    },
    { name: "Jane Smith", clockIn: "9:15 AM", clockOut: "—", status: "Late" },
    { name: "Michael Lee", clockIn: "—", clockOut: "—", status: "Absent" },
    {
      name: "Emily Brown",
      clockIn: "8:45 AM",
      clockOut: "4:50 PM",
      status: "On Time",
    },
  ];

  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderStatus = (status) => {
    if (status === "On Time")
      return (
        <span className="flex items-center text-green-600">
          <CheckCircle className="h-4 w-4 mr-1" /> {status}
        </span>
      );
    if (status === "Late")
      return (
        <span className="flex items-center text-yellow-600">
          <AlertTriangle className="h-4 w-4 mr-1" /> {status}
        </span>
      );
    if (status === "Absent")
      return (
        <span className="flex items-center text-red-600">
          <XCircle className="h-4 w-4 mr-1" /> {status}
        </span>
      );
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Timekeeping Overview</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <Input
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3"
        />
      </div>

      <div className="bg-card rounded-2xl shadow-sm p-4 max-h-64 overflow-y-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground">
              <th className="pb-2">Employee</th>
              <th className="pb-2">Clock In</th>
              <th className="pb-2">Clock Out</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td className="py-2 font-medium">{row.name}</td>
                <td className="py-2">{row.clockIn}</td>
                <td className="py-2">{row.clockOut}</td>
                <td className="py-2">{renderStatus(row.status)}</td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="py-4 text-center text-muted-foreground"
                >
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
