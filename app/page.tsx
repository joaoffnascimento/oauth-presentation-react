import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ParticleBackground from "@/components/particle-background"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-6 inline-block rounded-lg border border-purple-500/30 bg-slate-900/50 px-4 py-2 text-sm font-medium text-purple-400 shadow-lg shadow-purple-500/10">
          QUEST INICIADA: ENTENDENDO AUTENTICAÇÃO MODERNA
        </div>

        <h1 className="mb-6 text-5xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            OAuth2 & OpenID Connect
          </span>
        </h1>

        <div className="mx-auto mb-4 h-1 w-24 rounded bg-gradient-to-r from-purple-500 to-blue-500"></div>

        <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-300">
          Uma jornada pelos protocolos modernos de autorização e autenticação
        </p>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-slate-900/50 px-4 py-2 text-sm text-blue-400">
            <span className="h-2 w-2 rounded-full bg-blue-400"></span>
            Nível de Dificuldade: Intermediário
          </div>

          <div className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-slate-900/50 px-4 py-2 text-sm text-purple-400">
            <span className="h-2 w-2 rounded-full bg-purple-400"></span>
            XP Ganho: +500
          </div>

          <div className="flex items-center gap-2 rounded-full border border-indigo-500/30 bg-slate-900/50 px-4 py-2 text-sm text-indigo-400">
            <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
            Tempo Estimado: 30 min
          </div>
        </div>

        <Link
          href="/slides/1"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 px-8 py-4 text-lg font-medium text-white transition-all hover:shadow-lg hover:shadow-purple-500/25"
        >
          <span className="relative z-10">Iniciar Apresentação</span>
          <ArrowRight className="relative z-10 transition-transform group-hover:translate-x-1" />
          <span className="absolute inset-0 z-0 bg-gradient-to-br from-purple-700 to-blue-600 opacity-0 transition-opacity group-hover:opacity-100"></span>
        </Link>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {["Autorização", "Autenticação", "Segurança"].map((skill, index) => (
            <div key={index} className="game-card rounded-lg p-4">
              <div className="mb-2 text-sm font-medium text-slate-400">HABILIDADE</div>
              <div className="mb-2 text-xl font-bold text-white">{skill}</div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                  style={{ width: `${70 + index * 10}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

