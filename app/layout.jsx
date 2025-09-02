import "./globals.css";

export const metadata = {
  title: "HR System",
  description: "Time and Leave Management Frontend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">{children}</body>
    </html>
  );
}
