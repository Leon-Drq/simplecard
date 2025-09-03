"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface UploadQuoteFormProps {
  onSubmit: (quoteData: any) => void
  onCancel: () => void
}

export default function UploadQuoteForm({ onSubmit, onCancel }: UploadQuoteFormProps) {
  const [formData, setFormData] = useState({
    chineseText: "",
    englishText: "",
    signature: "",
    backgroundColor: "#ffffff",
    textColor: "#333333",
    aspectRatio: "3:4",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      type: "quote",
      content: {
        chineseText: formData.chineseText,
        englishText: formData.englishText,
        signature: formData.signature,
      },
      backgroundColor: formData.backgroundColor,
      textColor: formData.textColor,
      aspectRatio: formData.aspectRatio,
      author: "当前用户", // In a real app, this would be the logged-in user
      likes: 0,
      downloads: 0,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">中文内容</label>
        <Textarea
          name="chineseText"
          value={formData.chineseText}
          onChange={handleChange}
          placeholder="输入中文文本，使用回车键换行"
          rows={4}
          required
          className="resize-none rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">英文内容</label>
        <Textarea
          name="englishText"
          value={formData.englishText}
          onChange={handleChange}
          placeholder="输入英文文本，使用回车键换行"
          rows={3}
          className="resize-none rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">签名</label>
        <Input
          name="signature"
          value={formData.signature}
          onChange={handleChange}
          placeholder="输入您的签名"
          className="rounded-lg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">背景颜色</label>
          <div className="flex items-center">
            <Input
              type="color"
              name="backgroundColor"
              value={formData.backgroundColor}
              onChange={handleChange}
              className="w-10 h-10 p-1 rounded mr-2"
            />
            <Input
              type="text"
              name="backgroundColor"
              value={formData.backgroundColor}
              onChange={handleChange}
              className="rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">文字颜色</label>
          <div className="flex items-center">
            <Input
              type="color"
              name="textColor"
              value={formData.textColor}
              onChange={handleChange}
              className="w-10 h-10 p-1 rounded mr-2"
            />
            <Input
              type="text"
              name="textColor"
              value={formData.textColor}
              onChange={handleChange}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">卡片比例</label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, aspectRatio: "3:4" }))}
            className={`flex-1 py-2 px-3 rounded-lg border transition-all duration-300 ${
              formData.aspectRatio === "3:4" ? "border-gray-400 bg-gray-50" : "border-gray-200"
            }`}
          >
            3:4
          </button>
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, aspectRatio: "1:1" }))}
            className={`flex-1 py-2 px-3 rounded-lg border transition-all duration-300 ${
              formData.aspectRatio === "1:1" ? "border-gray-400 bg-gray-50" : "border-gray-200"
            }`}
          >
            1:1
          </button>
          <button
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, aspectRatio: "9:16" }))}
            className={`flex-1 py-2 px-3 rounded-lg border transition-all duration-300 ${
              formData.aspectRatio === "9:16" ? "border-gray-400 bg-gray-50" : "border-gray-200"
            }`}
          >
            9:16
          </button>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          取消
        </Button>
        <Button type="submit">上传作品</Button>
      </div>
    </form>
  )
}
