import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "水印宝 - 专业的在线图片水印工具",
  description:
    "免费在线图片水印工具，支持文字水印、斜向平铺、居中等多种样式。本地处理，保护隐私，无需上传服务器。",
  keywords: ["水印", "图片水印", "在线水印", "水印工具", "watermark"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col antialiased">
        <Providers>{children}</Providers>
        <script
          defer
          src="https://tongji.chiloh.com/script.js"
          data-website-id="7f270746-7121-4368-b2f3-9c786ee2c10a"
        />
      </body>
    </html>
  );
}
