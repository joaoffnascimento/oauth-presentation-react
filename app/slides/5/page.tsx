import SlideLayout from "@/components/slide-layout"
import AnimatedAppear from "@/components/animated-appear"

export default function Slide5() {
  return (
    <SlideLayout currentSlide={5}>
      <div className="slide-content">
        <AnimatedAppear>
          <h1 className="slide-title">Tokens e Validação</h1>
        </AnimatedAppear>

        <AnimatedAppear delay={300}>
          <h2 className="slide-subtitle">Tipos de Tokens</h2>

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="mb-2 font-semibold text-blue-400">Tokens de Referência (Opacos)</h3>
              <p className="text-sm mb-2">
                Strings aleatórias que não contêm informações sobre o usuário ou permissões. Funcionam como uma "chave"
                para buscar informações no servidor de autorização.
              </p>
              <div className="rounded bg-slate-900 p-2 text-xs">
                <pre>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</pre>
              </div>
              <div className="mt-2 text-xs text-slate-400">
                <span className="font-medium">Vantagens:</span> Podem ser revogados, não expõem informações
              </div>
              <div className="mt-1 text-xs text-slate-400">
                <span className="font-medium">Desvantagens:</span> Requerem validação no servidor de autorização
              </div>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="mb-2 font-semibold text-blue-400">Tokens Autocontidos (JWT)</h3>
              <p className="text-sm mb-2">
                Contêm todas as informações necessárias sobre o usuário e permissões. Podem ser validados sem consultar
                o servidor de autorização.
              </p>
              <div className="rounded bg-slate-900 p-2 text-xs">
                <pre>{`{
  "sub": "1234567890",
  "name": "John Doe",
  "roles": ["admin", "user"],
  "exp": 1516239022
}`}</pre>
              </div>
              <div className="mt-2 text-xs text-slate-400">
                <span className="font-medium">Vantagens:</span> Validação local, reduz chamadas ao servidor
              </div>
              <div className="mt-1 text-xs text-slate-400">
                <span className="font-medium">Desvantagens:</span> Difíceis de revogar, tamanho maior
              </div>
            </div>
          </div>
        </AnimatedAppear>

        <AnimatedAppear delay={600}>
          <h2 className="slide-subtitle">Estratégias de Armazenamento e Proteção</h2>

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="mb-2 font-semibold text-blue-400">Armazenamento Seguro</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  • <span className="font-medium">Backend:</span> Banco de dados ou cache (Redis)
                </li>
                <li>
                  • <span className="font-medium">Web:</span> HttpOnly cookies com flags de segurança
                </li>
                <li>
                  • <span className="font-medium">Mobile:</span> Keychain (iOS) ou KeyStore (Android)
                </li>
                <li>
                  • <span className="font-medium">SPA:</span> Memória (variáveis) + refresh token em cookie
                </li>
              </ul>
              <div className="mt-2 text-xs text-orange-300">
                <span className="font-medium">Nunca armazene:</span> Em localStorage, sessionStorage ou cookies sem
                proteção
              </div>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="mb-2 font-semibold text-blue-400">Proteção contra Ataques</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  • <span className="font-medium">XSS:</span> Content-Security-Policy, HttpOnly cookies
                </li>
                <li>
                  • <span className="font-medium">CSRF:</span> CSRF tokens, SameSite cookies
                </li>
                <li>
                  • <span className="font-medium">Token Leakage:</span> Não incluir tokens em URLs
                </li>
                <li>
                  • <span className="font-medium">Man-in-the-Middle:</span> HTTPS em todas as comunicações
                </li>
                <li>
                  • <span className="font-medium">Replay:</span> Curta expiração, validação de nonce
                </li>
              </ul>
            </div>
          </div>
        </AnimatedAppear>

        <AnimatedAppear delay={900}>
          <h2 className="slide-subtitle">Processos de Validação</h2>

          <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <h3 className="mb-2 font-semibold text-blue-400">Validação de JWT</h3>
            <div className="rounded bg-slate-900 p-3 text-xs">
              <pre>{`// Exemplo de validação de JWT em Node.js
function validateToken(token) {
  try {
    // 1. Verificar assinatura
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ['RS256']
    });
    
    // 2. Validar claims
    const now = Math.floor(Date.now() / 1000);
    
    if (decoded.exp <= now) {
      throw new Error('Token expirado');
    }
    
    if (decoded.iss !== 'https://auth.example.com') {
      throw new Error('Emissor inválido');
    }
    
    if (decoded.aud !== 'my-client-id') {
      throw new Error('Audience inválida');
    }
    
    // 3. Token válido
    return decoded;
  } catch (error) {
    throw new Error('Token inválido: ' + error.message);
  }
}`}</pre>
            </div>
          </div>
        </AnimatedAppear>
      </div>
    </SlideLayout>
  )
}

