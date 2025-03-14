import SlideLayout from "@/components/slide-layout"
import AnimatedAppear from "@/components/animated-appear"
import FlowDiagram from "@/components/flow-diagram"
import { Shield, Key, Database } from "lucide-react"

export default function Slide2() {
  const oauthActors = [
    {
      id: "resource-owner",
      label: "Resource Owner",
      description: "Usuário que possui os recursos",
      position: "left",
      connectTo: ["client"],
    },
    {
      id: "client",
      label: "Client",
      description: "Aplicação que solicita acesso",
      position: "center",
      connectTo: ["auth-server", "resource-server"],
    },
    {
      id: "auth-server",
      label: "Authorization Server",
      description: "Emite tokens de acesso",
      position: "center",
      connectTo: ["client"],
    },
    {
      id: "resource-server",
      label: "Resource Server",
      description: "Hospeda recursos protegidos",
      position: "right",
      connectTo: [],
    },
  ]

  return (
    <SlideLayout currentSlide={2}>
      <div className="slide-content">
        <AnimatedAppear glow>
          <div className="mb-2 text-center">
            <span className="inline-block rounded-full border border-purple-500/30 bg-slate-900/50 px-4 py-1 text-sm font-medium text-purple-400">
              CAPÍTULO 2
            </span>
          </div>
          <h1 className="slide-title">
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Fundamentos do OAuth2
            </span>
          </h1>
        </AnimatedAppear>

        <AnimatedAppear delay={300}>
          <h2 className="slide-subtitle">Conceitos-chave</h2>

          <div className="slide-diagram">
            <div className="mb-4 text-center text-lg font-medium text-purple-400">Atores do Protocolo OAuth2</div>
            <FlowDiagram steps={oauthActors} />
          </div>
        </AnimatedAppear>

        <AnimatedAppear delay={600}>
          <h2 className="slide-subtitle">Principais Fluxos (Grants)</h2>

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="game-card rounded-lg p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-purple-400">Authorization Code + PKCE</h3>
                <span className="level-badge">S Tier</span>
              </div>
              <p className="text-sm">
                Fluxo mais seguro para aplicações com backend. O cliente recebe um código que é trocado por tokens. PKCE
                (Proof Key for Code Exchange) adiciona proteção contra interceptação.
              </p>
            </div>

            <div className="game-card rounded-lg p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-purple-400">Implicit (em desuso)</h3>
                <span className="level-badge">D Tier</span>
              </div>
              <p className="text-sm">
                Retorna o access token diretamente na URL. Vulnerável a vazamentos e não suporta refresh tokens.
                Substituído pelo Authorization Code + PKCE.
              </p>
            </div>

            <div className="game-card rounded-lg p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-purple-400">Client Credentials</h3>
                <span className="level-badge">A Tier</span>
              </div>
              <p className="text-sm">
                Para comunicação entre serviços (M2M), sem envolvimento do usuário. O cliente usa suas próprias
                credenciais para obter acesso.
              </p>
            </div>

            <div className="game-card rounded-lg p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-purple-400">Resource Owner Password</h3>
                <span className="level-badge">C Tier</span>
              </div>
              <p className="text-sm">
                O cliente coleta credenciais do usuário diretamente. Uso limitado a aplicações altamente confiáveis. Não
                recomendado para a maioria dos casos.
              </p>
            </div>
          </div>
        </AnimatedAppear>

        <AnimatedAppear delay={900}>
          <h2 className="slide-subtitle">Tokens e Escopos</h2>

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="game-card rounded-lg p-4">
              <div className="mb-2 flex items-center">
                <Shield className="mr-2 h-5 w-5 text-blue-400" />
                <h3 className="font-semibold text-blue-400">Access Token</h3>
              </div>
              <p className="text-sm">
                Credencial de curta duração usada para acessar recursos protegidos. Pode ser um JWT ou um token opaco.
              </p>
              <div className="mt-2 rounded bg-slate-800 p-2 text-xs">
                <span className="text-green-400">Duração:</span> 15-60 minutos
              </div>
            </div>

            <div className="game-card rounded-lg p-4">
              <div className="mb-2 flex items-center">
                <Key className="mr-2 h-5 w-5 text-blue-400" />
                <h3 className="font-semibold text-blue-400">Refresh Token</h3>
              </div>
              <p className="text-sm">
                Token de longa duração usado para obter novos access tokens sem nova autenticação do usuário.
              </p>
              <div className="mt-2 rounded bg-slate-800 p-2 text-xs">
                <span className="text-green-400">Duração:</span> Dias ou semanas
              </div>
            </div>
          </div>

          <div className="game-card rounded-lg p-4">
            <div className="mb-2 flex items-center">
              <Database className="mr-2 h-5 w-5 text-blue-400" />
              <h3 className="font-semibold text-blue-400">Escopos (Scopes)</h3>
            </div>
            <p className="text-sm mb-2">Limitam o acesso que um token concede. Exemplos:</p>
            <div className="slide-code">
              <code>read:profile write:email read:contacts offline_access</code>
            </div>
            <div className="mt-2 text-xs text-slate-400">
              [Dica: Sempre use o princípio do menor privilégio ao solicitar escopos]
            </div>
          </div>
        </AnimatedAppear>
      </div>
    </SlideLayout>
  )
}

