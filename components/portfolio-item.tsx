"use client"

import type React from "react"

import { Heart } from "lucide-react"
import { useState, useRef } from "react"

interface PortfolioItemProps {
  id: string
  imageUrl: string
  author: string
  likes: number
  aspectRatio: "3:4" | "9:16"
  onLike: (id: string) => void
  onView: (id: string) => void
  className?: string
  isLiked?: boolean // 添加isLiked属性
}

export default function PortfolioItem({
  id,
  imageUrl,
  author,
  likes,
  aspectRatio,
  onLike,
  onView,
  className = "",
  isLiked = false, // 默认为false
}: PortfolioItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Calculate aspect ratio style
  const getAspectRatioStyle = () => {
    return { aspectRatio: aspectRatio === "3:4" ? "3/4" : "9/16" }
  }

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    setMousePosition({ x, y })
  }

  // Handle like - 修复点赞功能
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation() // 阻止事件冒泡
    if (!isLiked) {
      onLike(id)
    }
  }

  // Handle view - 整个卡片点击时查看
  const handleView = () => {
    onView(id)
  }

  return (
    <div
      ref={cardRef}
      className={`perspective-1000 ${className} cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={handleView} // 整个卡片可点击查看
    >
      <div
        className="card-preview-wrapper w-full transition-all duration-500 transform-gpu preserve-3d hover:shadow-[0_15px_40px_rgb(0,0,0,0.1)] bg-white rounded-xl overflow-hidden border border-gray-100"
        style={{
          transform: isHovered
            ? `rotateY(${(mousePosition.x - 0.5) * 10}deg) rotateX(${(0.5 - mousePosition.y) * 10}deg) translateZ(10px)`
            : "none",
        }}
      >
        {/* Item Content */}
        <div className="relative">
          <div className="relative" style={getAspectRatioStyle()}>
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={`作品 by ${author}`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>

          {/* 只保留点赞按钮 */}
          <button
            onClick={handleLike}
            className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              isLiked
                ? "bg-red-50 text-red-500 scale-100"
                : "bg-white/90 text-gray-700 hover:text-red-500 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100"
            } ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
          </button>

          {/* 悬停时显示半透明遮罩，提示可点击 */}
          <div
            className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>

        {/* Item Footer */}
        <div className="p-3 bg-white border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs text-gray-500 truncate">by {author}</div>
          <div className="flex items-center gap-3">
            <div className="flex items-center text-gray-500">
              <Heart size={14} className={`mr-1 ${isLiked ? "text-red-500 fill-red-500" : ""}`} />
              <span className="text-xs">{likes}</span>
            </div>
          </div>
        </div>

        {/* Subtle shine effect on hover */}
        <div className={`absolute inset-0 pointer-events-none ${isHovered ? "card-shine" : "opacity-0"}`}></div>
      </div>
    </div>
  )
}
