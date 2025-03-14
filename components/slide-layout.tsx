"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, Home, Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const TOTAL_SLIDES = 7

interface SlideLayoutProps {
  children: React.ReactNode
  currentSlide: number
  className?: string
}

export default function SlideLayout({ children, currentSlide, className }: SlideLayoutProps) {
  const router = useRouter()
  const [isAnimating, setIsAnimating] = useState(false)

  const goToNextSlide = () => {
    if (currentSlide < TOTAL_SLIDES) {
      setIsAnimating(true)
      setTimeout(() => {
        router.push(`/slides/${currentSlide + 1}`)
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
      <header className="flex items-center justify-between border-b border-slate-700 bg-slate-900/50 px-4 py-2">
        <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-white">
          <Home size={20} />
          <span className="font-medium">Início</span>
        </Link>

        <div className="text-center text-sm font-medium text-slate-400">
          Slide {currentSlide} de {TOTAL_SLIDES}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu de navegação</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => router.push("/slides/1")}>1. Introdução</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push("/slides/2")}>2. Fundamentos do OAuth2</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push("/slides/3")}>3. OpenID Connect (OIDC)</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push("/slides/4")}>4. Modelos de Aplicação</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push("/slides/5")}>5. Tokens e Validação</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push("/slides/6")}>6. Casos Práticos</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push("/slides/7")}>7. Conclusão</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <main
        className={cn("flex-1 transition-opacity duration-300", isAnimating ? "opacity-0" : "opacity-100", className)}
      >
        {children}
      </main>

      <footer className="flex items-center justify-between border-t border-slate-700 bg-slate-900/50 px-4 py-3">
        <Button
          variant="outline"
          onClick={goToPrevSlide}
          disabled={currentSlide === 1}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Anterior
        </Button>

        <Button
          variant="outline"
          onClick={goToNextSlide}
          disabled={currentSlide === TOTAL_SLIDES}
          className="flex items-center gap-2"
        >
          Próximo
          <ArrowRight size={16} />
        </Button>
      </footer>
    </div>
  )
}

