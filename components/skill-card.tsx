import type React from "react"
interface SkillCardProps {
  title: string
  level: number
  maxLevel: number
  description?: string
  icon?: React.ReactNode
}

export default function SkillCard({ title, level, maxLevel, description, icon }: SkillCardProps) {
  const percentage = (level / maxLevel) * 100

  return (
    <div className="game-card rounded-lg p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-medium text-slate-400">HABILIDADE</div>
        <div className="level-badge">Nv. {level}</div>
      </div>

      <div className="mb-2 flex items-center gap-2">
        {icon && <div className="text-purple-400">{icon}</div>}
        <div className="text-xl font-bold text-white">{title}</div>
      </div>

      {description && <p className="mb-3 text-sm text-slate-300">{description}</p>}

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="mt-1 text-right text-xs text-slate-400">
        {level}/{maxLevel}
      </div>
    </div>
  )
}

