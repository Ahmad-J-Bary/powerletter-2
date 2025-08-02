import { useState, useEffect } from "react"

export interface GameLevel {
  clue: string
  scrambled_letters: string[]
  solution: string
  hints: string[]
  difficulty: number
  language: "english" | "arabic"
}

export function useGameData() {
  const [levels, setLevels] = useState<GameLevel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadGameLevels()
  }, [])

  const loadGameLevels = async () => {
    try {
      setLoading(true)
      const levelPromises = []
      
      // Import levels directly (since we can't dynamically import from public folder in dev)
      const levelData: GameLevel[] = [
        {
          clue: "Capital of France",
          scrambled_letters: ["P", "A", "R", "I", "S"],
          solution: "PARIS",
          hints: ["European city", "Starts with P", "City of lights"],
          difficulty: 1,
          language: "english"
        },
        {
          clue: "King of the jungle",
          scrambled_letters: ["L", "I", "O", "N"],
          solution: "LION",
          hints: ["Big cat", "Has a mane", "Roars loudly"],
          difficulty: 1,
          language: "english"
        },
        {
          clue: "Large body of water",
          scrambled_letters: ["O", "C", "E", "A", "N"],
          solution: "OCEAN",
          hints: ["Contains fish", "Very deep", "Salt water"],
          difficulty: 2,
          language: "english"
        },
        {
          clue: "عاصمة مصر",
          scrambled_letters: ["ا", "ل", "ق", "ا", "ه", "ر", "ة"],
          solution: "القاهرة",
          hints: ["مدينة عربية", "نهر النيل", "أم الدنيا"],
          difficulty: 2,
          language: "arabic"
        },
        {
          clue: "ملك الغابة",
          scrambled_letters: ["ا", "ل", "أ", "س", "د"],
          solution: "الأسد",
          hints: ["حيوان مفترس", "له لبدة", "يزأر بقوة"],
          difficulty: 1,
          language: "arabic"
        }
      ]
      
      setLevels(levelData)
      
      setError(null)
    } catch (err) {
      setError("Failed to load game levels")
      console.error("Error loading game levels:", err)
    } finally {
      setLoading(false)
    }
  }

  const getLevel = (levelNumber: number): GameLevel | null => {
    return levels[levelNumber - 1] || null
  }

  const getLevelsByLanguage = (language: "english" | "arabic"): GameLevel[] => {
    return levels.filter(level => level.language === language)
  }

  return {
    levels,
    loading,
    error,
    getLevel,
    getLevelsByLanguage,
    totalLevels: levels.length
  }
}