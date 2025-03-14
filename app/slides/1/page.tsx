import SlideLayout from "@/components/slide-layout"
import AnimatedAppear from "@/components/animated-appear"

export default function Slide1() {
  return (
    <SlideLayout currentSlide={1}>
      <div className="slide-content">
        <AnimatedAppear>
          <h1 className="slide-title">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Introdução ao OAuth2 e OpenID Connect
            </span>
          </h1>
        </AnimatedAppear>

        <AnimatedAppear delay={300}>
          <h2 className="slide-subtitle">Contextualização Histórica</h2>
          <p className="slide-text">
            Antes do OAuth, a autenticação na web era frequentemente baseada em métodos simples:
          </p>
          <ul className="slide-list">
            <li className="slide-list-item">
              <span className="slide-highlight">Autenticação Básica HTTP</span> - Envio de credenciais em cada
              requisição
            </li>
            <li className="slide-list-item">
              <span className="slide-highlight">Compartilhamento de credenciais</span> - Aplicações de terceiros pediam
              login e senha do usuário
            </li>
            <li className="slide-list-item">
              <span className="slide-highlight">Tokens proprietários</span> - Cada serviço implementava sua própria
              solução
            </li>
          </ul>
        </AnimatedAppear>

        <AnimatedAppear delay={600}>
          <h2 className="slide-subtitle">Motivação para o OAuth2</h2>
          <p className="slide-text">
            Com o crescimento das APIs e integrações entre serviços, surgiram novos desafios:
          </p>
          <ul className="slide-list">
            <li className="slide-list-item">Como permitir acesso a recursos sem compartilhar credenciais?</li>
            <li className="slide-list-item">Como limitar o escopo de acesso de aplicações de terceiros?</li>
            <li className="slide-list-item">Como revogar acesso sem alterar senhas?</li>
            <li className="slide-list-item">
              Como separar <span className="slide-highlight">autorização</span> (permissão para acessar recursos) de{" "}
              <span className="slide-highlight">autenticação</span> (verificação de identidade)?
            </li>
          </ul>
        </AnimatedAppear>

        <AnimatedAppear delay={900}>
          <div className="mt-8 rounded-lg bg-slate-800 p-6">
            <p className="text-center text-lg font-medium text-blue-400">
              OAuth2 surgiu como um protocolo para <span className="underline">autorização</span>, enquanto OpenID
              Connect estendeu o OAuth2 para adicionar uma camada de <span className="underline">autenticação</span>
            </p>
          </div>
        </AnimatedAppear>
      </div>
    </SlideLayout>
  )
}

