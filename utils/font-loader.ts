// 添加字体加载工具函数
"use client"

import { useEffect, useState } from "react"

// 检查字体是否已加载
export function useFontLoaded(fontFamily: string): boolean {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // 如果document.fonts API可用
    if ("fonts" in document) {
      // 等待所有字体加载
      document.fonts.ready.then(() => {
        // 检查特定字体是否已加载
        const isAvailable = document.fonts.check(`1em '${fontFamily}'`)
        setIsLoaded(isAvailable)
        console.log(`字体 ${fontFamily} 加载状态:`, isAvailable ? "成功" : "失败")
      })
    } else {
      // 如果不支持fonts API，假设字体已加载
      setIsLoaded(true)
    }
  }, [fontFamily])

  return isLoaded
}

// 强制加载字体
export function preloadFont(fontFamily: string): void {
  // 创建一个不可见的元素来触发字体加载
  const preloadDiv = document.createElement("div")
  preloadDiv.style.fontFamily = fontFamily
  preloadDiv.style.position = "absolute"
  preloadDiv.style.visibility = "hidden"
  preloadDiv.style.pointerEvents = "none"
  preloadDiv.textContent = "Font Preload"

  document.body.appendChild(preloadDiv)

  // 短暂延迟后移除元素
  setTimeout(() => {
    document.body.removeChild(preloadDiv)
  }, 100)
}
