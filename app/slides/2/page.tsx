import SlideLayout from "@/components/slide-layout"
import AnimatedAppear from "@/components/animated-appear"
import FlowDiagram from "@/components/flow-diagram"

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
        <AnimatedAppear>
          <h1 className="slide-title">Fundamentos do OAuth2</h1>
        </AnimatedAppear>

        <AnimatedAppear delay={300}>
          <h2 className="slide-subtitle">Conceitos-chave</h2>

          <div className="slide-diagram">
            <FlowDiagram steps={oauthActors} />
          </div>
        </AnimatedAppear>

        <AnimatedAppear delay={600}>
          <h2 className="slide-subtitle">Principais Fluxos (Grants)</h2>

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="mb-2 font-semibold text-blue-400">Authorization Code (com PKCE)</h3>
              <p className="text-sm">
                Fluxo mais seguro para aplicações com backend. O cliente recebe um código que é trocado por tokens. PKCE
                (Proof Key for Code Exchange) adiciona proteção contra interceptação.
              </p>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="mb-2 font-semibold text-blue-400">Implicit (em desuso)</h3>
              <p className="text-sm">
                Retorna o access token diretamente na URL. Vulnerável a vazamentos e não suporta refresh tokens.
                Substituído pelo Authorization Code + PKCE.
              </p>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="mb-2 font-semibold text-blue-400">Client Credentials</h3>
              <p className="text-sm">
                Para comunicação entre serviços (M2M), sem envolvimento do usuário. O cliente usa suas próprias
                credenciais para obter acesso.
              </p>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="mb-2 font-semibold text-blue-400">Resource Owner Password</h3>
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
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="mb-2 font-semibold text-blue-400">Access Token</h3>
              <p className="text-sm">
                Credencial de curta duração usada para acessar recursos protegidos. Pode ser um JWT ou um token opaco.
              </p>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="mb-2 font-semibold text-blue-400">Refresh Token</h3>
              <p className="text-sm">
                Token de longa duração usado para obter novos access tokens sem nova autenticação do usuário.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <h3 className="mb-2 font-semibold text-blue-400">Escopos (Scopes)</h3>
            <p className="text-sm mb-2">Limitam o acesso que um token concede. Exemplos:</p>
            <div className="slide-code">
              <code>read:profile write:email read:contacts offline_access</code>
            </div>
          </div>
        </AnimatedAppear>
      </div>
    </SlideLayout>
  )
}

