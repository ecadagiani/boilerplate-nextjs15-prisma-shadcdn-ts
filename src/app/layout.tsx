import Navbar from "@/components/Navbar";
import NavbarWrapper from "@/components/NavbarWrapper";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import "./globals.css";

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog",
};

const RootLayout = async ({
  breadcrumb,
  children,
}: Readonly<{
  breadcrumb: React.ReactNode;
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <Suspense fallback={<Navbar session={null} />}>
            <NavbarWrapper />
          </Suspense>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-2">
            {breadcrumb}
            {children}
          </div>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
};
export default RootLayout;
