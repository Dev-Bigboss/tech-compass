import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import ClientLayout from "@/components/ClientLayout";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Tech Compass",
  description: "Connecting Nigerian students with top internship opportunities",
  keywords: ["internships", "Nigeria", "tech", "students", "jobs"],
  openGraph: {
    title: "Tech Compass",
    description:
      "Connecting Nigerian students with top internship opportunities",
    url: "https://your-domain.com", // Replace with your domain
    siteName: "Tech Compass",
    locale: "en_NG",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased bg-background text-foreground`}
      >
        <Navbar />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
