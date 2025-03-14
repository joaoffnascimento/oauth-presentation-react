"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Lock, Mail, Shield, Check } from "lucide-react"
import ParticleBackground from "@/components/particle-background"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [stage, setStage] = useState<"login" | "redirect" | "consent" | "callback">("login")
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [authCode, setAuthCode] = useState("")
  const characterRef = useRef<HTMLDivElement>(null)

  // Gerar um código de autorização aleatório
  useEffect(() => {
    const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setAuthCode(code)
  }, [])

  // Rastrear posição do mouse para os olhos seguirem
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (characterRef.current) {
        const rect = characterRef.current.getBoundingClientRect()
        const x = e.clientX - (rect.left + rect.width / 2)
        const y = e.clientY - (rect.top + rect.height / 2)
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Simular o fluxo OAuth 2.0
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) return

    setIsLoading(true)

    // Simular redirecionamento para servidor de autorização
    setTimeout(() => {
      setStage("redirect")
      setProgress(25)

      // Simular carregamento da página de consentimento
      setTimeout(() => {
        setStage("consent")
        setProgress(50)
        setIsLoading(false)
      }, 1500)
    }, 1000)
  }

  const handleConsent = () => {
    setIsLoading(true)

    // Simular redirecionamento de volta com código de autorização
    setTimeout(() => {
      setStage("callback")
      setProgress(75)

      // Simular troca de código por tokens
      setTimeout(() => {
        setProgress(100)

        // Redirecionar para a página inicial
        setTimeout(() => {
          router.push("/")
        }, 1000)
      }, 1500)
    }, 1000)
  }

  // Calcular a rotação dos olhos com base na posição do mouse
  const calculateEyeRotation = () => {
    if (isPasswordFocused) return { x: 0, y: 0, closed: true }

    const maxRotation = 20
    const x = Math.max(-maxRotation, Math.min(maxRotation, mousePosition.x / 20))
    const y = Math.max(-maxRotation, Math.min(maxRotation, mousePosition.y / 20))

    return { x, y, closed: false }
  }

  const eyeRotation = calculateEyeRotation()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <ParticleBackground />

      <div className="w-full max-w-md">
        {/* Barra de progresso do fluxo OAuth */}
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2",
                progress >= 25 ? "border-purple-500 bg-purple-500/20" : "border-slate-600 bg-slate-800",
              )}
            >
              <Lock size={18} className={progress >= 25 ? "text-purple-400" : "text-slate-500"} />
            </div>
            <span className="mt-2 text-xs font-medium">Login</span>
          </div>

          <div className="h-1 flex-1 bg-slate-700 mx-2">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
              style={{ width: `${Math.max(0, progress - 25)}%` }}
            />
          </div>

          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2",
                progress >= 50 ? "border-purple-500 bg-purple-500/20" : "border-slate-600 bg-slate-800",
              )}
            >
              <Shield size={18} className={progress >= 50 ? "text-purple-400" : "text-slate-500"} />
            </div>
            <span className="mt-2 text-xs font-medium">Autorização</span>
          </div>

          <div className="h-1 flex-1 bg-slate-700 mx-2">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
              style={{ width: `${Math.max(0, progress - 50)}%` }}
            />
          </div>

          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2",
                progress >= 100 ? "border-purple-500 bg-purple-500/20" : "border-slate-600 bg-slate-800",
              )}
            >
              <Check size={18} className={progress >= 100 ? "text-purple-400" : "text-slate-500"} />
            </div>
            <span className="mt-2 text-xs font-medium">Concluído</span>
          </div>
        </div>

        {/* Personagem Sung Jin-woo */}
        <div
          ref={characterRef}
          className="relative mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-purple-500/50 bg-slate-900 shadow-lg shadow-purple-500/20"
        >
          {/* Rosto */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900">
            {/* Olhos */}
            <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-8">
              {/* Olho esquerdo */}
              <div className="relative h-8 w-6 overflow-hidden rounded-full bg-white">
                {eyeRotation.closed ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-px w-full bg-slate-800"></div>
                  </div>
                ) : (
                  <div
                    className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 transition-all duration-100"
                    style={{
                      transform: `translate(calc(-50% + ${eyeRotation.x}px), calc(-50% + ${eyeRotation.y}px))`,
                    }}
                  >
                    <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"></div>
                    <div className="absolute left-1/4 top-1/4 h-1 w-1 rounded-full bg-white"></div>
                  </div>
                )}
              </div>

              {/* Olho direito */}
              <div className="relative h-8 w-6 overflow-hidden rounded-full bg-white">
                {eyeRotation.closed ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-px w-full bg-slate-800"></div>
                  </div>
                ) : (
                  <div
                    className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 transition-all duration-100"
                    style={{
                      transform: `translate(calc(-50% + ${eyeRotation.x}px), calc(-50% + ${eyeRotation.y}px))`,
                    }}
                  >
                    <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"></div>
                    <div className="absolute left-1/4 top-1/4 h-1 w-1 rounded-full bg-white"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Boca */}
            <div className="absolute bottom-1/4 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-slate-700"></div>
          </div>

          {/* Efeito de brilho */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/0 via-purple-500/0 to-purple-500/20"></div>
        </div>

        {/* Conteúdo baseado no estágio atual */}
        <div className="rounded-lg border border-purple-500/30 bg-slate-900/80 p-6 backdrop-blur-sm">
          {stage === "login" && (
            <>
              <h1 className="mb-6 text-center text-2xl font-bold text-white">
                <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                  OAuth2 Login
                </span>
              </h1>

              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      className="border-slate-700 bg-slate-800 pl-10 text-white placeholder:text-slate-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-slate-300">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="border-slate-700 bg-slate-800 pl-10 text-white placeholder:text-slate-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Entrando...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Entrar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-4 text-center text-xs text-slate-400">
                Ao entrar, você será redirecionado para autorizar o acesso
              </div>
            </>
          )}

          {stage === "redirect" && (
            <div className="py-8 text-center">
              <div className="mb-4 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-400">
                Redirecionando...
              </div>
              <h2 className="mb-2 text-xl font-bold text-white">Servidor de Autorização</h2>
              <p className="mb-4 text-slate-300">Você está sendo redirecionado para o servidor de autorização</p>
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>
              <div className="mt-4 text-xs text-slate-400">oauth-server.example.com</div>
            </div>
          )}

          {stage === "consent" && (
            <>
              <div className="mb-4 text-center">
                <div className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-sm font-medium text-blue-400">
                  Servidor de Autorização
                </div>
              </div>

              <h2 className="mb-6 text-center text-xl font-bold text-white">Autorizar Acesso</h2>

              <div className="mb-6 rounded-lg border border-slate-700 bg-slate-800 p-4">
                <div className="mb-2 text-sm font-medium text-slate-300">
                  <span className="text-purple-400">OAuth2 Presentation</span> solicita acesso a:
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                    Ler suas informações básicas
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                    Visualizar seu endereço de email
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                    Acessar a apresentação
                  </li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Recusar
                </Button>

                <Button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600"
                  onClick={handleConsent}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Processando...
                    </div>
                  ) : (
                    "Autorizar"
                  )}
                </Button>
              </div>
            </>
          )}

          {stage === "callback" && (
            <div className="py-8 text-center">
              <div className="mb-4 inline-block rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1 text-sm font-medium text-green-400">
                Autorizado com Sucesso
              </div>
              <h2 className="mb-2 text-xl font-bold text-white">Processando Autenticação</h2>
              <p className="mb-4 text-slate-300">Trocando código de autorização por tokens de acesso</p>

              <div className="mb-4 overflow-hidden rounded bg-slate-800 p-2 text-xs font-mono">
                <div className="text-left text-slate-400">
                  <span className="text-green-400">GET</span> /callback?code={authCode.substring(0, 12)}...
                </div>
              </div>

              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></div>

              <div className="mt-4 text-xs text-slate-400">Você será redirecionado em breve...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

