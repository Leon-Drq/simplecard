"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import QuoteCard from "@/components/quote-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import {
  Download,
  RefreshCw,
  ChevronUp,
  Type,
  X,
  ImageIcon,
  Eye,
  ArrowLeft,
  Share2,
  Camera,
  Palette,
  Text,
  Edit,
} from "lucide-react"
import html2canvas from "html2canvas"
import { useMediaQuery } from "@/hooks/use-media-query"
import { FontDebug } from "@/components/font-debug"
import Link from "next/link"
import Head from "next/head"

// Card aspect ratio options
type AspectRatio = "3:4" | "9:16"

export default function Home() {
  // 检测是否为移动设备
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Update the defaultState to include backgroundStyle
  const defaultState = {
    chineseText: "运气是存在接触面的\n你一生中拥有多少运气\n\n就等于\n你创造了多少价值\n乘以你告诉了多少人",
    englishText:
      "Fortune exists at the point of contact\nThe amount of luck in your life\nIs equal to the value you've created\nMultiplied by how many people you've told about it",
    signature: "ForYouByCookie",
    chinesePosition: 43,
    englishPosition: 10,
    signaturePosition: 90,
    chineseFontSize: 21,
    englishFontSize: 14,
    signatureFontSize: 14,
    aspectRatio: "3:4" as AspectRatio,
    backgroundStyle: "light-green-paper",
    customBackgroundImage: null as string | null,
    chineseFont: "huiwen", // 修改默认字体为徽文明朝
    englishFont: "segoe-script", // 默认英文字体
  }

  // 中文字体选项
  const chineseFonts = [
    { id: "huiwen", name: "徽文明朝", family: "'Huiwen-mincho', serif" },
    { id: "kaiti", name: "楷体", family: "'Kaiti', '楷体', 'STKaiti', serif" },
    { id: "fangsong", name: "仿宋", family: "'FangSong', '仿宋', 'STFangsong', serif" },
    { id: "lishu", name: "隶书", family: "'LiSu', '隶书', 'STLiti', serif" },
  ]

  // Add English font options
  const englishFonts = [
    { id: "segoe-script", name: "Segoe Script", family: "'Segoe Script', 'Bradley Hand', cursive" },
    { id: "comic-sans", name: "Comic Sans", family: "'Comic Sans MS', 'Comic Sans', cursive" },
    { id: "brush-script", name: "Brush Script", family: "'Brush Script MT', 'Brush Script Std', cursive" },
    { id: "cursive", name: "Cursive", family: "cursive" },
    { id: "huiwen", name: "徽文明朝", family: "'Huiwen-mincho', serif" },
  ]

  // 背景样式
  const backgroundStyles = [
    { id: "light-green-paper", name: "淡绿纸质", description: "清新自然的淡绿色纸质纹理" },
    { id: "warm-paper", name: "暖色纸质", description: "温暖的米黄色纸质纹理，营造温馨感" },
    { id: "minimal-white", name: "简约白色", description: "极简主义的纯白背景，适合任何内容" },
    { id: "dark-elegant", name: "深色优雅", description: "深灰黑色背景，适合高对比度内容" },
  ]

  // State for user input
  const [state, setState] = useState(defaultState)
  const [isDownloading, setIsDownloading] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [activeTab, setActiveTab] = useState("preview") // 'preview' or 'settings'
  const [fullscreenPreview, setFullscreenPreview] = useState(false)
  const [showSaveFailureModal, setShowSaveFailureModal] = useState(false)
  const [mobileEditMode, setMobileEditMode] = useState<string | null>(null) // null, 'text', 'style', 'layout'

  // Mouse tracking for card hover effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardContainerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardContainerRef.current) return

    const rect = cardContainerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    setMousePosition({ x, y })
  }

  // Handle scroll for showing scroll-to-top button
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to preview function
  const scrollToPreview = () => {
    if (previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: "smooth" })
    }
    setActiveTab("preview")
  }

  // Scroll to top function
  const scrollToTop = () => {
    if (typeof window === "undefined") return
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Handle text input changes
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setState((prev) => ({ ...prev, [name]: value }))
  }

  // Handle position slider changes
  const handlePositionChange = (name: string, value: number[]) => {
    setState((prev) => ({ ...prev, [name]: value[0] }))
  }

  // Handle font size slider changes
  const handleFontSizeChange = (name: string, value: number[]) => {
    setState((prev) => ({ ...prev, [name]: value[0] }))
  }

  // Handle aspect ratio change
  const handleAspectRatioChange = (ratio: AspectRatio) => {
    setState((prev) => ({ ...prev, aspectRatio: ratio }))
  }

  // Add a function to handle background style change
  const handleBackgroundStyleChange = (styleId: string) => {
    setState((prev) => ({ ...prev, backgroundStyle: styleId }))
  }

  // Handle custom background image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setState((prev) => ({
          ...prev,
          backgroundStyle: "custom-image",
          customBackgroundImage: imageUrl,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Remove custom background image
  const removeCustomBackground = () => {
    setState((prev) => ({
      ...prev,
      backgroundStyle: "minimal-white",
      customBackgroundImage: null,
    }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Reset to default values
  const handleReset = () => {
    setState(defaultState)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // 修改下载函数，添加失败处理
  const handleDownload = async () => {
    if (!cardRef.current) return

    try {
      setIsDownloading(true)

      // 临时移除卡片容器的圆角和阴影，避免黑边
      const originalBorderRadius = cardRef.current.style.borderRadius
      const originalBoxShadow = cardRef.current.style.boxShadow
      cardRef.current.style.borderRadius = "0"
      cardRef.current.style.boxShadow = "none"

      // 创建一个canvas从卡片元素
      const canvas = await html2canvas(cardRef.current, {
        scale: 3, // 更高分辨率
        backgroundColor: null, // 透明背景
        logging: false,
        useCORS: true,
        allowTaint: true, // 允许跨域图片
        removeContainer: true, // 移除临时创建的容器
        // 确保没有额外的边距
        x: 0,
        y: 0,
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
      })

      // 恢复原始样式
      cardRef.current.style.borderRadius = originalBorderRadius
      cardRef.current.style.boxShadow = originalBoxShadow

      // 转换canvas为数据URL
      const dataUrl = canvas.toDataURL("image/png")

      if (isMobile) {
        try {
          if (typeof window === "undefined") return

          // 在移动设备上，打开图片在新标签页中，用户可以长按保存
          const newTab = window.open()
          if (newTab) {
            newTab.document.write(`
            <html>
              <head>
                <title>鸡汤卡片 - 长按图片保存</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body { margin: 0; padding: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: #f5f5f7; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
                  .container { padding: 20px; max-width: 100%; text-align: center; }
                  img { max-width: 100%; height: auto; box-shadow: 0 4px 20px rgba(0,0,0,0.1); margin-bottom: 20px; }
                  h3 { color: #1d1d1f; font-weight: 500; }
                  p { color: #86868b; font-size: 14px; line-height: 1.4; }
                </style>
              </head>
              <body>
                <div class="container">
                  <h3>长按图片保存到相册</h3>
                  <img src="${dataUrl}" alt="鸡汤卡片" />
                  <p>图片已生成，长按图片可保存到您的相册</p>
                </div>
              </body>
            </html>
          `)
            newTab.document.close()
          } else {
            // 如果无法打开新标签，则尝试直接显示图片
            window.location.href = dataUrl
          }
        } catch (error) {
          console.error("Error opening new tab:", error)
          // 显示保存失败提示
          setShowSaveFailureModal(true)
        }
      } else {
        // 桌面端使用常规下载方法
        const link = document.createElement("a")
        link.download = `quote-card-${new Date().getTime()}.png`
        link.href = dataUrl
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.error("Error generating image:", error)
      // 显示保存失败提示
      setShowSaveFailureModal(true)
    } finally {
      setIsDownloading(false)
    }
  }

  // 分享功能
  const handleShare = async () => {
    if (!cardRef.current) return

    try {
      setIsDownloading(true)

      // 临时移除卡片容器的圆角和阴影，避免黑边
      const originalBorderRadius = cardRef.current.style.borderRadius
      const originalBoxShadow = cardRef.current.style.boxShadow
      cardRef.current.style.borderRadius = "0"
      cardRef.current.style.boxShadow = "none"

      // 创建画布
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null, // 透明背景
        logging: false,
        useCORS: true,
        allowTaint: true,
        removeContainer: true,
        // 确保没有额外的边距
        x: 0,
        y: 0,
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight,
      })

      // 恢复原始样式
      cardRef.current.style.borderRadius = originalBorderRadius
      cardRef.current.style.boxShadow = originalBoxShadow

      // 转换为Blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob)
        }, "image/png")
      })

      // 使用Web Share API分享
      if (navigator.share) {
        try {
          const file = new File([blob], "quote-card.png", { type: "image/png" })
          await navigator.share({
            title: "我的鸡汤卡片",
            text: "我用鸡汤卡片生成器创建了这张卡片",
            files: [file],
          })
        } catch (error) {
          console.error("Error sharing:", error)
          // 显示保存失败提示
          setShowSaveFailureModal(true)
        }
      } else {
        // 如果不支持分享API，则下载
        const dataUrl = canvas.toDataURL("image/png")
        const link = document.createElement("a")
        link.download = `quote-card-${new Date().getTime()}.png`
        link.href = dataUrl
        link.click()
      }
    } catch (error) {
      console.error("Error sharing image:", error)
      // 显示保存失败提示
      setShowSaveFailureModal(true)
    } finally {
      setIsDownloading(false)
    }
  }

  // 添加字体选择处理函数
  const handleFontChange = (fontId: string) => {
    setState((prev) => ({ ...prev, chineseFont: fontId }))
  }

  // Add a function to handle English font change
  const handleEnglishFontChange = (fontId: string) => {
    setState((prev) => ({ ...prev, englishFont: fontId }))
  }

  // 切换移动端菜单
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  // 切换标签页
  const switchTab = (tab: string) => {
    setActiveTab(tab)
  }

  // 切换全屏预览
  const toggleFullscreenPreview = () => {
    setFullscreenPreview(!fullscreenPreview)
    // 关闭编辑模式
    setMobileEditMode(null)
  }

  // 切换移动端编辑模式
  const toggleMobileEditMode = (mode: string | null) => {
    setMobileEditMode(mode === mobileEditMode ? null : mode)
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "鸡汤卡片生成器",
              description:
                "免费在线鸡汤卡片生成器，轻松创建精美的励志语录卡片。支持多种字体和样式，一键生成高质量图片。",
              url: "https://simplecard.vercel.app",
              applicationCategory: "DesignApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "CNY",
              },
              creator: {
                "@type": "Organization",
                name: "鸡汤卡片生成器",
              },
              featureList: ["多种字体选择", "自定义文字内容", "高质量图片导出", "移动端适配", "免费使用"],
            }),
          }}
        />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="鸡汤卡片" />
        <link rel="canonical" href="https://simplecard.vercel.app" />
      </Head>

      <main className="min-h-screen bg-white relative overflow-hidden">
        {/* Flowing quotes background - 在移动端隐藏以提高性能 */}
        {!isMobile && (
          <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
            <div
              className="flowing-quote flowing-quote-right text-4xl"
              style={{ top: "5%", animationDuration: "60s", color: "rgba(0, 0, 0, 0.05)" }}
            >
              如果做好心理准备，一切准备都已经完成 ——莎士比亚
            </div>
            <div
              className="flowing-quote flowing-quote-left text-3xl"
              style={{ top: "15%", animationDuration: "50s", color: "rgba(0, 0, 0, 0.06)" }}
            >
              祝你今天愉快。你明天的愉快留着我明天再祝 ——王小波
            </div>
            <div
              className="flowing-quote flowing-quote-right text-5xl"
              style={{ top: "25%", animationDuration: "70s", color: "rgba(0, 0, 0, 0.04)" }}
            >
              上船不思岸上人，下船不提船上事 ——李叔同
            </div>
            <div
              className="flowing-quote flowing-quote-left text-4xl"
              style={{ top: "35%", animationDuration: "55s", color: "rgba(0, 0, 0, 0.05)" }}
            >
              社交中最大的成本，就是花时间去在乎不怎么在乎你的人。
            </div>
            <div
              className="flowing-quote flowing-quote-right text-3xl"
              style={{ top: "45%", animationDuration: "65s", color: "rgba(0, 0, 0, 0.06)" }}
            >
              "我向你介绍的巴黎一定不是客观的，因为我25岁在巴黎读书，我向你介绍的巴黎其实是我的25岁。"
              人生没有白走的路，每一步都是日后登上观望台的必经。——蒋勋
            </div>
            <div
              className="flowing-quote flowing-quote-left text-5xl"
              style={{ top: "55%", animationDuration: "53s", color: "rgba(0, 0, 0, 0.04)" }}
            >
              世上最难的是说服别人。尤其说服一个没有经历过这件事的人
            </div>
            <div
              className="flowing-quote flowing-quote-right text-4xl"
              style={{ top: "65%", animationDuration: "68s", color: "rgba(0, 0, 0, 0.05)" }}
            >
              生活不是发现的过程，而是创造的过程。别试图解答你是什么人，要试图确定你想成为什么人。
            </div>
            <div
              className="flowing-quote flowing-quote-left text-3xl"
              style={{ top: "75%", animationDuration: "58s", color: "rgba(0, 0, 0, 0.06)" }}
            >
              别和重要的人，计较不重要的事。别和不重要的人，计较任何事。
            </div>
            <div
              className="flowing-quote flowing-quote-right text-5xl"
              style={{ top: "85%", animationDuration: "62s", color: "rgba(0, 0, 0, 0.04)" }}
            >
              你采取的每个行动都像一张选票，投给你想要成为的那一种人。——詹姆斯·克利尔《原子习惯》
            </div>
            <div
              className="flowing-quote flowing-quote-left text-4xl"
              style={{ top: "95%", animationDuration: "52s", color: "rgba(0, 0, 0, 0.05)" }}
            >
              如果你想取得与众不同的结果，你就要做一些与大多数人不同的事情。
            </div>
          </div>
        )}

        {/* Background gradient elements - 在移动端简化 */}
        {!isMobile ? (
          <>
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -top-20 -right-40 w-80 h-80 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-60 left-40 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </>
        ) : (
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-gray-50 to-transparent opacity-50"></div>
        )}

        {/* 保存失败提示模态框 */}
        {showSaveFailureModal && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowSaveFailureModal(false)}
          >
            <div
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera size={28} className="text-gray-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">无法自动保存图片</h3>
                <p className="text-sm text-gray-600 mb-4">请尝试手动截图保存您的卡片，或使用系统自带的截屏功能。</p>
                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg mb-4 text-left">
                  <p className="mb-1">
                    <strong>iOS设备：</strong> 同时按下侧边按钮和音量增加按钮
                  </p>
                  <p>
                    <strong>Android设备：</strong> 同时按下电源键和音量减小键
                  </p>
                </div>
              </div>
              <Button
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                onClick={() => setShowSaveFailureModal(false)}
              >
                我知道了
              </Button>
            </div>
          </div>
        )}

        {/* 全屏预览模式 */}
        {fullscreenPreview && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <button onClick={toggleFullscreenPreview} className="flex items-center text-gray-700 font-medium">
                <ArrowLeft size={18} className="mr-2" />
                返回编辑
              </button>
              <div className="flex gap-2">
                {!isMobile && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    disabled={isDownloading}
                    className="text-gray-700 bg-transparent"
                  >
                    <Share2 size={16} className="mr-1" />
                    分享
                  </Button>
                )}
                <Button size="sm" onClick={handleDownload} disabled={isDownloading} className="bg-gray-900 text-white">
                  <Download size={16} className="mr-1" />
                  {isDownloading ? "生成中" : isMobile ? "保存图片" : "下载"}
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-gray-50">
              <div className="max-w-md w-full">
                <div className="overflow-hidden rounded-xl shadow-md" ref={cardRef}>
                  <QuoteCard
                    chineseText={state.chineseText}
                    englishText={state.englishText}
                    signature={state.signature}
                    chinesePosition={state.chinesePosition}
                    englishPosition={state.englishPosition}
                    signaturePosition={state.signaturePosition}
                    chineseFontSize={state.chineseFontSize}
                    englishFontSize={state.englishFontSize}
                    signatureFontSize={state.signatureFontSize}
                    aspectRatio={state.aspectRatio}
                    backgroundStyle={state.backgroundStyle}
                    customBackgroundImage={state.customBackgroundImage}
                    chineseFont={state.chineseFont}
                    englishFont={state.englishFont}
                  />
                </div>
              </div>
            </div>

            {/* 移动端简化编辑控件 */}
            {isMobile && (
              <div className="border-t border-gray-100 p-4">
                <div className="flex justify-around">
                  <button
                    className={`flex flex-col items-center ${mobileEditMode === "text" ? "text-blue-600" : "text-gray-600"}`}
                    onClick={() => toggleMobileEditMode("text")}
                  >
                    <div className={`p-2 rounded-full ${mobileEditMode === "text" ? "bg-blue-50" : "bg-gray-50"}`}>
                      <Text size={20} />
                    </div>
                    <span className="text-xs mt-1">文字</span>
                  </button>
                  <button
                    className={`flex flex-col items-center ${mobileEditMode === "style" ? "text-blue-600" : "text-gray-600"}`}
                    onClick={() => toggleMobileEditMode("style")}
                  >
                    <div className={`p-2 rounded-full ${mobileEditMode === "style" ? "bg-blue-50" : "bg-gray-50"}`}>
                      <Palette size={20} />
                    </div>
                    <span className="text-xs mt-1">样式</span>
                  </button>
                  <button
                    className={`flex flex-col items-center ${mobileEditMode === "layout" ? "text-blue-600" : "text-gray-600"}`}
                    onClick={() => toggleMobileEditMode("layout")}
                  >
                    <div className={`p-2 rounded-full ${mobileEditMode === "layout" ? "bg-blue-50" : "bg-gray-50"}`}>
                      <Edit size={20} />
                    </div>
                    <span className="text-xs mt-1">布局</span>
                  </button>
                </div>

                {/* 文字编辑面板 */}
                {mobileEditMode === "text" && (
                  <div className="mt-4 animate-fade-in">
                    <div className="mb-4">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">中文内容</label>
                      <Textarea
                        name="chineseText"
                        value={state.chineseText}
                        onChange={handleTextChange}
                        placeholder="输入中文文本，使用回车键换行"
                        rows={4}
                        className="resize-none rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0 transition-all duration-300 bg-white"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="text-sm font-medium text-gray-700 mb-1 block">英文内容</label>
                      <Textarea
                        name="englishText"
                        value={state.englishText}
                        onChange={handleTextChange}
                        placeholder="输入英文文本，使用回车键换行"
                        rows={3}
                        className="resize-none rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0 transition-all duration-300 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">签名</label>
                      <Input
                        name="signature"
                        value={state.signature}
                        onChange={handleTextChange}
                        placeholder="输入您的签名"
                        className="rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0 transition-all duration-300 bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* 样式编辑面板 */}
                {mobileEditMode === "style" && (
                  <div className="mt-4 animate-fade-in">
                    <div className="mb-4">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">背景样式</label>
                      <div className="grid grid-cols-4 gap-2">
                        {backgroundStyles.map((style) => (
                          <button
                            key={style.id}
                            onClick={() => handleBackgroundStyleChange(style.id)}
                            className={`aspect-square rounded-lg border transition-all duration-300 ${
                              state.backgroundStyle === style.id
                                ? "ring-2 ring-blue-400 ring-offset-2"
                                : "border-gray-200"
                            }`}
                            style={{
                              backgroundColor:
                                style.id === "light-green-paper"
                                  ? "#e8ede7"
                                  : style.id === "minimal-white"
                                    ? "#ffffff"
                                    : style.id === "warm-paper"
                                      ? "#f9f6f0"
                                      : style.id === "dark-elegant"
                                        ? "#1a1a1a"
                                        : "#ffffff",
                              backgroundImage:
                                style.id === "light-green-paper"
                                  ? "radial-gradient(circle at center, #CBD9C8 0%, #e8ede7 70%)"
                                  : style.id === "minimal-white"
                                    ? "none"
                                    : style.id === "warm-paper"
                                      ? "radial-gradient(circle at center, #f5f0e5 0%, #f9f6f0 70%)"
                                      : style.id === "dark-elegant"
                                        ? "radial-gradient(circle at center, #2a2a2a 0%, #1a1a1a 70%)"
                                        : "none",
                            }}
                          ></button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">中文字体样式</label>
                      <div className="flex gap-2 w-full">
                        {chineseFonts.map((font) => (
                          <button
                            key={font.id}
                            onClick={() => handleFontChange(font.id)}
                            className={`flex-1 py-2 px-3 rounded-lg border transition-all duration-300 text-center ${
                              state.chineseFont === font.id ? "border-blue-400 bg-blue-50" : "border-gray-200"
                            }`}
                            style={{ fontFamily: font.family }}
                          >
                            <span className="text-sm">墨韵</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Add English font selection */}
                    <div className="mb-4">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">英文字体样式</label>
                      <div className="flex flex-wrap gap-2 w-full">
                        {englishFonts.map((font) => (
                          <button
                            key={font.id}
                            onClick={() => handleEnglishFontChange(font.id)}
                            className={`flex-1 py-2 px-3 rounded-lg border transition-all duration-300 text-center ${
                              state.englishFont === font.id ? "border-blue-400 bg-blue-50" : "border-gray-200"
                            }`}
                            style={{ fontFamily: font.family }}
                          >
                            <span className="text-sm">Abc</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">卡片尺寸</label>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleAspectRatioChange("3:4")}
                          className={`flex-1 py-3 px-4 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 ${
                            state.aspectRatio === "3:4" ? "border-blue-400 bg-blue-50" : "border-gray-200"
                          }`}
                        >
                          <div className="w-6 h-8 rounded bg-gray-200 flex items-center justify-center">
                            <div className="w-4 h-5 bg-gray-400 rounded"></div>
                          </div>
                          <span className="text-sm font-medium">3:4</span>
                        </button>
                        <button
                          onClick={() => handleAspectRatioChange("9:16")}
                          className={`flex-1 py-3 px-4 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 ${
                            state.aspectRatio === "9:16" ? "border-blue-400 bg-blue-50" : "border-gray-200"
                          }`}
                        >
                          <div className="w-5 h-9 rounded bg-gray-200 flex items-center justify-center">
                            <div className="w-3 h-7 bg-gray-400 rounded"></div>
                          </div>
                          <span className="text-sm font-medium">9:16</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 布局编辑面板 */}
                {mobileEditMode === "layout" && (
                  <div className="mt-4 animate-fade-in">
                    <div className="mb-4">
                      <div
                        className="flex justify-between items-center mb-1
                    "
                      >
                        <label className="text-sm font-medium text-gray-700">中文字体大小</label>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {state.chineseFontSize}px
                        </span>
                      </div>
                      <Slider
                        value={[state.chineseFontSize]}
                        min={12}
                        max={60}
                        step={1}
                        onValueChange={(value) => handleFontSizeChange("chineseFontSize", value)}
                        className="py-1"
                      />
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-medium text-gray-700">中文位置</label>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {state.chinesePosition}%
                        </span>
                      </div>
                      <Slider
                        value={[state.chinesePosition]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => handlePositionChange("chinesePosition", value)}
                        className="py-1"
                      />
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-medium text-gray-700">英文位置</label>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {state.englishPosition}%
                        </span>
                      </div>
                      <Slider
                        value={[state.englishPosition]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => handlePositionChange("englishPosition", value)}
                        className="py-1"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-medium text-gray-700">签名位置</label>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {state.signaturePosition}%
                        </span>
                      </div>
                      <Slider
                        value={[state.signaturePosition]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => handlePositionChange("signaturePosition", value)}
                        className="py-1"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Header - 移动端简化 */}
        <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/30 sticky top-0 z-10 transition-all duration-300">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/images/chicken-logo.png" alt="鸡汤卡片" className="w-10 h-10 object-contain" />
              {!isMobile && (
                <h1 className="text-xl sm:text-2xl font-medium text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                  鸡汤卡片生成器
                </h1>
              )}
            </div>

            {/* 桌面端按钮 */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/portfolio">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-900 transition-all duration-300 hover:scale-105"
                >
                  <ImageIcon size={16} className="mr-2" />
                  作品集
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-gray-500 hover:text-gray-900 transition-all duration-300 hover:scale-105"
              >
                <RefreshCw size={16} className="mr-2" />
                重置
              </Button>
              <Button
                onClick={handleDownload}
                disabled={isDownloading}
                className="bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white rounded-full px-5 transition-all duration-300 hover:scale-105 hover:shadow-md"
              >
                <Download size={16} className="mr-2" />
                {isDownloading ? "生成中..." : "下载图片"}
              </Button>
            </div>

            {/* 移动端按钮 - 简化 */}
            {isMobile && (
              <div className="flex items-center gap-2">
                <Link href="/portfolio">
                  <Button size="sm" variant="ghost" className="text-gray-700">
                    <ImageIcon size={16} className="mr-1" />
                    作品集
                  </Button>
                </Link>
                <Button
                  onClick={toggleFullscreenPreview}
                  size="sm"
                  variant="default"
                  className="bg-gray-900 text-white"
                >
                  <Eye size={16} className="mr-1" />
                  预览
                </Button>
              </div>
            )}
          </div>
        </header>

        {/* 移动端菜单 - 移除，使用全屏预览中的简化编辑控件代替 */}

        {/* 移动端标签切换 - 移除，简化界面 */}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-0">
          {/* Card Preview - 移动端简化 */}
          <div className="lg:col-span-6 lg:order-2">
            <div ref={previewRef} className="lg:sticky lg:top-32 flex flex-col items-center">
              <div
                className="card-preview-container perspective-1000 w-full max-w-md mx-auto"
                ref={cardContainerRef}
                onMouseMove={handleMouseMove}
              >
                <div
                  className="card-preview-wrapper w-full transition-all duration-500 transform-gpu preserve-3d hover:shadow-[0_15px_40px_rgb(0,0,0,0.1)] bg-white/60 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-gray-100/80"
                  style={{
                    transform: !isMobile
                      ? `rotateY(${(mousePosition.x - 0.5) * 10}deg) rotateX(${(0.5 - mousePosition.y) * 10}deg) translateZ(10px)`
                      : "none",
                  }}
                >
                  <div className="overflow-hidden rounded-xl shadow-sm" ref={cardRef}>
                    <QuoteCard
                      chineseText={state.chineseText}
                      englishText={state.englishText}
                      signature={state.signature}
                      chinesePosition={state.chinesePosition}
                      englishPosition={state.englishPosition}
                      signaturePosition={state.signaturePosition}
                      chineseFontSize={state.chineseFontSize}
                      englishFontSize={state.englishFontSize}
                      signatureFontSize={state.signatureFontSize}
                      aspectRatio={state.aspectRatio}
                      backgroundStyle={state.backgroundStyle}
                      customBackgroundImage={state.customBackgroundImage}
                      chineseFont={state.chineseFont}
                      englishFont={state.englishFont}
                    />
                  </div>
                </div>

                {/* 移动端预览操作按钮 - 简化 */}
                {isMobile && (
                  <div className="flex w-full mt-4">
                    <Button onClick={toggleFullscreenPreview} className="w-full bg-gray-900 text-white">
                      <Eye size={16} className="mr-2" />
                      全屏预览与编辑
                    </Button>
                  </div>
                )}
              </div>

              {/* Background Style Selector - 桌面端保留，移动端在全屏预览中简化 */}
              {!isMobile && (
                <div className="w-full max-w-md mt-6 sm:mt-8 bg-white/60 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-gray-100/80 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                  <h2 className="text-base font-medium text-gray-900 mb-4 relative inline-block">
                    背景样式
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></span>
                  </h2>

                  {/* Predefined background styles - Redesigned as a grid of color swatches */}
                  <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-5">
                    {backgroundStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => handleBackgroundStyleChange(style.id)}
                        className={`group flex flex-col items-center transition-all duration-300 ${
                          state.backgroundStyle === style.id ? "scale-105" : "hover:scale-105"
                        }`}
                        title={style.description}
                      >
                        <div
                          className={`w-12 sm:w-14 h-12 sm:h-14 rounded-xl border transition-all duration-300 ${
                            state.backgroundStyle === style.id
                              ? "ring-2 ring-gray-400 ring-offset-2"
                              : "border-gray-200 group-hover:border-gray-300"
                          }`}
                          style={{
                            backgroundColor:
                              style.id === "light-green-paper"
                                ? "#e8ede7"
                                : style.id === "minimal-white"
                                  ? "#ffffff"
                                  : style.id === "warm-paper"
                                    ? "#f9f6f0"
                                    : style.id === "dark-elegant"
                                      ? "#1a1a1a"
                                      : "#ffffff",
                            backgroundImage:
                              style.id === "light-green-paper"
                                ? "radial-gradient(circle at center, #CBD9C8 0%, #e8ede7 70%)"
                                : style.id === "minimal-white"
                                  ? "none"
                                  : style.id === "warm-paper"
                                    ? "radial-gradient(circle at center, #f5f0e5 0%, #f9f6f0 70%)"
                                    : style.id === "dark-elegant"
                                      ? "radial-gradient(circle at center, #2a2a2a 0%, #1a1a1a 70%)"
                                      : "none",
                          }}
                        ></div>
                        <span className="text-xs text-gray-600 mt-2 text-center">{style.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Custom background image upload - Redesigned for better aesthetics */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-800">自定义背景</h3>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>

                    {state.customBackgroundImage ? (
                      <div className="relative rounded-xl overflow-hidden group">
                        <div
                          className="aspect-[3/1] w-full bg-cover bg-center rounded-xl transition-all duration-300"
                          style={{ backgroundImage: `url(${state.customBackgroundImage})` }}
                        ></div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <button
                            onClick={removeCustomBackground}
                            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                            title="移除自定义背景"
                          >
                            <X size={18} className="text-gray-700" />
                          </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm py-2 px-3">
                          <p className="text-xs text-gray-700 truncate">自定义背景图片</p>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={triggerFileInput}
                        className="w-full py-5 px-4 border border-dashed border-gray-300 hover:border-gray-400 rounded-xl transition-all duration-300 bg-gray-50/50 hover:bg-gray-50/80 flex flex-col items-center justify-center gap-2 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                          <ImageIcon size={20} className="text-gray-500" />
                        </div>
                        <span className="text-sm text-gray-600">点击上传背景图片</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Unified Control Panel - 桌面端保留，移动端在全屏预览中简化 */}
          {!isMobile && (
            <div className="lg:col-span-6 lg:order-1">
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-5 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                {/* Aspect Ratio Selector */}
                <section className="mb-6 animate-fadeIn">
                  <h2 className="text-base font-medium text-gray-900 mb-4 relative inline-block">
                    卡片尺寸
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent"></span>
                  </h2>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleAspectRatioChange("3:4")}
                      className={`flex-1 py-3 px-4 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 ${
                        state.aspectRatio === "3:4"
                          ? "border-gray-400 bg-gray-50 shadow-sm"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="w-6 h-8 rounded bg-gray-200 flex items-center justify-center">
                        <div className="w-4 h-5 bg-gray-400 rounded"></div>
                      </div>
                      <span className="text-sm font-medium">3:4</span>
                    </button>
                    <button
                      onClick={() => handleAspectRatioChange("9:16")}
                      className={`flex-1 py-3 px-4 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 ${
                        state.aspectRatio === "9:16"
                          ? "border-gray-400 bg-gray-50 shadow-sm"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="w-5 h-9 rounded bg-gray-200 flex items-center justify-center">
                        <div className="w-3 h-7 bg-gray-400 rounded"></div>
                      </div>
                      <span className="text-sm font-medium">9:16</span>
                    </button>
                  </div>
                </section>

                {/* 折叠面板 - 英文文本 */}
                <details className="group mb-4 border border-gray-200 rounded-lg overflow-hidden">
                  <summary className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer">
                    <h2 className="text-base font-medium text-gray-900">英文文本</h2>
                    <div className="w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center group-open:rotate-180 transition-transform">
                      <ChevronUp size={12} />
                    </div>
                  </summary>
                  <div className="p-4 space-y-5 animate-fadeIn">
                    <div className="group">
                      <Textarea
                        name="englishText"
                        value={state.englishText}
                        onChange={handleTextChange}
                        placeholder="输入英文文本，使用回车键换行"
                        rows={4}
                        className="resize-none rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0 transition-all duration-300 bg-white/70 backdrop-blur-sm group-hover:bg-white/90"
                      />
                    </div>

                    {/* Add font selection */}
                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm text-gray-500 flex items-center">
                          <Type className="w-4 h-4 mr-1" />
                          字体样式
                        </label>
                      </div>
                      <div className="flex flex-wrap gap-2 w-full">
                        {englishFonts.map((font) => (
                          <button
                            key={font.id}
                            onClick={() => handleEnglishFontChange(font.id)}
                            className={`flex-1 py-2 px-3 rounded-lg border transition-all duration-300 text-center ${
                              state.englishFont === font.id
                                ? "border-gray-400 bg-gray-50 shadow-sm"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            style={{ fontFamily: font.family }}
                          >
                            <span className="text-sm">Abc</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Position control */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm text-gray-500 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 5V19M12 5L6 11M12 5L18 11"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          位置调整
                        </label>
                        <span className="text-xs text-gray-500 bg-gray-100/70 backdrop-blur-sm px-2 py-1 rounded-full transition-all duration-300">
                          {state.englishPosition}%
                        </span>
                      </div>
                      <Slider
                        value={[state.englishPosition]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => handlePositionChange("englishPosition", value)}
                        className="py-1"
                      />
                    </div>

                    {/* Font size control */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm text-gray-500 flex items-center">
                          <Type className="w-4 h-4 mr-1" />
                          字体大小
                        </label>
                        <span className="text-xs text-gray-500 bg-gray-100/70 backdrop-blur-sm px-2 py-1 rounded-full transition-all duration-300">
                          {state.englishFontSize}px
                        </span>
                      </div>
                      <Slider
                        value={[state.englishFontSize]}
                        min={8}
                        max={24}
                        step={1}
                        onValueChange={(value) => handleFontSizeChange("englishFontSize", value)}
                        className="py-1"
                      />
                    </div>
                  </div>
                </details>

                {/* 折叠面板 - 中文文本 */}
                <details className="group mb-4 border border-gray-200 rounded-lg overflow-hidden" open>
                  <summary className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer">
                    <h2 className="text-base font-medium text-gray-900">中文文本</h2>
                    <div className="w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center group-open:rotate-180 transition-transform">
                      <ChevronUp size={12} />
                    </div>
                  </summary>
                  <div className="p-4 space-y-5 animate-fadeIn">
                    <div className="group">
                      <Textarea
                        name="chineseText"
                        value={state.chineseText}
                        onChange={handleTextChange}
                        placeholder="输入中文文本，使用回车键换行"
                        rows={6}
                        className="resize-none rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0 transition-all duration-300 bg-white/70 backdrop-blur-sm group-hover:bg-white/90"
                      />
                    </div>

                    {/* Font selection */}
                    <div className="mb-5">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm text-gray-500 flex items-center">
                          <Type className="w-4 h-4 mr-1" />
                          字体样式
                        </label>
                      </div>
                      <div className="flex gap-2 w-full">
                        {chineseFonts.map((font) => (
                          <button
                            key={font.id}
                            onClick={() => handleFontChange(font.id)}
                            className={`flex-1 py-2 px-3 rounded-lg border transition-all duration-300 text-center ${
                              state.chineseFont === font.id
                                ? "border-gray-400 bg-gray-50 shadow-sm"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            style={{ fontFamily: font.family }}
                          >
                            <span className="text-sm">墨韵</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Position control */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm text-gray-500 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 5V19M12 5L6 11M12 5L18 11"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          位置调整
                        </label>
                        <span className="text-xs text-gray-500 bg-gray-100/70 backdrop-blur-sm px-2 py-1 rounded-full transition-all duration-300">
                          {state.chinesePosition}%
                        </span>
                      </div>
                      <Slider
                        value={[state.chinesePosition]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => handlePositionChange("chinesePosition", value)}
                        className="py-1"
                      />
                    </div>

                    {/* Font size control */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm text-gray-500 flex items-center">
                          <Type className="w-4 h-4 mr-1" />
                          字体大小
                        </label>
                        <span className="text-xs text-gray-500 bg-gray-100/70 backdrop-blur-sm px-2 py-1 rounded-full transition-all duration-300">
                          {state.chineseFontSize}px
                        </span>
                      </div>
                      <Slider
                        value={[state.chineseFontSize]}
                        min={12}
                        max={60}
                        step={1}
                        onValueChange={(value) => handleFontSizeChange("chineseFontSize", value)}
                        className="py-1"
                      />
                    </div>
                  </div>
                </details>

                {/* 折叠面板 - 签名 */}
                <details className="group mb-4 border border-gray-200 rounded-lg overflow-hidden">
                  <summary className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer">
                    <h2 className="text-base font-medium text-gray-900">签名</h2>
                    <div className="w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center group-open:rotate-180 transition-transform">
                      <ChevronUp size={12} />
                    </div>
                  </summary>
                  <div className="p-4 space-y-5 animate-fadeIn">
                    <div className="group">
                      <Input
                        name="signature"
                        value={state.signature}
                        onChange={handleTextChange}
                        placeholder="输入您的签名"
                        className="rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0 transition-all duration-300 bg-white/70 backdrop-blur-sm group-hover:bg-white/90"
                      />
                    </div>

                    {/* Position control */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm text-gray-500 flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 5V19M12 5L6 11M12 5L18 11"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          位置调整
                        </label>
                        <span className="text-xs text-gray-500 bg-gray-100/70 backdrop-blur-sm px-2 py-1 rounded-full transition-all duration-300">
                          {state.signaturePosition}%
                        </span>
                      </div>
                      <Slider
                        value={[state.signaturePosition]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => handlePositionChange("signaturePosition", value)}
                        className="py-1"
                      />
                    </div>

                    {/* Font size control */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm text-gray-500 flex items-center">
                          <Type className="w-4 h-4 mr-1" />
                          字体大小
                        </label>
                        <span className="text-xs text-gray-500 bg-gray-100/70 backdrop-blur-sm px-2 py-1 rounded-full transition-all duration-300">
                          {state.signatureFontSize}px
                        </span>
                      </div>
                      <Slider
                        value={[state.signatureFontSize]}
                        min={8}
                        max={24}
                        step={1}
                        onValueChange={(value) => handleFontSizeChange("signatureFontSize", value)}
                        className="py-1"
                      />
                    </div>
                  </div>
                </details>
              </div>
            </div>
          )}
        </div>

        {/* Footer - 移动端简化 */}
        <footer
          className={`py-6 sm:py-8 bg-white/60 backdrop-blur-lg border-t border-gray-200/30 ${isMobile ? "pb-20" : ""}`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
              {/* Contact the Author - 移动端简化 */}
              {isMobile ? (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">微信扫码关注公众号</p>
                  <div className="bg-white inline-block p-2 rounded-lg shadow-sm border border-gray-100">
                    <img src="/images/author-qrcode.png" alt="微信二维码" className="w-20 h-20 object-cover" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">获取更多精彩内容</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <h3 className="text-base font-medium text-gray-800 mb-3">联系作者</h3>
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                    <img
                      src="/images/author-qrcode.png"
                      alt="微信二维码"
                      className="w-24 sm:w-32 h-24 sm:h-32 object-cover"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-600">微信扫描二维码，关注我的公众号</p>
                </div>
              )}

              {/* Copyright */}
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-500 animate-pulse">
                  © {new Date().getFullYear()} 手写卡片生成器 · 欢迎使用
                </p>
                <p className="text-xs text-gray-400 mt-1">顺便请作者喝杯奶茶</p>
              </div>
            </div>
          </div>
          {/* 在footer中添加字体测试元素 */}
          <div className="hidden">
            <span className="font-huiwen font-huiwen-test">徽文明朝测试</span>
            <span className="font-kaiti">楷体测试</span>
            <span className="font-fangsong">仿宋测试</span>
            <span className="font-lishu">隶书测试</span>
          </div>
        </footer>

        {/* Scroll to top button */}
        {!isMobile && (
          <button
            onClick={scrollToTop}
            className={`fixed right-4 sm:right-6 bottom-20 sm:bottom-6 p-3 rounded-full bg-white/80 backdrop-blur-lg shadow-md border border-gray-200/50 text-gray-600 transition-all duration-300 hover:shadow-lg hover:scale-110 ${
              showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
            }`}
          >
            <ChevronUp size={20} />
          </button>
        )}
        {/* 添加字体调试组件 */}
        <FontDebug />
      </main>
    </>
  )
}
