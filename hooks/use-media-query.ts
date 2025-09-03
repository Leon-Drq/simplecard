"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    // 初始化匹配状态
    setMatches(mediaQuery.matches)

    // 创建事件监听器
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // 添加事件监听
    mediaQuery.addEventListener("change", handleChange)

    // 清理函数
    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [query])

  return matches
}
