import type { Metadata } from "next";
import "./globals.css";

import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "Globe-Tech Automation - Engineering Excellence | Industrial Solutions",
  description: "Globe-Tech Automation - Your trusted partner in industrial automation. Specialists in Entrance Automation, Loading Bay Solutions, and High-End Security Systems.",
  icons: {
    icon: "/WhatsApp_Image_2026-01-30_at_11.21.42_PM-removebg-preview.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}

