"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface FlowStep {
  id: string
  label: string
  description?: string
  position: "left" | "right" | "center"
  connectTo?: string[]
}

interface FlowDiagramProps {
  steps: FlowStep[]
  className?: string
  animationDelay?: number
}

export default function FlowDiagram({ steps, className, animationDelay = 500 }: FlowDiagramProps) {
  const [activeSteps, setActiveSteps] = useState<string[]>([])
  const [activeConnections, setActiveConnections] = useState<string[]>([])

  useEffect(() => {
    const stepIds = steps.map((step) => step.id)
    const connections: string[] = []

    steps.forEach((step) => {
      if (step.connectTo) {
        step.connectTo.forEach((targetId) => {
          connections.push(`${step.id}-${targetId}`)
        })
      }
    })

    // Animate steps appearing
    const stepTimer = setTimeout(() => {
      let currentIndex = 0

      const intervalId = setInterval(() => {
        if (currentIndex < stepIds.length) {
          setActiveSteps((prev) => [...prev, stepIds[currentIndex]])
          currentIndex++
        } else {
          clearInterval(intervalId)

          // After all steps appear, animate connections
          let connectionIndex = 0
          const connectionInterval = setInterval(() => {
            if (connectionIndex < connections.length) {
              setActiveConnections((prev) => [...prev, connections[connectionIndex]])
              connectionIndex++
            } else {
              clearInterval(connectionInterval)
            }
          }, 300)
        }
      }, 300)
    }, animationDelay)

    return () => {
      clearTimeout(stepTimer)
    }
  }, [steps, animationDelay])

  return (
    <div className={cn("relative p-4", className)}>
      <div className="relative mx-auto min-h-[300px]">
        {steps.map((step) => {
          const isActive = activeSteps.includes(step.id)

          let positionClass = "left-1/2 -translate-x-1/2"
          if (step.position === "left") positionClass = "left-0"
          if (step.position === "right") positionClass = "right-0"

          return (
            <div
              key={step.id}
              className={cn(
                "absolute w-48 rounded-lg border border-blue-500 bg-slate-800 p-3 text-center transition-all duration-500",
                positionClass,
                isActive ? "opacity-100 scale-100" : "opacity-0 scale-95",
                {
                  "top-0": step.id === "resource-owner" || step.id === "resource-server",
                  "top-1/3": step.id === "client",
                  "top-2/3": step.id === "auth-server",
                  "top-1/4": step.id === "user" || step.id === "id-token",
                  "top-1/2": step.id === "access-token" || step.id === "refresh-token",
                  "top-3/4": step.id === "protected-resource",
                },
              )}
              data-id={step.id}
            >
              <div className="font-medium text-blue-400">{step.label}</div>
              {step.description && <div className="mt-1 text-xs text-slate-300">{step.description}</div>}
            </div>
          )
        })}

        {/* Render SVG connections */}
        <svg className="absolute inset-0 h-full w-full" style={{ zIndex: -1 }}>
          {steps.map((step) => {
            if (!step.connectTo) return null

            return step.connectTo.map((targetId) => {
              const connectionId = `${step.id}-${targetId}`
              const isActive = activeConnections.includes(connectionId)

              // This is a simplified approach - in a real app you'd calculate
              // actual positions based on element positions
              return (
                <path
                  key={connectionId}
                  d={`M 100,100 C 150,150 200,150 250,100`}
                  stroke={isActive ? "#3b82f6" : "transparent"}
                  strokeWidth={2}
                  fill="none"
                  strokeDasharray="5,5"
                  className="transition-all duration-500"
                  data-connection={connectionId}
                />
              )
            })
          })}
        </svg>
      </div>
    </div>
  )
}

