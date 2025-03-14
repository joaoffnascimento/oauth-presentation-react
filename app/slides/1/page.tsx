import SlideLayout from "@/components/slide-layout"
import AnimatedAppear from "@/components/animated-appear"
import SkillCard from "@/components/skill-card"
import { Shield, History, Key } from "lucide-react"

export default function Slide1() {
  return (
    <SlideLayout currentSlide={1}>
      <div className="slide-content">
        <AnimatedAppear glow>
          <div className="mb-2 text-center">
            <span className="inline-block rounded-full border border-purple-500/30 bg-slate-900/50 px-4 py-1 text-sm font-medium text-purple-400">
              CAPÍTULO 1
            </span>
          </div>
          <h1 className="slide-title">
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Introdução ao OAuth2 e OpenID Connect
            </span>
          </h1>
        </AnimatedAppear>

        <AnimatedAppear delay={300}>
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <SkillCard
              title="História"
              level={1}
              maxLevel={5}
              description="Conhecimento sobre a evolução da autenticação na web"
              icon={<History size={20} />}
            />
            <SkillCard
              title="Autorização"
              level={2}
              maxLevel={5}
              description="Habilidade de controlar acesso a recursos"
              icon={<Shield size={20} />}
            />
            <SkillCard
              title="Autenticação"
              level={2}
              maxLevel={5}
              description="Capacidade de verificar identidades"
              icon={<Key size={20} />}
            />
          </div>
        </AnimatedAppear>

        <AnimatedAppear delay={600}>
          <h2 className="slide-subtitle">Contextualização Histórica</h2>
          <div className="quest-item">
            <p className="slide-text">
              Antes do OAuth, a autenticação na web era frequentemente baseada em métodos simples:
            </p>
            <ul className="slide-list">
              <li className="slide-list-item">
                <span className="slide-highlight">Autenticação Básica HTTP</span> - Envio de credenciais em cada
                requisição
              </li>
              <li className="slide-list-item">
                <span className="slide-highlight">Compartilhamento de credenciais</span> - Aplicações de terceiros
                pediam login e senha do usuário
              </li>
              <li className="slide-list-item">
                <span className="slide-highlight">Tokens proprietários</span> - Cada serviço implementava sua própria
                solução
              </li>
            </ul>
          </div>
        </AnimatedAppear>

        <AnimatedAppear delay={900}>
          <h2 className="slide-subtitle">Motivação para o OAuth2</h2>
          <div className="quest-item">
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
          </div>
        </AnimatedAppear>

        <AnimatedAppear delay={1200} glow>
          <div className="mt-8 rounded-lg border border-purple-500/30 bg-slate-900/70 p-6 text-center">
            <p className="text-lg font-medium">
              <span className="text-purple-400">OAuth2</span> surgiu como um protocolo para{" "}
              <span className="underline text-blue-400">autorização</span>, enquanto
              <span className="text-purple-400"> OpenID Connect</span> estendeu o OAuth2 para adicionar uma camada de{" "}
              <span className="underline text-blue-400">autenticação</span>
            </p>
            <div className="mt-4 text-sm text-slate-400">
              [Missão desbloqueada: Entender a diferença entre autorização e autenticação]
            </div>
          </div>
        </AnimatedAppear>
      </div>
    </SlideLayout>
  )
}

