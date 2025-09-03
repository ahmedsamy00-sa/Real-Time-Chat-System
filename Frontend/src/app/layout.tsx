import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "نظام الدردشة في الوقت الفعلي",
  description: "تطبيق دردشة حديث مبني بـ Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${inter.className} antialiased bg-primary-50`}>
        {children}
      </body>
    </html>
  );
}
