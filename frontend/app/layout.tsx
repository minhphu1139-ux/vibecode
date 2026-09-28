import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-Learning LMS - Flow 01: Xác thực & Onboarding",
  description: "Giao diện chuẩn hóa quy trình Đăng nhập, SSO, Xác thực OTP và Khảo sát lộ trình học tập cá nhân hóa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased min-h-screen relative selection:bg-brand-orange selection:text-white">
        <div className="bg-ambient-glow">
          <div className="glow-circle-1" />
          <div className="glow-circle-2" />
        </div>
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
