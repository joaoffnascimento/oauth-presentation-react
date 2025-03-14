import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            OAuth2 & OpenID Connect
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-300">
          Uma jornada pelos protocolos modernos de autorização e autenticação
        </p>

        <Link
          href="/slides/1"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-lg font-medium text-white transition-all hover:shadow-lg hover:shadow-blue-500/25"
        >
          Iniciar Apresentação
          <ArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

