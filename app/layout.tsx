import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";

// Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistSans = localFont({
  src: "../public/fonts/Geist.woff2",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "../public/fonts/GeistMono.woff2",
  variable: "--font-geist-mono",
});

// Metadata
export const metadata = {
  title: "Reddit Growth || Reddit Account Management",
  description: "Reddit Growth - Reddit Account Management",
};

// Root layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
