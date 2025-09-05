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
import {
  Download,
  Loader2,
  Upload,
  Calendar as CalendarIcon,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { format } from "date-fns";

export default function DTRPage() {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null,
  });

  // Mock DTR data
  const dtrRecords = [
    {
      date: "2025-09-01",
      in: "09:01 AM",
      out: "06:05 PM",
      hours: "8h 4m",
      status: "Present",
    },
    {
      date: "2025-09-02",
      in: "09:15 AM",
      out: "05:50 PM",
      hours: "7h 35m",
      status: "Late",
    },
    {
      date: "2025-09-03",
      in: "09:05 AM",
      out: "06:10 PM",
      hours: "8h 5m",
      status: "Present",
    },
  ];

  // Filter records by selected date range
  const filteredRecords = dtrRecords.filter((record) => {
    if (!dateRange.from || !dateRange.to) return true;
    const recordDate = new Date(record.date);
    return recordDate >= dateRange.from && recordDate <= dateRange.to;
  });

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

  const exportToExcel = () => {
    const headers = ["Date", "Time In", "Time Out", "Hours", "Status"];
    const rows = filteredRecords.map((record) => [
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

  // Upload Excel (frontend only simulation)
  //This only simulates upload in the frontend. In a real app, you’d send this file to your Express backend, which would save it into /public/DTR.
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // Parse Excel
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      console.log("Uploaded Excel Data:", rows);

      //send `file` to backend here to save into /public/DTR
      setUploading(false);
      alert(
        "Excel file uploaded successfully (simulated). Check console for parsed data."
      );
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Daily Time Record</h1>

        <div className="flex gap-2">
          <input
            type="file"
            accept=".xlsx,.xls"
            id="upload-dtr"
            className="hidden"
            onChange={handleUpload}
          />
          <label htmlFor="upload-dtr">
            <Button asChild disabled={uploading}>
              <span>
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" /> Upload Excel
                  </>
                )}
              </span>
            </Button>
          </label>

          <Button onClick={handleDownload} disabled={downloading}>
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
        </div>
      </div>

      {/* Progress Bar */}
      {(downloading || uploading) && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-gray-500">
            {downloading ? `Generating file... ${progress}%` : "Uploading..."}
          </p>
        </div>
      )}

      {/* Date Range Picker */}
      <Card>
        <CardHeader>
          <CardTitle>Select Timeframe</CardTitle>
        </CardHeader>
        <CardContent>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[280px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      {/* Table */}
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
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record, i) => (
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
              <TableCell colSpan={5} className="text-center text-gray-500">
                No records found in selected timeframe.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
