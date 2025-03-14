"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

// XP necessário para cada tier
const XP_TIERS = {
  F: 0,
  E: 100,
  D: 250,
  C: 500,
  B: 800,
  A: 1200,
  S: 2000,
}

// Cores para cada tier
const TIER_COLORS = {
  F: "from-slate-400 to-slate-500",
  E: "from-green-400 to-green-500",
  D: "from-blue-400 to-blue-500",
  C: "from-indigo-400 to-indigo-500",
  B: "from-purple-400 to-purple-500",
  A: "from-pink-400 to-pink-500",
  S: "from-amber-400 to-red-500",
}

export function getTierFromXP(xp: number): keyof typeof XP_TIERS {
  const tiers = Object.entries(XP_TIERS).reverse() as [keyof typeof XP_TIERS, number][]
  for (const [tier, minXP] of tiers) {
    if (xp >= minXP) return tier
  }
  return "F"
}

export function getNextTier(currentTier: keyof typeof XP_TIERS): keyof typeof XP_TIERS | null {
  const tiers = Object.keys(XP_TIERS) as Array<keyof typeof XP_TIERS>
  const currentIndex = tiers.indexOf(currentTier)

  if (currentIndex < tiers.length - 1) {
    return tiers[currentIndex + 1]
  }

  return null // Já está no tier máximo
}

export function getXPForNextTier(currentXP: number): number {
  const currentTier = getTierFromXP(currentXP)
  const nextTier = getNextTier(currentTier)

  if (!nextTier) return 0 // Já está no tier máximo

  return XP_TIERS[nextTier] - currentXP
}

export function getXPProgress(currentXP: number): number {
  const currentTier = getTierFromXP(currentXP)
  const nextTier = getNextTier(currentTier)

  if (!nextTier) return 100 // Já está no tier máximo

  const currentTierXP = XP_TIERS[currentTier]
  const nextTierXP = XP_TIERS[nextTier]
  const xpInCurrentTier = currentXP - currentTierXP
  const xpNeededForNextTier = nextTierXP - currentTierXP

  return Math.min(100, Math.floor((xpInCurrentTier / xpNeededForNextTier) * 100))
}

interface XPDisplayProps {
  xp: number
  showTierProgress?: boolean
  className?: string
  onLevelUp?: (tier: keyof typeof XP_TIERS) => void
  lastTierShown?: string
}

export function XPDisplay({ xp, showTierProgress = true, className, onLevelUp, lastTierShown = "" }: XPDisplayProps) {
  const [prevXP, setPrevXP] = useState(xp)
  const [prevTier, setPrevTier] = useState<keyof typeof XP_TIERS>(getTierFromXP(xp))
  const [isAnimating, setIsAnimating] = useState(false)

  const currentTier = getTierFromXP(xp)
  const nextTier = getNextTier(currentTier)
  const progress = getXPProgress(xp)

  useEffect(() => {
    if (xp > prevXP) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)

      // Verificar se houve mudança de tier
      const newTier = getTierFromXP(xp)
      if (newTier !== prevTier && newTier !== lastTierShown) {
        if (onLevelUp) onLevelUp(newTier)
      }

      setPrevTier(newTier)
    }

    setPrevXP(xp)
  }, [xp, prevXP, prevTier, onLevelUp, lastTierShown])

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition-all duration-500",
          isAnimating
            ? "animate-pulse border-yellow-500/50 bg-yellow-950/30 text-yellow-400"
            : `border-${currentTier === "S" ? "amber" : "purple"}-500/30 bg-slate-800/50 text-${currentTier === "S" ? "amber" : "purple"}-400`,
        )}
      >
        <span>XP</span>
        <span className={cn("text-white transition-all duration-300", isAnimating && "animate-bounce")}>{xp}</span>
      </div>

      <div
        className={cn(
          "flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition-all duration-500",
          isAnimating
            ? "animate-pulse border-yellow-500/50 bg-yellow-950/30"
            : `border-${currentTier === "S" ? "amber" : "purple"}-500/30 bg-slate-800/50`,
        )}
      >
        <span
          className={cn(
            "transition-all duration-300",
            isAnimating ? "text-yellow-400" : `text-${currentTier === "S" ? "amber" : "purple"}-400`,
          )}
        >
          Tier
        </span>
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br transition-all duration-500",
            isAnimating ? "animate-spin from-yellow-400 to-amber-600" : TIER_COLORS[currentTier],
          )}
        >
          <span className="text-xs font-bold text-white">{currentTier}</span>
        </div>
      </div>

      {showTierProgress && nextTier && (
        <div className="flex items-center gap-2 text-xs">
          <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-700">
            <div
              className={cn(
                "h-full rounded-full bg-gradient-to-r transition-all duration-500",
                TIER_COLORS[currentTier],
              )}
              style={{ width: `${progress}%` }}
            />
          </div>
          {nextTier && (
            <span className="text-slate-400">
              {getXPForNextTier(xp)} XP para Tier {nextTier}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

