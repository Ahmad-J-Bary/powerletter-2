import { cn } from "@/lib/utils"
import { useState } from "react"

interface LetterTileProps {
  letter: string
  isSelected?: boolean
  isCorrect?: boolean
  isIncorrect?: boolean
  isDisabled?: boolean
  onClick?: () => void
  className?: string
}

export function LetterTile({
  letter,
  isSelected = false,
  isCorrect = false,
  isIncorrect = false,
  isDisabled = false,
  onClick,
  className
}: LetterTileProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    if (isDisabled || !onClick) return
    
    setIsAnimating(true)
    onClick()
    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={cn(
        "letter-tile relative flex h-12 w-12 items-center justify-center rounded-lg border-2 font-bold text-lg transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "shadow-card hover:shadow-elegant active:scale-95",
        {
          // Default state
          "bg-card border-border text-card-foreground hover:border-primary/30": !isSelected && !isCorrect && !isIncorrect,
          
          // Selected state
          "bg-primary border-primary text-primary-foreground shadow-glow": isSelected && !isCorrect && !isIncorrect,
          
          // Correct state
          "bg-success border-success text-success-foreground shadow-glow": isCorrect,
          
          // Incorrect state
          "bg-destructive border-destructive text-destructive-foreground": isIncorrect,
          
          // Disabled state
          "opacity-50 cursor-not-allowed hover:border-border hover:shadow-card": isDisabled,
          
          // Animations
          "letter-bounce": isAnimating && isCorrect,
          "letter-shake": isAnimating && isIncorrect,
        },
        className
      )}
    >
      {letter}
    </button>
  )
}