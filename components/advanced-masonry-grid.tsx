"use client"

import React from "react"

import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"

interface AdvancedMasonryGridProps {
  children: ReactNode[]
  columns?: number
  gap?: number
}

export default function AdvancedMasonryGrid({ children, columns = 3, gap = 24 }: AdvancedMasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [columnCount, setColumnCount] = useState(columns)
  const [items, setItems] = useState<ReactNode[]>([])

  useEffect(() => {
    setItems(React.Children.toArray(children))
  }, [children])

  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      let cols = columns

      // Responsive column count
      if (containerWidth < 640) {
        cols = 1
      } else if (containerWidth < 1024) {
        cols = 2
      }

      setColumnCount(cols)
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [columns])

  // 计算每个项目应该在哪一列
  const getItemColumn = (index: number) => {
    return index % columnCount
  }

  // 计算每列的项目
  const getColumnItems = (colIndex: number) => {
    return items.filter((_, index) => getItemColumn(index) === colIndex)
  }

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gap: `${gap}px`,
      }}
    >
      {Array.from({ length: columnCount }).map((_, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-6">
          {getColumnItems(colIndex).map((item, itemIndex) => (
            <div key={itemIndex}>{item}</div>
          ))}
        </div>
      ))}
    </div>
  )
}
