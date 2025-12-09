import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface Props {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: LucideIcon
  iconColor?: string
}

export function StatsCard({ title, value, change, changeType = "neutral", icon: Icon, iconColor }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", iconColor || "bg-primary/10")}>
          <Icon className={cn("h-5 w-5", iconColor ? "text-foreground" : "text-primary")} />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-semibold text-foreground">{value}</p>
        {change && (
          <p
            className={cn(
              "mt-1 text-sm",
              changeType === "positive" && "text-emerald-500",
              changeType === "negative" && "text-destructive",
              changeType === "neutral" && "text-muted-foreground",
            )}
          >
            {change}
          </p>
        )}
      </div>
    </div>
  )
}
