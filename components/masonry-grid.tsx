"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"

interface MasonryGridProps {
  children: React.ReactNode[]
  columns?: number
  gap?: number
}

export default function MasonryGrid({ children, columns = 3, gap = 24 }: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [columnCount, setColumnCount] = useState(columns)
  const [layout, setLayout] = useState<React.ReactNode[][]>([])

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

      // Initialize columns
      const columnHeights = Array(cols).fill(0)
      const columnElements: React.ReactNode[][] = Array(cols)
        .fill(null)
        .map(() => [])

      // Place each child in the column with the shortest height
      React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return

        // Find the column with the shortest height
        const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights))

        // Add the child to that column
        columnElements[shortestColumn].push(child)

        // Update the column height (approximate using a fixed height per item)
        // In a real implementation, you'd want to measure the actual rendered height
        columnHeights[shortestColumn] += 1
      })

      setLayout(columnElements)
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [children, columns])

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
      {layout.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-col gap-6">
          {column.map((item, itemIndex) => (
            <div key={itemIndex}>{item}</div>
          ))}
        </div>
      ))}
    </div>
  )
}
