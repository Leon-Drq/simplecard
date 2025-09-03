"use client"

import { useEffect, useRef } from "react"

export default function QuoteCard() {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ensure 3:4 aspect ratio
    const updateHeight = () => {
      if (cardRef.current) {
        const width = cardRef.current.offsetWidth
        cardRef.current.style.height = `${width * (4 / 3)}px`
      }
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  // Handwriting-style system fonts
  const englishHandwritingFont = "'Segoe Script', 'Bradley Hand', 'Comic Sans MS', cursive"
  // Chinese brush/handwriting fonts
  const chineseHandwritingFont = "'Kaiti', '楷体', 'STKaiti', 'Xingkai', '行楷', 'FangSong', '仿宋', serif"

  return (
    <div className="flex justify-center items-center p-4 w-full max-w-md mx-auto">
      <div
        ref={cardRef}
        style={{
          background: "radial-gradient(circle at center, #CBD9C8 0%, #e8ede7 70%)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
          backgroundImage: `
    radial-gradient(circle at center, #CBD9C8 0%, #e8ede7 70%),
    linear-gradient(to right, rgba(203, 217, 200, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(203, 217, 200, 0.05) 1px, transparent 1px)
  `,
          backgroundSize: "100% 100%, 20px 20px, 20px 20px",
          position: "relative",
          overflow: "hidden",
        }}
        className="w-full relative flex flex-col justify-between p-8 before:content-[''] before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNDQkQ5QzgiIGZpbGwtb3BhY2l0eT0iMC4wMiIgZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDJjLS41NTIgMC0xIC40NDgtMSAxcy40NDggMSAxIDEgMS0uNDQ4IDEtMS0uNDQ4LTEtMS0xem0wIDM2Yy0uNTUyIDAtMSAuNDQ4LTEgMXMuNDQ4IDEgMSAxIDEtLjQ0OCAxLTEtLjQ0OC0xLTEtMXptMTgtMThjLS41NTIgMC0xIC40NDgtMSAxcy40NDggMSAxIDEgMS0uNDQ4IDEtMS0uNDQ4LTEtMS0xek0yIDIwYy0uNTUyIDAtMSAuNDQ4LTEgMXMuNDQ4IDEgMSAxIDEtLjQ0OCAxLTEtLjQ0OC0xLTEtMXoiLz48L2c+PC9zdmc+')]"
      >
        {/* English translation at the top in smaller font */}
        <div className="text-left space-y-1 mb-8">
          <p
            className="text-sm leading-relaxed text-gray-700"
            style={{ fontFamily: englishHandwritingFont, fontWeight: "normal" }}
          >
            Fortune exists at the point of contact
          </p>
          <p
            className="text-sm leading-relaxed text-gray-700"
            style={{ fontFamily: englishHandwritingFont, fontWeight: "normal" }}
          >
            The amount of luck in your life
          </p>
          <p
            className="text-sm leading-relaxed text-gray-700"
            style={{ fontFamily: englishHandwritingFont, fontWeight: "normal" }}
          >
            Is equal to the value you've created
          </p>
          <p
            className="text-sm leading-relaxed text-gray-700"
            style={{ fontFamily: englishHandwritingFont, fontWeight: "normal" }}
          >
            Multiplied by how many people you've told about it
          </p>
        </div>

        {/* Chinese text as main content */}
        <div className="text-left space-y-12">
          <div className="space-y-1">
            <p className="text-xl leading-relaxed" style={{ fontFamily: chineseHandwritingFont, fontWeight: "normal" }}>
              运气是存在接触面的
            </p>
            <p className="text-xl leading-relaxed" style={{ fontFamily: chineseHandwritingFont, fontWeight: "normal" }}>
              你一生中拥有多少运气
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xl leading-relaxed" style={{ fontFamily: chineseHandwritingFont, fontWeight: "normal" }}>
              就等于
            </p>
            <p className="text-xl leading-relaxed" style={{ fontFamily: chineseHandwritingFont, fontWeight: "normal" }}>
              你创造了多少价值
            </p>
            <p className="text-xl leading-relaxed" style={{ fontFamily: chineseHandwritingFont, fontWeight: "normal" }}>
              乘以你告诉了多少人
            </p>
          </div>
        </div>

        {/* Signature at the bottom */}
        <div className="text-right mt-8">
          <p className="text-sm text-gray-700" style={{ fontFamily: englishHandwritingFont, fontWeight: "normal" }}>
            — ForYouByCookie
          </p>
        </div>
      </div>
    </div>
  )
}
