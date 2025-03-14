import SlideLayout from "@/components/slide-layout"
import AnimatedAppear from "@/components/animated-appear"

export default function Slide4() {
  return (
    <SlideLayout currentSlide={4}>
      <div className="slide-content">
        <AnimatedAppear>
          <h1 className="slide-title">Modelos de Aplicação e Fluxos Específicos</h1>
        </AnimatedAppear>

        <AnimatedAppear delay={300}>
          <h2 className="slide-subtitle">Aplicações Web Tradicionais</h2>

          <div className="mb-6 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <h3 className="mb-2 font-semibold text-blue-400">Características</h3>
            <ul className="space-y-1 text-sm">
              <li>• Servidor backend que pode manter segredos</li>
              <li>• Sessões do lado do servidor</li>
              <li>• Renderização no servidor</li>
            </ul>

            <h3 className="mb-2 mt-4 font-semibold text-blue-400">Fluxo Recomendado</h3>
            <p className="text-sm">
              <span className="font-medium">Authorization Code Flow</span> com Client Secret
            </p>

            <div className="mt-2 rounded bg-slate-900 p-3 text-xs">
              <pre>{`1. Redireciona para: /authorize?
   response_type=code&
   client_id=CLIENT_ID&
   redirect_uri=CALLBACK_URL&
   scope=openid profile&
   state=RANDOM_STATE

2. Recebe código de autorização na callback

3. Troca código por tokens:
   POST /token
   grant_type=authorization_code&
   code=AUTHORIZATION_CODE&
   redirect_uri=CALLBACK_URL&
   client_id=CLIENT_ID&
   client_secret=CLIENT_SECRET`}</pre>
            </div>
          </div>
        </AnimatedAppear>

        <AnimatedAppear delay={600}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <h2 className="mb-2 text-xl font-semibold text-blue-400">Aplicações Nativas/Móveis</h2>

              <ul className="mb-3 space-y-1 text-sm">
                <li>• Não podem armazenar Client Secret com segurança</li>
                <li>• Usam esquemas de URL personalizados ou deep linking</li>
                <li>• Vulneráveis a interceptação de código</li>
              </ul>

              <h3 className="mb-2 font-semibold text-blue-400">Fluxo Recomendado</h3>
              <p className="text-sm">
                <span className="font-medium">Authorization Code Flow com PKCE</span>
              </p>

              <div className="mt-2 rounded bg-slate-900 p-2 text-xs">
                <pre>{`// Gera um code_verifier aleatório
code_verifier = random(43-128 chars)

// Cria code_challenge
code_challenge = BASE64URL(SHA256(code_verifier))

// Adiciona ao request de autorização
code_challenge_method=S256&
code_challenge=CODE_CHALLENGE

// Na troca de código, envia o verifier
code_verifier=CODE_VERIFIER`}</pre>
              </div>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <h2 className="mb-2 text-xl font-semibold text-blue-400">Single-Page Applications (SPA)</h2>

              <ul className="mb-3 space-y-1 text-sm">
                <li>• Executam inteiramente no navegador</li>
                <li>• Não podem armazenar segredos</li>
                <li>• Vulneráveis a ataques XSS</li>
                <li>• Desafios no armazenamento seguro de tokens</li>
              </ul>

              <h3 className="mb-2 font-semibold text-blue-400">Fluxo Recomendado</h3>
              <p className="text-sm">
                <span className="font-medium">Authorization Code Flow com PKCE</span> (sem client secret)
              </p>

              <div className="mt-2 rounded bg-slate-900 p-2 text-xs">
                <pre>{`// Opções para armazenamento de tokens:

1. Cookies HttpOnly + SameSite=strict
   (requer proxy de API no backend)

2. BFF (Backend For Frontend) pattern
   (tokens ficam no backend)

3. Token em memória (perdido no refresh)
   + refresh token em cookie HttpOnly`}</pre>
              </div>
            </div>
          </div>
        </AnimatedAppear>
      </div>
    </SlideLayout>
  )
}

