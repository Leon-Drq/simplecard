"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import Link from "next/link"
import AdvancedMasonryGrid from "@/components/advanced-masonry-grid"
import PortfolioItem from "@/components/portfolio-item"
import "./portfolio.css"

// 系统内置的作品数据 - 所有用户都能看到这些固定作品
const systemPortfolioItems = [
  {
    id: "1",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/quote-card-1744257507355-sNXNLbe6sUAlxjeZRgnvHb4ogb5oAY.png",
    author: "simplecard.fun",
    likes: 124,
    aspectRatio: "3:4" as const,
  },
  {
    id: "2",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/quote-card-1744210930020-Siu8in6EIfwlM5ryMHo6Ox7H1gLX33.png",
    author: "ForYouByCookie",
    likes: 89,
    aspectRatio: "3:4" as const,
  },
  {
    id: "3",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/quote-card-1744254646153-J5PJxtos2zCv4xcpvR1eqBDdYybEgq.png",
    author: "windflower777",
    likes: 156,
    aspectRatio: "3:4" as const,
  },
  {
    id: "4",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/quote-card-1744289056326-XPPqsjFjy4j18cvMJSLO1UU4XjYoWo.png",
    author: "not_2b_or_2b",
    likes: 201,
    aspectRatio: "3:4" as const,
  },
  {
    id: "5",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/quote-card-1744194880818-HJO463tL3xfzi9kH2klXtUn1eSE66a.png",
    author: "ForYouByCookie",
    likes: 178,
    aspectRatio: "3:4" as const,
  },
  {
    id: "6",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/quote-card-1744291180834-2IV909ScNCHjiKSBFFTPtxV8t9THvr.png",
    author: "保罗·策兰",
    likes: 132,
    aspectRatio: "3:4" as const,
  },
  {
    id: "7",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/quote-card-1744213478214-5dsE65LyL71wSdijDhxLNnqgnWmy2k.png",
    author: "曾仕强",
    likes: 245,
    aspectRatio: "3:4" as const,
  },
  {
    id: "8",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/quote-card-1744193514113-FIlqJOimQkrkP95vo4nljf5Kg4UlAZ.png",
    author: "ForYouByCookie",
    likes: 167,
    aspectRatio: "3:4" as const,
  },
  {
    id: "9",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/quote-card-1744254587404-EohwqSJnxrW2hVvKbd4j571r3WwLDC.png",
    author: "windflower777",
    likes: 198,
    aspectRatio: "3:4" as const,
  },
]

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState(systemPortfolioItems)
  const [viewingItem, setViewingItem] = useState<(typeof systemPortfolioItems)[0] | null>(null)
  const [userLikes, setUserLikes] = useState<string[]>([])
  const isMobile = useMediaQuery("(max-width: 768px)")

  // 从localStorage加载用户点赞数据
  useEffect(() => {
    try {
      const savedLikes = localStorage.getItem("userLikes")
      if (savedLikes) {
        setUserLikes(JSON.parse(savedLikes))
      }
    } catch (error) {
      console.error("Error loading user likes:", error)
    }
  }, [])

  // 切换点赞
  const toggleLike = (id: string) => {
    // 更新本地点赞状态
    if (!userLikes.includes(id)) {
      const updatedLikes = [...userLikes, id]
      setUserLikes(updatedLikes)
      localStorage.setItem("userLikes", JSON.stringify(updatedLikes))

      // 更新作品的点赞数（仅UI显示，不影响原始数据）
      const updatedItems = portfolioItems.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
      setPortfolioItems(updatedItems)
    }
  }

  // 查看作品
  const viewItem = (id: string) => {
    const item = portfolioItems.find((item) => item.id === id)
    if (item) {
      setViewingItem(item)
    }
  }

  // 关闭查看模态框
  const closeViewModal = () => {
    setViewingItem(null)
  }

  // 检查作品是否已被当前用户点赞
  const isLikedByUser = (id: string) => {
    return userLikes.includes(id)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* 头部 */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/">
              <img src="/images/chicken-logo.png" alt="鸡汤卡片" className="w-10 h-10 object-contain" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-medium text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                作品集
              </h1>
              <p className="text-xs text-gray-500">优秀鸡汤卡片展示</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="sm" className="text-gray-700">
                返回首页
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 作品集标题 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-medium text-gray-900">精选作品</h2>
            <p className="text-gray-500 mt-1">探索我们精心挑选的鸡汤卡片</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">共 {portfolioItems.length} 件作品</span>
          </div>
        </div>
      </section>

      {/* 作品集网格 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <AdvancedMasonryGrid gap={24} columns={3}>
          {portfolioItems.map((item) => (
            <PortfolioItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              author={item.author}
              likes={item.likes}
              aspectRatio={item.aspectRatio}
              onLike={toggleLike}
              onView={viewItem}
              className="portfolio-item"
              isLiked={isLikedByUser(item.id)}
            />
          ))}
        </AdvancedMasonryGrid>
      </section>

      {/* 查看作品模态框 */}
      {viewingItem && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeViewModal}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full shadow-xl animate-fade-in overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={closeViewModal}
                className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>

              <div style={{ aspectRatio: viewingItem.aspectRatio === "3:4" ? "3/4" : "9/16" }}>
                <img
                  src={viewingItem.imageUrl || "/placeholder.svg"}
                  alt={`作品 by ${viewingItem.author}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium">作者: {viewingItem.author}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-white">
                      <Heart
                        size={16}
                        className="mr-1"
                        fill={isLikedByUser(viewingItem.id) ? "currentColor" : "none"}
                      />
                      <span>{viewingItem.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 页脚 */}
      <footer className="py-6 sm:py-8 bg-white/60 backdrop-blur-lg border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500">© {new Date().getFullYear()} 鸡汤卡片生成器</p>
              <p className="text-xs text-gray-400 mt-1">分享智慧，传递温暖</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-500">
                  返回首页
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
