"use client"

import { useEffect, useState, useRef } from "react"
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
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Map<string, DOMRect>>(new Map())

  // Função para obter a posição de um nó
  const getNodePosition = (id: string) => {
    const container = containerRef.current
    if (!container) return null

    const node = container.querySelector(`[data-id="${id}"]`) as HTMLElement
    if (!node) return null

    const rect = node.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    return {
      x: rect.left - containerRect.left + rect.width / 2,
      y: rect.top - containerRect.top + rect.height / 2,
      width: rect.width,
      height: rect.height,
    }
  }

  // Função para calcular o caminho da seta entre dois nós
  const calculatePath = (fromId: string, toId: string) => {
    const fromPos = getNodePosition(fromId)
    const toPos = getNodePosition(toId)

    if (!fromPos || !toPos) return ""

    // Determinar a direção da seta
    const isHorizontal = Math.abs(fromPos.x - toPos.x) > Math.abs(fromPos.y - toPos.y)

    let startX, startY, endX, endY

    if (isHorizontal) {
      // Conexão horizontal
      startX = fromPos.x + (fromPos.x < toPos.x ? fromPos.width / 2 : -fromPos.width / 2)
      startY = fromPos.y
      endX = toPos.x + (toPos.x < fromPos.x ? toPos.width / 2 : -fromPos.width / 2)
      endY = toPos.y
    } else {
      // Conexão vertical
      startX = fromPos.x
      startY = fromPos.y + (fromPos.y < toPos.y ? fromPos.height / 2 : -fromPos.height / 2)
      endX = toPos.x
      endY = toPos.y + (toPos.y < fromPos.y ? toPos.height / 2 : -fromPos.height / 2)
    }

    // Calcular pontos de controle para a curva
    const dx = Math.abs(endX - startX) * 0.5
    const dy = Math.abs(endY - startY) * 0.5

    const controlX1 = startX + (isHorizontal ? dx : 0)
    const controlY1 = startY + (isHorizontal ? 0 : dy)
    const controlX2 = endX - (isHorizontal ? dx : 0)
    const controlY2 = endY - (isHorizontal ? 0 : dy)

    return `M ${startX},${startY} C ${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`
  }

  // Atualizar as posições das setas quando os nós estiverem ativos
  useEffect(() => {
    if (activeSteps.length === steps.length) {
      const connections: string[] = []

      steps.forEach((step) => {
        if (step.connectTo) {
          step.connectTo.forEach((targetId) => {
            connections.push(`${step.id}-${targetId}`)
          })
        }
      })

      // Animar as conexões aparecendo
      let connectionIndex = 0
      const connectionInterval = setInterval(() => {
        if (connectionIndex < connections.length) {
          setActiveConnections((prev) => [...prev, connections[connectionIndex]])
          connectionIndex++
        } else {
          clearInterval(connectionInterval)
        }
      }, 300)

      return () => clearInterval(connectionInterval)
    }
  }, [activeSteps, steps])

  // Animar os nós aparecendo
  useEffect(() => {
    const stepIds = steps.map((step) => step.id)

    const stepTimer = setTimeout(() => {
      let currentIndex = 0

      const intervalId = setInterval(() => {
        if (currentIndex < stepIds.length) {
          setActiveSteps((prev) => [...prev, stepIds[currentIndex]])
          currentIndex++
        } else {
          clearInterval(intervalId)
        }
      }, 300)
    }, animationDelay)

    return () => clearTimeout(stepTimer)
  }, [steps, animationDelay])

  // Atualizar as posições quando a janela for redimensionada
  useEffect(() => {
    const handleResize = () => {
      // Forçar recálculo das posições
      setActiveConnections([])
      setTimeout(() => {
        const connections: string[] = []
        steps.forEach((step) => {
          if (step.connectTo) {
            step.connectTo.forEach((targetId) => {
              connections.push(`${step.id}-${targetId}`)
            })
          }
        })
        setActiveConnections(connections)
      }, 100)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [steps])

  return (
    <div className={cn("relative p-4", className)} ref={containerRef}>
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

        {/* Renderizar SVG com as conexões */}
        <svg className="absolute inset-0 h-full w-full" style={{ zIndex: -1 }}>
          {activeSteps.length === steps.length &&
            steps.map((step) => {
              if (!step.connectTo) return null

              return step.connectTo.map((targetId) => {
                const connectionId = `${step.id}-${targetId}`
                const isActive = activeConnections.includes(connectionId)
                const path = calculatePath(step.id, targetId)

                return (
                  <g key={connectionId} className="connection-group">
                    {/* Linha da seta */}
                    <path
                      d={path}
                      stroke={isActive ? "#3b82f6" : "transparent"}
                      strokeWidth={2}
                      fill="none"
                      strokeDasharray="5,5"
                      className={cn("transition-all duration-500", isActive && "animate-dash")}
                      data-connection={connectionId}
                    />

                    {/* Ponta da seta (triângulo) */}
                    {isActive && path && (
                      <path
                        d="M 0,-4 L 8,0 L 0,4 Z"
                        fill="#3b82f6"
                        className="animate-pulse"
                        transform={`translate(${path.split(" ").pop()}) rotate(0)`}
                      />
                    )}
                  </g>
                )
              })
            })}
        </svg>
      </div>
    </div>
  )
}

// Adicionar estilos para animação das setas
if (typeof window !== "undefined") {
  const style = document.createElement("style")
  style.textContent = `
    @keyframes dash {
      from {
        stroke-dashoffset: 40;
      }
      to {
        stroke-dashoffset: 0;
      }
    }
    
    .animate-dash {
      animation: dash 1.5s linear infinite;
    }
  `
  document.head.appendChild(style)
}

