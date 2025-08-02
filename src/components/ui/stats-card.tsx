import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  icon: LucideIcon;
  variant?: "default" | "primary" | "secondary" | "success" | "warning";
  className?: string;
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  variant = "default",
  className
}: StatsCardProps) {
  const variantStyles = {
    default: "bg-card border-border",
    primary: "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20",
    secondary: "bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20",
    success: "bg-gradient-to-br from-success/5 to-success/10 border-success/20",
    warning: "bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20"
  };

  const iconStyles = {
    default: "text-muted-foreground",
    primary: "text-primary",
    secondary: "text-secondary",
    success: "text-success",
    warning: "text-warning"
  };

  const changeStyles = {
    up: "text-success",
    down: "text-destructive",
    neutral: "text-muted-foreground"
  };

  return (
    <Card className={cn(
      "border card-shadow hover-shadow transition-smooth",
      variantStyles[variant],
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {change && (
              <p className={cn("text-sm font-medium", changeStyles[change.trend])}>
                {change.value}
              </p>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-lg bg-background/50",
            iconStyles[variant]
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}