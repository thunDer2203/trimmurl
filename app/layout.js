import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "trimmUrl - Your friendly URL shortener",
  description: "This website is here to help you shorten those troublesome lengthy URLs. Created by-Shubham Hamirwasia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-cyan-100`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
