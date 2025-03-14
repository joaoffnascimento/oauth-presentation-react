"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface AnimatedAppearProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  glow?: boolean
}

export default function AnimatedAppear({
  children,
  className,
  delay = 0,
  direction = "up",
  glow = false,
}: AnimatedAppearProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const getTransformValue = () => {
    if (!isVisible) {
      switch (direction) {
        case "up":
          return "translate-y-8"
        case "down":
          return "-translate-y-8"
        case "left":
          return "translate-x-8"
        case "right":
          return "-translate-x-8"
        default:
          return "translate-y-8"
      }
    }
    return ""
  }

  return (
    <div
      className={cn(
        "transition-all duration-700",
        isVisible ? "opacity-100 transform-none" : `opacity-0 ${getTransformValue()}`,
        glow && isVisible && "animate-glow",
        className,
      )}
      style={
        glow && isVisible
          ? {
              boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
            }
          : {}
      }
    >
      {children}
    </div>
  )
}

if (typeof window !== "undefined") {
  const style = document.createElement("style")
  style.textContent = `
    @keyframes glow {
      0%, 100% {
        box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
      }
      50% {
        box-shadow: 0 0 20px rgba(139, 92, 246, 0.6);
      }
    }

    .animate-glow {
      animation: glow 2s ease-in-out infinite;
    }
  `
  document.head.appendChild(style)
}

