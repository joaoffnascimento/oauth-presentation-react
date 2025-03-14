import SlideLayout from "@/components/slide-layout"
import AnimatedAppear from "@/components/animated-appear"

export default function Slide6() {
  return (
    <SlideLayout currentSlide={6}>
      <div className="slide-content">
        <AnimatedAppear>
          <h1 className="slide-title">Casos Práticos e Demonstração</h1>
        </AnimatedAppear>

        <AnimatedAppear delay={300}>
          <h2 className="slide-subtitle">Implementação de Authorization Code Flow com PKCE</h2>

          <div className="mb-6 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <h3 className="mb-2 font-semibold text-blue-400">Fluxo Completo</h3>

            <ol className="space-y-4 text-sm">
              <li className="rounded bg-slate-900 p-3">
                <span className="font-medium text-green-400">1. Gerar PKCE Challenge</span>
                <pre className="mt-1 text-xs">{`// Gerar code_verifier (string aleatória)
const codeVerifier = generateRandomString(64);

// Criar code_challenge usando SHA-256
const codeChallenge = base64UrlEncode(
  await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(codeVerifier)
  )
);

// Armazenar code_verifier para uso posterior
sessionStorage.setItem('code_verifier', codeVerifier);`}</pre>
              </li>

              <li className="rounded bg-slate-900 p-3">
                <span className="font-medium text-green-400">2. Redirecionar para Autorização</span>
                <pre className="mt-1 text-xs">{`const authUrl = new URL('https://auth.example.com/authorize');
authUrl.searchParams.append('response_type', 'code');
authUrl.searchParams.append('client_id', 'YOUR_CLIENT_ID');
authUrl.searchParams.append('redirect_uri', 'https://app.example.com/callback');
authUrl.searchParams.append('scope', 'openid profile email');
authUrl.searchParams.append('state', generateRandomString(32));
authUrl.searchParams.append('code_challenge', codeChallenge);
authUrl.searchParams.append('code_challenge_method', 'S256');

// Redirecionar usuário
window.location.href = authUrl.toString();`}</pre>
              </li>

              <li className="rounded bg-slate-900 p-3">
                <span className="font-medium text-green-400">3. Receber Código na Callback</span>
                <pre className="mt-1 text-xs">{`// Em https://app.example.com/callback
const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
const state = urlParams.get('state');

// Verificar state para prevenir CSRF
if (state !== sessionStorage.getItem('auth_state')) {
  throw new Error('Invalid state parameter');
}`}</pre>
              </li>

              <li className="rounded bg-slate-900 p-3">
                <span className="font-medium text-green-400">4. Trocar Código por Tokens</span>
                <pre className="mt-1 text-xs">{`const codeVerifier = sessionStorage.getItem('code_verifier');

const tokenResponse = await fetch('https://auth.example.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: 'YOUR_CLIENT_ID',
    code_verifier: codeVerifier,
    code: code,
    redirect_uri: 'https://app.example.com/callback'
  })
});

const tokens = await tokenResponse.json();
// { access_token, id_token, refresh_token, expires_in }`}</pre>
              </li>

              <li className="rounded bg-slate-900 p-3">
                <span className="font-medium text-green-400">5. Validar ID Token e Usar Access Token</span>
                <pre className="mt-1 text-xs">{`// Validar ID Token (em backend ou usando biblioteca)
const decodedIdToken = validateIdToken(tokens.id_token);

// Usar Access Token para acessar recursos
const userInfoResponse = await fetch('https://api.example.com/userinfo', {
  headers: { 'Authorization': 'Bearer ' + tokens.access_token }
});

const userInfo = await userInfoResponse.json();`}</pre>
              </li>
            </ol>
          </div>
        </AnimatedAppear>

        <AnimatedAppear delay={600}>
          <h2 className="slide-subtitle">Principais Desafios e Soluções</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="mb-2 font-semibold text-blue-400">Desafios</h3>
              <ul className="space-y-1 text-sm">
                <li>• Gerenciamento seguro de tokens</li>
                <li>• Renovação automática de tokens expirados</li>
                <li>• Tratamento de sessões inválidas</li>
                <li>• Logout em múltiplos dispositivos</li>
                <li>• Integração com diferentes provedores</li>
              </ul>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="mb-2 font-semibold text-blue-400">Soluções</h3>
              <ul className="space-y-1 text-sm">
                <li>• Bibliotecas especializadas (auth0-spa-js, oidc-client)</li>
                <li>• Interceptores de requisição para renovação automática</li>
                <li>• Padrão BFF (Backend For Frontend)</li>
                <li>• Uso de backchannel logout (via webhook)</li>
                <li>• Abstração de provedores com adaptadores</li>
              </ul>
            </div>
          </div>
        </AnimatedAppear>
      </div>
    </SlideLayout>
  )
}

