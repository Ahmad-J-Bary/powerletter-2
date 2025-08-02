import { useState } from "react"
import { GameSelection } from "@/components/screens/game-selection"
import { Game3Screen } from "@/components/screens/game3-screen"

type Screen = "menu" | "game3"

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("menu")
  const [language, setLanguage] = useState<"english" | "arabic">("english")

  const handleGameSelect = (gameType: number) => {
    if (gameType === 3) {
      setCurrentScreen("game3")
    }
  }

  const handleBackToMenu = () => {
    setCurrentScreen("menu")
  }

  if (currentScreen === "game3") {
    return (
      <Game3Screen
        language={language}
        onBack={handleBackToMenu}
      />
    )
  }

  return (
    <GameSelection
      language={language}
      onLanguageChange={setLanguage}
      onGameSelect={handleGameSelect}
    />
  )
};

export default Index;
