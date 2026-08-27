import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "time tasks",
  description: "Track your tasks with timers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}