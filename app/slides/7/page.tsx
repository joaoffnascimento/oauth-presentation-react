import SlideLayout from "@/components/slide-layout"
import AnimatedAppear from "@/components/animated-appear"
import Link from "next/link"

export default function Slide7() {
  return (
    <SlideLayout currentSlide={7}>
      <div className="slide-content">
        <AnimatedAppear>
          <h1 className="slide-title">Conclusão e Discussões</h1>
        </AnimatedAppear>

        <AnimatedAppear delay={300}>
          <h2 className="slide-subtitle">Recapitulação dos Pontos-Chave</h2>

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="mb-2 font-semibold text-blue-400">OAuth2</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  • Protocolo de <span className="font-medium">autorização</span>
                </li>
                <li>• Diferentes fluxos para diferentes casos de uso</li>
                <li>• Access Token e Refresh Token</li>
                <li>• Escopos para limitar acesso</li>
                <li>• PKCE para aplicações públicas</li>
              </ul>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="mb-2 font-semibold text-blue-400">OpenID Connect</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  • Camada de <span className="font-medium">autenticação</span> sobre OAuth2
                </li>
                <li>• ID Token (JWT) com claims padronizadas</li>
                <li>• Informações do usuário estruturadas</li>
                <li>• Discovery e validação de tokens</li>
                <li>• Single Sign-On entre aplicações</li>
              </ul>
            </div>
          </div>
        </AnimatedAppear>

        <AnimatedAppear delay={600}>
          <h2 className="slide-subtitle">Vantagens e Desafios</h2>

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-green-500/30 bg-green-950/20 p-4">
              <h3 className="mb-2 font-semibold text-green-400">Vantagens</h3>
              <ul className="space-y-1 text-sm">
                <li>• Delegação de acesso sem compartilhar credenciais</li>
                <li>• Padrões abertos e amplamente adotados</li>
                <li>• Separação clara entre autenticação e autorização</li>
                <li>• Suporte a múltiplos provedores de identidade</li>
                <li>• Escalabilidade e interoperabilidade</li>
              </ul>
            </div>

            <div className="rounded-lg border border-orange-500/30 bg-orange-950/20 p-4">
              <h3 className="mb-2 font-semibold text-orange-400">Desafios</h3>
              <ul className="space-y-1 text-sm">
                <li>• Complexidade de implementação</li>
                <li>• Segurança depende de implementação correta</li>
                <li>• Gerenciamento de tokens e sessões</li>
                <li>• Diferentes interpretações dos padrões</li>
                <li>• Curva de aprendizado para desenvolvedores</li>
              </ul>
            </div>
          </div>
        </AnimatedAppear>

        <AnimatedAppear delay={900}>
          <h2 className="slide-subtitle">Recursos Adicionais</h2>

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="mb-2 font-semibold text-blue-400">Documentação e Especificações</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  •{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    OAuth 2.0 RFC 6749
                  </a>
                </li>
                <li>
                  •{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    OpenID Connect Core 1.0
                  </a>
                </li>
                <li>
                  •{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    OAuth 2.0 for Browser-Based Apps
                  </a>
                </li>
                <li>
                  •{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    JWT RFC 7519
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <h3 className="mb-2 font-semibold text-blue-400">Ferramentas e Bibliotecas</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  •{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    Auth0
                  </a>{" "}
                  - Plataforma de autenticação
                </li>
                <li>
                  •{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    Keycloak
                  </a>{" "}
                  - Servidor de identidade open source
                </li>
                <li>
                  •{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    Passport.js
                  </a>{" "}
                  - Middleware de autenticação para Node.js
                </li>
                <li>
                  •{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    jwt.io
                  </a>{" "}
                  - Ferramenta para decodificar e verificar JWTs
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-lg font-medium text-white transition-all hover:shadow-lg hover:shadow-blue-500/25"
            >
              Voltar ao Início
            </Link>
          </div>
        </AnimatedAppear>
      </div>
    </SlideLayout>
  )
}

