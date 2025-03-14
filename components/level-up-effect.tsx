"use client"

import { useEffect, useState } from "react"

interface LevelUpEffectProps {
  tier: string
  isVisible: boolean
  onClose: () => void
}

export default function LevelUpEffect({ tier, isVisible, onClose }: LevelUpEffectProps) {
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; size: number; color: string; speed: number }>
  >([])
  const [isClosing, setIsClosing] = useState(false)

  // Reiniciar partículas quando o componente se torna visível
  useEffect(() => {
    if (isVisible) {
      setIsClosing(false)

      // Criar partículas para o efeito
      const newParticles = []
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          x: 50 + Math.random() * 200,
          y: 50 + Math.random() * 100,
          size: 3 + Math.random() * 7,
          color: getRandomColor(),
          speed: 1 + Math.random() * 3,
        })
      }
      setParticles(newParticles)
    }
  }, [isVisible])

  function getRandomColor() {
    const colors = ["#fcd34d", "#f59e0b", "#d97706", "#f43f5e", "#8b5cf6"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Função para fechar com animação
  const handleClose = () => {
    setIsClosing(true)

    // Aguardar a animação de saída antes de chamar onClose
    setTimeout(() => {
      onClose()
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/70 transition-opacity duration-300",
        isClosing ? "opacity-0" : "opacity-100",
      )}
      onClick={handleClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {/* Botão X para fechar */}
        <button
          onClick={handleClose}
          className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
          aria-label="Fechar"
        >
          ✕
        </button>

        {/* Partículas */}
        <div className="absolute inset-0">
          {particles.map((particle, index) => (
            <div
              key={index}
              className="absolute animate-float rounded-full"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                animationDuration: `${1 + particle.speed}s`,
              }}
            />
          ))}
        </div>

        {/* Conteúdo */}
        <div
          className={cn(
            "animate-bounce rounded-lg bg-gradient-to-br from-yellow-400 to-amber-600 p-1 transition-transform duration-300",
            isClosing ? "scale-95" : "scale-100",
          )}
        >
          <div className="rounded bg-slate-900 px-8 py-6 text-center">
            <div className="mb-4 text-2xl font-bold text-yellow-400">LEVEL UP!</div>
            <div className="mb-6 text-4xl font-extrabold text-white">Tier {tier} Alcançado!</div>
            <div className="text-sm text-slate-300">Novas habilidades desbloqueadas</div>
            <div className="mt-4 text-xs text-slate-400">Clique em qualquer lugar para fechar</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Função de utilidade para combinar classes
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

// Adicione isso ao seu CSS global
const style = document.createElement("style")
style.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) rotate(360deg);
      opacity: 0;
    }
  }
  
  .animate-float {
    animation: float 2s ease-out forwards;
  }
`
document.head.appendChild(style)

