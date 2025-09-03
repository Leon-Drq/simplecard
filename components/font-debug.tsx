"use client"

import { useEffect, useState } from "react"
import { useFontLoaded, preloadFont } from "@/utils/font-loader"

export function FontDebug() {
  const [showDebug, setShowDebug] = useState(false)
  const huiwenLoaded = useFontLoaded("Huiwen-mincho")
  const kaitiLoaded = useFontLoaded("Kaiti")
  const fangsongLoaded = useFontLoaded("FangSong")
  const lishuLoaded = useFontLoaded("LiSu")
  const segoeScriptLoaded = useFontLoaded("Segoe Script")
  const comicSansLoaded = useFontLoaded("Comic Sans MS")
  const brushScriptLoaded = useFontLoaded("Brush Script MT")

  useEffect(() => {
    if (typeof window === "undefined") return

    // 尝试预加载所有字体
    preloadFont("Huiwen-mincho")
    preloadFont("Kaiti")
    preloadFont("FangSong")
    preloadFont("LiSu")
    preloadFont("Segoe Script")
    preloadFont("Comic Sans MS")
    preloadFont("Brush Script MT")

    // 检查URL参数是否包含debug=fonts
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("debug") === "fonts") {
      setShowDebug(true)
    }
  }, [])

  if (!showDebug) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 p-4 text-xs border-t border-gray-200 z-50">
      <h3 className="font-bold mb-2">字体加载状态:</h3>
      <ul>
        <li className={huiwenLoaded ? "text-green-600" : "text-red-600"}>
          徽文明朝: {huiwenLoaded ? "已加载" : "未加载"}
          <span className="font-huiwen ml-2">测试文本</span>
        </li>
        <li className={kaitiLoaded ? "text-green-600" : "text-red-600"}>
          楷体: {kaitiLoaded ? "已加载" : "未加载"}
          <span className="font-kaiti ml-2">测试文本</span>
        </li>
        <li className={fangsongLoaded ? "text-green-600" : "text-red-600"}>
          仿宋: {fangsongLoaded ? "已加载" : "未加载"}
          <span className="font-fangsong ml-2">测试文本</span>
        </li>
        <li className={lishuLoaded ? "text-green-600" : "text-red-600"}>
          隶书: {lishuLoaded ? "已加载" : "未加载"}
          <span className="font-lishu ml-2">测试文本</span>
        </li>
        <li className={segoeScriptLoaded ? "text-green-600" : "text-red-600"}>
          Segoe Script: {segoeScriptLoaded ? "已加载" : "未加载"}
          <span className="font-segoe-script ml-2">Test Text</span>
        </li>
        <li className={comicSansLoaded ? "text-green-600" : "text-red-600"}>
          Comic Sans: {comicSansLoaded ? "已加载" : "未加载"}
          <span className="font-comic-sans ml-2">Test Text</span>
        </li>
        <li className={brushScriptLoaded ? "text-green-600" : "text-red-600"}>
          Brush Script: {brushScriptLoaded ? "已加载" : "未加载"}
          <span className="font-brush-script ml-2">Test Text</span>
        </li>
      </ul>
      <p className="mt-2">
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.reload()
            }
          }}
          className="bg-gray-200 px-2 py-1 rounded text-gray-800"
        >
          重新加载页面
        </button>
      </p>
    </div>
  )
}
