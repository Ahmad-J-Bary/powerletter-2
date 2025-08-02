import { GameCard } from "@/components/game/game-card"
import { LanguageSelector } from "@/components/ui/language-selector"

interface GameSelectionProps {
  language: "english" | "arabic"
  onLanguageChange: (language: "english" | "arabic") => void
  onGameSelect: (gameType: number) => void
}

export function GameSelection({ language, onLanguageChange, onGameSelect }: GameSelectionProps) {
  const gameTypes = [
    {
      id: 1,
      title: language === "english" ? "Word Formation Challenge" : "تحدي تكوين الكلمات",
      description: language === "english" 
        ? "Find all possible words from a given set of letters"
        : "اعثر على جميع الكلمات الممكنة من مجموعة حروف معطاة",
      isComingSoon: true
    },
    {
      id: 2,
      title: language === "english" ? "Category Word Guess" : "تخمين كلمة الفئة",
      description: language === "english"
        ? "Guess the correct word based on category clues"
        : "خمن الكلمة الصحيحة بناءً على دلائل الفئة",
      isComingSoon: true
    },
    {
      id: 3,
      title: language === "english" ? "Clue-Driven Word Find" : "العثور على الكلمة بالدليل",
      description: language === "english"
        ? "Find the hidden word from scrambled letters using clues"
        : "اعثر على الكلمة المخفية من الحروف المبعثرة باستخدام الدلائل",
      isComingSoon: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-bg p-4" dir={language === "arabic" ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            {language === "english" ? "PowerLetter" : "باور ليتر"}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            {language === "english" 
              ? "Challenge your mind with word puzzles"
              : "تحدى عقلك مع ألغاز الكلمات"
            }
          </p>
          
          <LanguageSelector 
            language={language}
            onLanguageChange={onLanguageChange}
            className="inline-flex"
          />
        </div>

        {/* Game Selection */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center mb-6">
            {language === "english" ? "Choose Your Game" : "اختر لعبتك"}
          </h2>
          
          <div className="grid gap-4 md:gap-6">
            {gameTypes.map((game) => (
              <GameCard
                key={game.id}
                title={game.title}
                description={game.description}
                isComingSoon={game.isComingSoon}
                onClick={() => onGameSelect(game.id)}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          {language === "english" 
            ? "More games coming soon..."
            : "المزيد من الألعاب قريباً..."
          }
        </div>
      </div>
    </div>
  )
}