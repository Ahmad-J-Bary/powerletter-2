import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface GameCardProps {
  title: string
  description: string
  isActive?: boolean
  isComingSoon?: boolean
  onClick?: () => void
  className?: string
}

export function GameCard({
  title,
  description,
  isActive = false,
  isComingSoon = false,
  onClick,
  className
}: GameCardProps) {
  return (
    <Card
      className={cn(
        "relative cursor-pointer transition-all duration-300 hover:shadow-elegant",
        "border-2 hover:border-primary/30",
        {
          "opacity-60 cursor-not-allowed hover:border-border hover:shadow-card": isComingSoon,
          "border-primary/20 shadow-card": isActive,
        },
        className
      )}
      onClick={!isComingSoon ? onClick : undefined}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-card-foreground">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
          {isComingSoon && (
            <Badge variant="secondary" className="ml-4">
              Coming Soon
            </Badge>
          )}
        </div>
        
        {!isComingSoon && (
          <div className="mt-4 flex items-center text-sm text-primary font-medium">
            Start Playing →
          </div>
        )}
      </CardContent>
    </Card>
  )
}