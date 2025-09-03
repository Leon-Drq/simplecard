import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "鸡汤卡片生成器 - 创建优雅的励志卡片",
  description:
    "免费在线鸡汤卡片生成器，轻松创建精美的励志语录卡片。支持多种字体和样式，一键生成高质量图片，完美适配社交媒体分享。",
  keywords: "鸡汤卡片,励志语录,卡片生成器,语录制作,心灵鸡汤,正能量,免费工具",
  authors: [{ name: "鸡汤卡片生成器" }],
  creator: "鸡汤卡片生成器",
  publisher: "鸡汤卡片生成器",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://simplecard.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "鸡汤卡片生成器 - 创建优雅的励志卡片",
    description: "免费在线鸡汤卡片生成器，轻松创建精美的励志语录卡片。支持多种字体和样式，一键生成高质量图片。",
    url: "https://simplecard.vercel.app",
    siteName: "鸡汤卡片生成器",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "鸡汤卡片生成器 - 创建优雅的励志卡片",
      },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "鸡汤卡片生成器 - 创建优雅的励志卡片",
    description: "免费在线鸡汤卡片生成器，轻松创建精美的励志语录卡片。",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/chicken-logo.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/images/chicken-logo.png" }],
  },
  manifest: "/site.webmanifest",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 使用更明确的字体预加载方式，确保移动端能正确加载 */}
        <link rel="preload" href="/fonts/huiwen-mincho.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* 添加字体样式检测脚本，帮助调试 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            // 检测字体是否加载成功
            document.fonts.ready.then(function() {
              console.log("所有字体已加载");
              if (document.fonts.check("1em 'Huiwen-mincho'")) {
                console.log("徽文明朝字体已加载成功");
                document.documentElement.classList.add('huiwen-loaded');
              } else {
                console.log("徽文明朝字体加载失败");
                document.documentElement.classList.add('huiwen-failed');
              }
            });
          `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
