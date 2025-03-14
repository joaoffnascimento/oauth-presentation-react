import SlideLayout from "@/components/slide-layout"
import AnimatedAppear from "@/components/animated-appear"

export default function Slide3() {
  return (
    <SlideLayout currentSlide={3}>
      <div className="slide-content">
        <AnimatedAppear>
          <h1 className="slide-title">OpenID Connect (OIDC)</h1>
        </AnimatedAppear>

        <AnimatedAppear delay={300}>
          <h2 className="slide-subtitle">Extensão do OAuth2 para Autenticação</h2>
          <p className="slide-text">
            OpenID Connect adiciona uma camada de <span className="slide-highlight">autenticação</span> sobre o OAuth2,
            que originalmente foi projetado apenas para <span className="slide-highlight">autorização</span>.
          </p>

          <div className="mb-8 rounded-lg bg-slate-800 p-6">
            <div className="mb-4 text-center text-lg font-medium text-blue-400">OAuth2 vs OpenID Connect</div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
                <h3 className="mb-2 font-semibold text-blue-400">OAuth2</h3>
                <p className="text-sm">"O que o aplicativo pode fazer em meu nome?"</p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Foco em autorização</li>
                  <li>• Access Token para recursos</li>
                  <li>• Não padroniza informações do usuário</li>
                </ul>
              </div>

              <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
                <h3 className="mb-2 font-semibold text-blue-400">OpenID Connect</h3>
                <p className="text-sm">"Quem é o usuário?"</p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Foco em autenticação</li>
                  <li>• ID Token para identidade</li>
                  <li>• Claims padronizadas do usuário</li>
                </ul>
              </div>
            </div>
          </div>
        </AnimatedAppear>

        <AnimatedAppear delay={600}>
          <h2 className="slide-subtitle">ID Token (JWT)</h2>
          <p className="slide-text">
            O ID Token é um JWT (JSON Web Token) que contém informações sobre a autenticação do usuário.
          </p>

          <div className="slide-code">
            <pre>{`{
  "iss": "https://auth.example.com",     // Emissor
  "sub": "user123",                      // Identificador único do usuário
  "aud": "client_id",                    // Destinatário (seu aplicativo)
  "exp": 1615825453,                     // Expiração
  "iat": 1615821853,                     // Emitido em
  "auth_time": 1615821853,               // Momento da autenticação
  "nonce": "n-0S6_WzA2Mj",               // Valor único para prevenir replay
  "name": "João Silva",                  // Claims do usuário
  "email": "joao@example.com"
}`}</pre>
          </div>
        </AnimatedAppear>

        <AnimatedAppear delay={900}>
          <h2 className="slide-subtitle">Claims Essenciais e Validação</h2>
          <ul className="slide-list">
            <li className="slide-list-item">
              <span className="slide-highlight">iss (issuer)</span>: Identifica o provedor de identidade
            </li>
            <li className="slide-list-item">
              <span className="slide-highlight">sub (subject)</span>: Identificador único e persistente do usuário
            </li>
            <li className="slide-list-item">
              <span className="slide-highlight">aud (audience)</span>: Identifica o cliente para o qual o token foi
              emitido
            </li>
            <li className="slide-list-item">
              <span className="slide-highlight">exp (expiration)</span>: Quando o token expira
            </li>
            <li className="slide-list-item">
              <span className="slide-highlight">iat (issued at)</span>: Quando o token foi emitido
            </li>
            <li className="slide-list-item">
              <span className="slide-highlight">nonce</span>: Valor único para prevenir ataques de replay
            </li>
          </ul>

          <div className="mt-4 rounded-lg border border-orange-500/30 bg-orange-950/20 p-4 text-orange-300">
            <h3 className="mb-2 font-semibold">Importante: Validação do ID Token</h3>
            <p className="text-sm">
              Sempre valide a assinatura, o emissor, o destinatário, a expiração e o nonce do ID Token antes de confiar
              nas informações contidas nele.
            </p>
          </div>
        </AnimatedAppear>
      </div>
    </SlideLayout>
  )
}

