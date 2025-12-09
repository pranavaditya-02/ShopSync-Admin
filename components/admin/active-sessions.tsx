"use client"

import { sessions } from "@/lib/data/mock-data"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const channelStyles: Record<string, string> = {
  web: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  mobile: "bg-green-500/10 text-green-500 border-green-500/20",
  voice: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  chat: "bg-purple-500/10 text-purple-500 border-purple-500/20",
}

const statusDot: Record<string, string> = {
  active: "bg-emerald-500",
  idle: "bg-yellow-500",
  completed: "bg-muted-foreground",
}

export function ActiveSessions() {
  const activeSessions = sessions.filter((s) => s.status !== "completed")

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">Active Sessions</h3>
          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 text-xs">
            {activeSessions.length} live
          </Badge>
        </div>
      </div>
      <div className="divide-y divide-border">
        {activeSessions.map((session) => (
          <div key={session.id} className="px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-secondary">
                    <span className="text-xs sm:text-sm font-medium text-foreground">
                      {session.customerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 border-card",
                      statusDot[session.status],
                    )}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{session.customerName}</p>
                  <p className="text-xs text-muted-foreground">
                    {session.cartItems.length} item{session.cartItems.length !== 1 ? "s" : ""} in cart
                  </p>
                </div>
              </div>
              <Badge variant="outline" className={cn("capitalize text-xs self-start sm:self-center", channelStyles[session.channel])}>
                {session.channel}
              </Badge>
            </div>
            {session.conversationHistory.length > 0 && (
              <div className="mt-3 rounded-lg bg-secondary/50 p-2.5 sm:p-3">
                <p className="text-xs text-muted-foreground line-clamp-2">
                  Last: "{session.conversationHistory[session.conversationHistory.length - 1].content}"
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
