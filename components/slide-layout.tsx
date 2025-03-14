"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, Home, Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import ParticleBackground from "./particle-background"

const TOTAL_SLIDES = 7

interface SlideLayoutProps {
  children: React.ReactNode
  currentSlide: number
  className?: string
}

export default function SlideLayout({ children, currentSlide, className }: SlideLayoutProps) {
  const router = useRouter()
  const [isAnimating, setIsAnimating] = useState(false)
  const [xpGained, setXpGained] = useState(0)

  const goToNextSlide = () => {
    if (currentSlide < TOTAL_SLIDES) {
      setIsAnimating(true)
      setTimeout(() => {
        router.push(`/slides/${currentSlide + 1}`)
        setXpGained((prev) => prev + Math.floor(Math.random() * 50) + 50)
      }, 300)
    }
  }

  const goToPrevSlide = () => {
    if (currentSlide > 1) {
      setIsAnimating(true)
      setTimeout(() => {
        router.push(`/slides/${currentSlide - 1}`)
      }, 300)
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNextSlide()
      } else if (e.key === "ArrowLeft") {
        goToPrevSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide])

  useEffect(() => {
    setIsAnimating(false)
  }, [currentSlide])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <ParticleBackground />

      <header className="status-bar flex items-center justify-between border-b border-purple-500/30 bg-slate-900/80 px-4 py-3 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white">
          <Home size={20} />
          <span className="font-medium">Início</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-slate-800/50 px-3 py-1 text-sm font-medium text-purple-400">
            <span>XP</span>
            <span className="text-white">{xpGained}</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-slate-800/50 px-3 py-1 text-sm font-medium text-blue-400">
            <span>Progresso</span>
            <span className="text-white">{Math.round((currentSlide / TOTAL_SLIDES) * 100)}%</span>
          </div>

          <div className="text-center text-sm font-medium text-slate-400">
            Slide <span className="text-white">{currentSlide}</span> de{" "}
            <span className="text-white">{TOTAL_SLIDES}</span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-slate-300 hover:bg-slate-800 hover:text-white">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu de navegação</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-purple-500/30 bg-slate-900/95 backdrop-blur-sm">
            <DropdownMenuItem onSelect={() => router.push("/slides/1")} className="hover:bg-slate-800">
              <div className="mr-2 h-2 w-2 rounded-full bg-purple-500"></div>
              1. Introdução
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push("/slides/2")} className="hover:bg-slate-800">
              <div className="mr-2 h-2 w-2 rounded-full bg-purple-500"></div>
              2. Fundamentos do OAuth2
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push("/slides/3")} className="hover:bg-slate-800">
              <div className="mr-2 h-2 w-2 rounded-full bg-purple-500"></div>
              3. OpenID Connect (OIDC)
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push("/slides/4")} className="hover:bg-slate-800">
              <div className="mr-2 h-2 w-2 rounded-full bg-purple-500"></div>
              4. Modelos de Aplicação
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push("/slides/5")} className="hover:bg-slate-800">
              <div className="mr-2 h-2 w-2 rounded-full bg-purple-500"></div>
              5. Tokens e Validação
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push("/slides/6")} className="hover:bg-slate-800">
              <div className="mr-2 h-2 w-2 rounded-full bg-purple-500"></div>
              6. Casos Práticos
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push("/slides/7")} className="hover:bg-slate-800">
              <div className="mr-2 h-2 w-2 rounded-full bg-purple-500"></div>
              7. Conclusão
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main
        className={cn("flex-1 transition-opacity duration-300", isAnimating ? "opacity-0" : "opacity-100", className)}
      >
        {children}
      </main>

      <footer className="status-bar flex items-center justify-between border-t border-purple-500/30 bg-slate-900/80 px-4 py-3 backdrop-blur-sm">
        <Button
          variant="outline"
          onClick={goToPrevSlide}
          disabled={currentSlide === 1}
          className="game-button flex items-center gap-2 border-purple-500/30 bg-slate-800/50 text-white hover:bg-slate-700/50"
        >
          <ArrowLeft size={16} />
          Anterior
        </Button>

        <div className="h-2 w-48 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
            style={{ width: `${(currentSlide / TOTAL_SLIDES) * 100}%` }}
          ></div>
        </div>

        <Button
          variant="outline"
          onClick={goToNextSlide}
          disabled={currentSlide === TOTAL_SLIDES}
          className="game-button flex items-center gap-2 border-purple-500/30 bg-slate-800/50 text-white hover:bg-slate-700/50"
        >
          Próximo
          <ArrowRight size={16} />
        </Button>
      </footer>
    </div>
  )
}

