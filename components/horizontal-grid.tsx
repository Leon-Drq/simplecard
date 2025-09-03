"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface HorizontalGridProps {
  children: React.ReactNode[]
  gap?: number
  minItemWidth?: number
}

export default function HorizontalGrid({ children, gap = 24, minItemWidth = 280 }: HorizontalGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [columns, setColumns] = useState(3)

  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return
      const containerWidth = containerRef.current.offsetWidth
      const columnsCount = Math.max(1, Math.floor((containerWidth + gap) / (minItemWidth + gap)))
      setColumns(columnsCount)
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [gap, minItemWidth])

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${gap}px`,
      }}
    >
      {children}
    </div>
  )
}
