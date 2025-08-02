import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface LanguageSelectorProps {
  language: "english" | "arabic"
  onLanguageChange: (language: "english" | "arabic") => void
  className?: string
}

export function LanguageSelector({ language, onLanguageChange, className }: LanguageSelectorProps) {
  return (
    <div className={cn("flex rounded-lg bg-muted p-1", className)}>
      <Button
        variant={language === "english" ? "default" : "ghost"}
        size="sm"
        onClick={() => onLanguageChange("english")}
        className="text-sm font-medium"
      >
        English
      </Button>
      <Button
        variant={language === "arabic" ? "default" : "ghost"}
        size="sm"
        onClick={() => onLanguageChange("arabic")}
        className="text-sm font-medium"
      >
        العربية
      </Button>
    </div>
  )
}