import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
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

export default async function RootLayout({
  breadcrumb,
  children,
}: Readonly<{
  breadcrumb: React.ReactNode;
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <Navbar session={session} />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-2">
            {breadcrumb}
            {children}
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
