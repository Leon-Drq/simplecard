"use client"

import { useEffect, useRef } from "react"

// Update the QuoteCardProps interface to add englishFont property
interface QuoteCardProps {
  chineseText: string
  englishText: string
  signature: string
  chinesePosition: number
  englishPosition: number
  signaturePosition: number
  chineseFontSize: number
  englishFontSize: number
  signatureFontSize: number
  aspectRatio: "3:4" | "9:16"
  backgroundStyle: string
  customBackgroundImage?: string | null
  chineseFont?: string
  englishFont?: string
}

// Update the component parameters to include englishFont
export default function QuoteCard({
  chineseText,
  englishText,
  signature,
  chinesePosition = 50,
  englishPosition = 10,
  signaturePosition = 90,
  chineseFontSize = 21,
  englishFontSize = 14,
  signatureFontSize = 14,
  aspectRatio = "3:4",
  backgroundStyle = "light-green-paper",
  customBackgroundImage = null,
  chineseFont = "huiwen",
  englishFont = "segoe-script",
}: QuoteCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Add a function to get the background style based on the selection
  const getBackgroundStyle = () => {
    // Handle custom image background
    if (backgroundStyle === "custom-image" && customBackgroundImage) {
      return {
        backgroundColor: "rgba(255, 255, 255, 0)",
        backgroundImage: `url(${customBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        textColor: "text-gray-800",
        beforeBackground: "",
        overlay: true, // Add an overlay for better text readability
        overlayColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent white overlay
        backdropFilter: undefined,
        boxShadow: undefined,
        border: undefined,
        borderRadius: undefined,
      }
    }

    // Handle predefined styles
    switch (backgroundStyle) {
      case "light-green-paper":
        return {
          backgroundColor: "#e8ede7",
          backgroundImage: `
            radial-gradient(circle at center, #CBD9C8 0%, #e8ede7 70%),
            linear-gradient(to right, rgba(203, 217, 200, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(203, 217, 200, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 20px 20px, 20px 20px",
          backgroundPosition: "center, center, center",
          textColor: "text-gray-700",
          beforeBackground:
            "before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNDQkQ5QzgiIGZpbGwtb3BhY2l0eT0iMC4wMiIgZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDJjLS41NTIgMC0xIC40NDgtMSAxcy40NDggMSAxIDEgMS0uNDQ4IDEtMS0uNDQ4LTEtMS0xem0wIDM2Yy0uNTUyIDAtMSAuNDQ4LTEgMXMuNDQ4IDEgMSAxIDEtLjQ0OCAxLTEtLjQ0OC0xLTEtMXptMTgtMThjLS41NTIgMC0xIC40NDgtMSAxcy40NDggMSAxIDEgMS0uNDQ4IDEtMS0uNDQ4LTEtMS0xek0yIDIwYy0uNTUyIDAtMSAuNDQ4LTEgMXMuNDQ4IDEgMSAxIDEtLjQ0OCAxLTEtLjQ0OC0xLTEtMXoiLz48L2c+PC9zdmc+')]",
          overlay: false,
          backdropFilter: undefined,
          boxShadow: undefined,
          border: undefined,
          borderRadius: undefined,
        }
      case "minimal-white":
        return {
          backgroundColor: "#ffffff",
          backgroundImage: "none",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          textColor: "text-gray-800",
          beforeBackground: "",
          overlay: false,
          backdropFilter: undefined,
          boxShadow: undefined,
          border: undefined,
          borderRadius: undefined,
        }
      case "warm-paper":
        return {
          backgroundColor: "#f9f6f0",
          backgroundImage: `
            radial-gradient(circle at center, #f5f0e5 0%, #f9f6f0 70%),
            linear-gradient(to right, rgba(210, 200, 185, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(210, 200, 185, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 20px 20px, 20px 20px",
          backgroundPosition: "center, center, center",
          textColor: "text-gray-800",
          beforeBackground:
            "before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNlNmRiY2MiIGZpbGwtb3BhY2l0eT0iMC4wMiIgZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDJjLS41NTIgMC0xIC40NDgtMSAxcy40NDggMSAxIDEgMS0uNDQ4IDEtMS0uNDQ4LTEtMS0xem0wIDM2Yy0uNTUyIDAtMSAuNDQ4LTEgMXMuNDQ4IDEgMSAxIDEtLjQ0OCAxLTEtLjQ0OC0xLTEtMXptMTgtMThjLS41NTIgMC0xIC40NDgtMSAxcy40NDggMSAxIDEgMS0uNDQ4IDEtMS0uNDQ4LTEtMS0xek0yIDIwYy0uNTUyIDAtMSAuNDQ4LTEgMXMuNDQ4IDEgMSAxIDEtLjQ0OCAxLTEtLjQ0OC0xLTEtMXoiLz48L2c+PC9zdmc+')]",
          overlay: false,
          backdropFilter: undefined,
          boxShadow: undefined,
          border: undefined,
          borderRadius: undefined,
        }
      case "dark-elegant":
        return {
          backgroundColor: "#1a1a1a",
          backgroundImage: `
            radial-gradient(circle at center, #2a2a2a 0%, #1a1a1a 70%),
            linear-gradient(to right, rgba(60, 60, 60, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(60, 60, 60, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 20px 20px, 20px 20px",
          backgroundPosition: "center, center, center",
          textColor: "text-gray-200",
          beforeBackground:
            "before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiM0MDQwNDAiIGZpbGwtb3BhY2l0eT0iMC4wMiIgZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDJjLS41NTIgMC0xIC40NDgtMSAxcy40NDggMSAxIDEgMS0uNDQ4IDEtMS0uNDQ4LTEtMS0xem0wIDM2Yy0uNTUyIDAtMSAuNDQ4LTEgMXMuNDQ4IDEgMSAxIDEtLjQ0OCAxLTEtLjQ0OC0xLTEtMXptMTgtMThjLS41NTIgMC0xIC40NDgtMSAxcy40NDggMSAxIDEgMS0uNDQ4IDEtMS0uNDQ4LTEtMS0xek0yIDIwYy0uNTUyIDAtMSAuNDQ4LTEgMXMuNDQ4IDEgMSAxIDEtLjQ0OCAxLTEtLjQ0OC0xLTEtMXoiLz48L2c+PC9zdmc+')]",
          overlay: false,
          backdropFilter: undefined,
          boxShadow: undefined,
          border: undefined,
          borderRadius: undefined,
        }
      default:
        return {
          backgroundColor: "#e8ede7",
          backgroundImage: `
            radial-gradient(circle at center, #CBD9C8 0%, #e8ede7 70%),
            linear-gradient(to right, rgba(203, 217, 200, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(203, 217, 200, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 20px 20px, 20px 20px",
          backgroundPosition: "center, center, center",
          textColor: "text-gray-700",
          beforeBackground:
            "before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNDQkQ5QzgiIGZpbGwtb3BhY2l0eT0iMC4wMiIgZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDJjLS41NTIgMC0xIC40NDgtMSAxcy40NDggMSAxIDEgMS0uNDQ4IDEtMS0uNDQ4LTEtMS0xem0wIDM2Yy0uNTUyIDAtMSAuNDQ4LTEgMXMuNDQ4IDEgMSAxIDEtLjQ0OCAxLTEtLjQ0OC0xLTEtMXptMTgtMThjLS41NTIgMC0xIC44NDgtMSAxcy40NDggMSAxIDEgMS0uNDQ4IDEtMS0uNDQ4LTEtMS0xek0yIDIwYy0uNTUyIDAtMSAuNDQ4LTEgMXMuNDQ4IDEgMSAxIDEtLjQ0OCAxLTEtLjQ0OC0xLTEtMXoiLz48L2c+PC9zdmc+')]",
          overlay: false,
          backdropFilter: undefined,
          boxShadow: undefined,
          border: undefined,
          borderRadius: undefined,
        }
    }
  }

  // 修改 getChineseFontClass 函数，确保返回正确的类名
  const getChineseFontClass = () => {
    switch (chineseFont) {
      case "huiwen":
        return "font-huiwen"
      case "fangsong":
        return "font-fangsong"
      case "lishu":
        return "font-lishu"
      case "kaiti":
      default:
        return "font-kaiti"
    }
  }

  // Add a function to get the English font class
  const getEnglishFontClass = () => {
    switch (englishFont) {
      case "huiwen":
        return "font-huiwen"
      case "comic-sans":
        return "font-comic-sans"
      case "brush-script":
        return "font-brush-script"
      case "cursive":
        return "font-cursive"
      case "segoe-script":
      default:
        return "font-segoe-script"
    }
  }

  // Get the English font class
  const englishFontClass = getEnglishFontClass()

  // Get the background style
  const bgStyle = getBackgroundStyle()
  // Get the font class
  const fontClass = getChineseFontClass()

  useEffect(() => {
    // Set aspect ratio based on the selected option
    const updateHeight = () => {
      if (cardRef.current) {
        const width = cardRef.current.offsetWidth
        let ratio = 4 / 3 // Default 3:4 ratio

        if (aspectRatio === "9:16") {
          ratio = 16 / 9
        }

        cardRef.current.style.height = `${width * ratio}px`
      }
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [aspectRatio])

  // Replace the hardcoded englishHandwritingFont with dynamic font selection
  // Comment out or remove this line:
  // const englishHandwritingFont = "'Segoe Script', 'Bradley Hand', 'Comic Sans MS', cursive"

  // Process text to handle line breaks
  const chineseLines = chineseText.split("\n")
  const englishLines = englishText.split("\n")

  // Update the return JSX to use the dynamic background style
  return (
    <div className="w-full">
      <div
        ref={cardRef}
        style={{
          backgroundColor: bgStyle.backgroundColor,
          backgroundImage: bgStyle.backgroundImage,
          backgroundSize: bgStyle.backgroundSize,
          backgroundPosition: bgStyle.backgroundPosition,
          position: "relative",
          overflow: "hidden",
          transition: "height 0.5s ease-in-out, background-color 0.3s ease-in-out, background-image 0.3s ease-in-out",
          backdropFilter: bgStyle.backdropFilter,
          WebkitBackdropFilter: bgStyle.backdropFilter,
          boxShadow: bgStyle.boxShadow,
          border: bgStyle.border,
          borderRadius: bgStyle.borderRadius,
        }}
        className={`w-full relative p-8 ${bgStyle.beforeBackground ? "before:content-[''] before:absolute before:inset-0" : ""} ${bgStyle.beforeBackground}`}
      >
        {/* Overlay for custom background images to improve text readability */}
        {bgStyle.overlay && (
          <div className="absolute inset-0 backdrop-blur-[1px]" style={{ backgroundColor: bgStyle.overlayColor }}></div>
        )}
        <div
          className="text-left space-y-1 absolute w-full px-8 left-0 hover:scale-[1.01] transition-transform duration-300 z-10"
          style={{ top: `${englishPosition}%` }}
        >
          {englishLines.map((line, index) => (
            <p
              key={`en-${index}`}
              className={`leading-relaxed ${bgStyle.textColor} ${englishFontClass}`}
              style={{
                fontWeight: "normal",
                fontSize: `${englishFontSize}px`,
                lineHeight: window.innerWidth <= 768 ? "1.6" : "1.4",
                marginBottom: window.innerWidth <= 768 ? "4px" : "2px",
                transition: "font-size 0.3s ease, transform 0.3s ease",
                transform: `translateY(${Math.sin(index * 0.5) * 2}px)`,
              }}
            >
              {line}
            </p>
          ))}
        </div>
        {/* Chinese text as main content - 使用CSS类名确保字体正确应用 */}
        <div
          className="text-left space-y-1 absolute w-full px-8 left-0 hover:scale-[1.01] transition-transform duration-300 z-10"
          style={{ top: `${chinesePosition}%` }}
        >
          {chineseLines.map((line, index) => (
            <p
              key={`zh-${index}`}
              className={`${line.trim() === "" ? "h-6" : ""} ${bgStyle.textColor} ${fontClass}`}
              style={{
                fontWeight: "normal",
                fontSize: `${chineseFontSize}px`,
                lineHeight: window.innerWidth <= 768 ? "1.8" : "1.5",
                marginBottom: window.innerWidth <= 768 ? "6px" : "3px",
                transition: "font-size 0.3s ease, transform 0.3s ease",
                transform: `translateY(${Math.sin(index * 0.5) * 2}px)`,
              }}
            >
              {line}
            </p>
          ))}
        </div>
        <div
          className="text-right absolute w-full px-8 right-0 hover:scale-[1.02] transition-transform duration-300 z-10"
          style={{ top: `${signaturePosition}%` }}
        >
          <p
            className={`${bgStyle.textColor} ${englishFontClass}`}
            style={{
              fontWeight: "normal",
              fontSize: `${signatureFontSize}px`,
              lineHeight: window.innerWidth <= 768 ? "1.6" : "1.4",
              transition: "font-size 0.3s ease, transform 0.3s ease",
            }}
          >
            {signature}
          </p>
        </div>
      </div>
    </div>
  )
}
