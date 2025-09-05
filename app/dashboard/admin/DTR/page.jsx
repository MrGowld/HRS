"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Upload, Loader2, CalendarIcon, Search } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";

// Mock employees
const employees = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Williams"];

// Mock DTR data
const allDTR = [
  {
    employee: "John Doe",
    date: "2025-09-01",
    in: "09:01 AM",
    out: "06:05 PM",
    hours: "8h 4m",
    status: "Present",
  },
  {
    employee: "Jane Smith",
    date: "2025-09-01",
    in: "09:15 AM",
    out: "05:50 PM",
    hours: "7h 35m",
    status: "Late",
  },
];

export default function AdminDTRPage() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [searchTerm, setSearchTerm] = useState("");

  // Filter employees based on search
  const filteredEmployees = employees.filter((emp) =>
    emp.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter DTR
  const filteredDTR = allDTR.filter((record) => {
    if (!selectedEmployee || record.employee !== selectedEmployee) return false;

    const recordDate = new Date(record.date);
    if (dateRange.from && recordDate < dateRange.from) return false;
    if (dateRange.to && recordDate > dateRange.to) return false;

    return true;
  });

  // Download simulation
  const handleDownload = () => {
    setDownloading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloading(false);
          exportToExcel();
          return 100;
        }
        return prev + 20;
      });
    }, 500);
  };

  // Export Excel
  const exportToExcel = () => {
    const headers = [
      "Employee",
      "Date",
      "Time In",
      "Time Out",
      "Hours",
      "Status",
    ];
    const rows = filteredDTR.map((record) => [
      record.employee,
      record.date,
      record.in,
      record.out,
      record.hours,
      record.status,
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DTR");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "DTR.xlsx");
  };

  // Upload handler
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      console.log("Uploaded Excel data:", sheet);

      alert("Excel file uploaded and stored in /public/DTR/ (mock).");
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Title + Actions */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Employees Daily Time Record</h1>
      </div>

      {/* Autocomplete Searchbar */}
      <div className="max-w-md">
        <Command>
          <CommandInput
            placeholder="Search employee..."
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          {searchTerm && (
            <CommandList>
              <CommandEmpty>No employees found.</CommandEmpty>
              <CommandGroup heading="Employees">
                {filteredEmployees.map((emp) => (
                  <CommandItem
                    key={emp}
                    onSelect={() => {
                      setSelectedEmployee(emp);
                      setSearchTerm(""); // clear search after selection
                    }}
                    className="cursor-pointer"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    {emp}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </div>

      {/* Date Range Picker */}
      <div className="flex items-center justify-between">
        {/* Date Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[260px] justify-start text-left font-normal h-10"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "MMM d, yyyy")} -{" "}
                    {format(dateRange.to, "MMM d, yyyy")}
                  </>
                ) : (
                  format(dateRange.from, "MMM d, yyyy")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <Button
            onClick={handleDownload}
            disabled={downloading}
            className="h-10"
          >
            {downloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Downloading...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" /> Download DTR
              </>
            )}
          </Button>

          <Button variant="secondary" asChild className="h-10">
            <label className="flex items-center cursor-pointer">
              <Upload className="mr-2 h-4 w-4" /> Upload Excel
              <input
                type="file"
                accept=".xlsx, .xls"
                hidden
                onChange={handleUpload}
              />
            </label>
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      {downloading && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-gray-500">
            Generating file... {progress}%
          </p>
        </div>
      )}

      {/* Employee DTR Table */}
      {selectedEmployee && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            {selectedEmployee} - Time Records
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time In</TableHead>
                <TableHead>Time Out</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDTR.length > 0 ? (
                filteredDTR.map((record, i) => (
                  <TableRow key={i}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.in}</TableCell>
                    <TableCell>{record.out}</TableCell>
                    <TableCell>{record.hours}</TableCell>
                    <TableCell>{record.status}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No records found in this timeframe.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
