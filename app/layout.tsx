import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "鸡汤卡片生成器",
  description: "创建优雅的鸡汤卡片，分享你的智慧",
  icons: {
    icon: [{ url: "/images/chicken-logo.png", type: "image/png" }],
    apple: [{ url: "/images/chicken-logo.png" }],
  },
    generator: 'v0.app'
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
