import { useState, useEffect } from "react"
import { LetterTile } from "@/components/game/letter-tile"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useGameData, GameLevel } from "@/hooks/use-game-data"
import { ArrowLeft, Lightbulb, RefreshCw, Trophy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Game3ScreenProps {
  language: "english" | "arabic"
  onBack: () => void
}

export function Game3Screen({ language, onBack }: Game3ScreenProps) {
  const { levels, loading, getLevel } = useGameData()
  const { toast } = useToast()
  
  const [currentLevel, setCurrentLevel] = useState(1)
  const [selectedLetters, setSelectedLetters] = useState<number[]>([])
  const [currentWord, setCurrentWord] = useState("")
  const [gameState, setGameState] = useState<"playing" | "won" | "failed">("playing")
  const [showHint, setShowHint] = useState(false)
  const [hintIndex, setHintIndex] = useState(0)
  
  const levelData = getLevel(currentLevel)
  const filteredLevels = levels.filter(level => level.language === language)
  const maxLevel = filteredLevels.length

  useEffect(() => {
    // Reset game state when level changes
    setSelectedLetters([])
    setCurrentWord("")
    setGameState("playing")
    setShowHint(false)
    setHintIndex(0)
  }, [currentLevel])

  const handleLetterClick = (index: number) => {
    if (gameState !== "playing") return
    
    if (selectedLetters.includes(index)) {
      // Deselect letter
      setSelectedLetters(prev => prev.filter(i => i !== index))
      setCurrentWord(prev => {
        const letterToRemove = levelData?.scrambled_letters[index]
        return prev.replace(letterToRemove || "", "")
      })
    } else {
      // Select letter
      setSelectedLetters(prev => [...prev, index])
      setCurrentWord(prev => prev + (levelData?.scrambled_letters[index] || ""))
    }
  }

  const checkAnswer = () => {
    if (!levelData || currentWord.toLowerCase() !== levelData.solution.toLowerCase()) {
      setGameState("failed")
      toast({
        title: language === "english" ? "Incorrect!" : "خطأ!",
        description: language === "english" ? "Try again!" : "حاول مرة أخرى!",
        variant: "destructive"
      })
      
      // Reset after a delay
      setTimeout(() => {
        setSelectedLetters([])
        setCurrentWord("")
        setGameState("playing")
      }, 1500)
      return
    }

    setGameState("won")
    toast({
      title: language === "english" ? "Correct!" : "صحيح!",
      description: language === "english" ? "Well done!" : "أحسنت!",
      variant: "default"
    })
  }

  const nextLevel = () => {
    if (currentLevel < maxLevel) {
      setCurrentLevel(prev => prev + 1)
    }
  }

  const resetLevel = () => {
    setSelectedLetters([])
    setCurrentWord("")
    setGameState("playing")
    setShowHint(false)
    setHintIndex(0)
  }

  const showNextHint = () => {
    if (!levelData) return
    
    if (!showHint) {
      setShowHint(true)
      setHintIndex(0)
    } else if (hintIndex < levelData.hints.length - 1) {
      setHintIndex(prev => prev + 1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">
            {language === "english" ? "Loading game..." : "تحميل اللعبة..."}
          </p>
        </div>
      </div>
    )
  }

  if (!levelData) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center">
        <Card className="p-6">
          <p className="text-center text-muted-foreground">
            {language === "english" ? "Level not found" : "المستوى غير موجود"}
          </p>
          <Button onClick={onBack} className="mt-4 w-full">
            {language === "english" ? "Back to Menu" : "العودة للقائمة"}
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-bg p-4" dir={language === "arabic" ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {language === "english" ? "Back" : "رجوع"}
          </Button>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {language === "english" ? `Level ${currentLevel}` : `المستوى ${currentLevel}`}
            </Badge>
            <Badge variant="outline">
              {language === "english" ? `Difficulty ${levelData.difficulty}` : `الصعوبة ${levelData.difficulty}`}
            </Badge>
          </div>
        </div>

        {/* Game Content */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">
              {language === "english" ? "Find the Word" : "اعثر على الكلمة"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Clue */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                {language === "english" ? "Clue:" : "الدليل:"}
              </h3>
              <p className="text-xl font-medium">{levelData.clue}</p>
            </div>

            {/* Hint */}
            {showHint && (
              <div className="text-center p-4 bg-accent/20 rounded-lg">
                <h4 className="font-semibold text-accent mb-2">
                  {language === "english" ? "Hint:" : "تلميح:"}
                </h4>
                <p className="text-accent-foreground">{levelData.hints[hintIndex]}</p>
              </div>
            )}

            {/* Current Word Display */}
            <div className="text-center">
              <div className="min-h-[3rem] flex items-center justify-center">
                <span className="text-2xl font-bold tracking-wider">
                  {currentWord || (language === "english" ? "Select letters..." : "اختر الحروف...")}
                </span>
              </div>
            </div>

            {/* Letter Tiles */}
            <div className="flex flex-wrap justify-center gap-3">
              {levelData.scrambled_letters.map((letter, index) => (
                <LetterTile
                  key={index}
                  letter={letter}
                  isSelected={selectedLetters.includes(index)}
                  isCorrect={gameState === "won" && selectedLetters.includes(index)}
                  isIncorrect={gameState === "failed" && selectedLetters.includes(index)}
                  isDisabled={gameState !== "playing"}
                  onClick={() => handleLetterClick(index)}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {gameState === "playing" && (
                <>
                  <Button
                    onClick={checkAnswer}
                    disabled={currentWord.length === 0}
                    className="min-w-[120px]"
                  >
                    {language === "english" ? "Check Answer" : "تحقق من الإجابة"}
                  </Button>
                  <Button variant="outline" onClick={showNextHint}>
                    <Lightbulb className="h-4 w-4 mr-2" />
                    {language === "english" ? "Hint" : "تلميح"}
                  </Button>
                  <Button variant="outline" onClick={resetLevel}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {language === "english" ? "Reset" : "إعادة"}
                  </Button>
                </>
              )}

              {gameState === "won" && (
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2 text-success">
                    <Trophy className="h-6 w-6" />
                    <span className="text-lg font-semibold">
                      {language === "english" ? "Congratulations!" : "تهانينا!"}
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    {currentLevel < maxLevel && (
                      <Button onClick={nextLevel}>
                        {language === "english" ? "Next Level" : "المستوى التالي"}
                      </Button>
                    )}
                    <Button variant="outline" onClick={resetLevel}>
                      {language === "english" ? "Play Again" : "العب مرة أخرى"}
                    </Button>
                    <Button variant="outline" onClick={onBack}>
                      {language === "english" ? "Back to Menu" : "العودة للقائمة"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Level Progress */}
        <div className="text-center text-sm text-muted-foreground">
          {language === "english" 
            ? `Level ${currentLevel} of ${maxLevel}` 
            : `المستوى ${currentLevel} من ${maxLevel}`
          }
        </div>
      </div>
    </div>
  )
}