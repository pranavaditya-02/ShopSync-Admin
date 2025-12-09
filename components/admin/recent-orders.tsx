import type React from "react"
import { orders } from "@/lib/data/mock-data"
import { formatINR } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Globe, Smartphone, Mic, MessageCircle } from "lucide-react"

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  confirmed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  processing: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  shipped: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  delivered: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
}

const channelIcons: Record<string, React.ReactNode> = {
  web: <Globe className="h-4 w-4" />,
  mobile: <Smartphone className="h-4 w-4" />,
  voice: <Mic className="h-4 w-4" />,
  chat: <MessageCircle className="h-4 w-4" />,
}

export function RecentOrders() {
  const recent = orders.slice(0, 5)

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 sm:px-6 py-3 sm:py-4">
        <h3 className="text-base sm:text-lg font-semibold">Recent Orders</h3>
      </div>
      <div className="divide-y divide-border">
        {recent.map((order) => (
          <div key={order.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground shrink-0">
                {channelIcons[order.channel]}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{order.customerName}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {order.items.length} item{order.items.length > 1 ? "s" : ""} • {order.id}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
              <span className="text-sm font-medium">{formatINR(order.total)}</span>
              <Badge variant="outline" className={cn("capitalize text-xs", statusStyles[order.status])}>
                {order.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
