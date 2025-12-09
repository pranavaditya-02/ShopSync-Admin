import { sessions } from "@/lib/data/mock-data"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { MessageSquare, ShoppingCart, Clock } from "lucide-react"

const channelStyles: Record<string, string> = {
  web: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  mobile: "bg-green-500/10 text-green-500 border-green-500/20",
  voice: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  chat: "bg-purple-500/10 text-purple-500 border-purple-500/20",
}

const statusStyles: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  idle: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  completed: "bg-muted text-muted-foreground border-border",
}

export default function SessionsPage() {
  const activeSessions = sessions.filter((s) => s.status === "active").length
  const idleSessions = sessions.filter((s) => s.status === "idle").length
  const totalMessages = sessions.reduce((sum, s) => sum + s.conversationHistory.length, 0)

  return (
    <div className="p-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Sessions</h1>
          <p className="text-muted-foreground">Monitor active customer shopping sessions</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Total Sessions</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{sessions.length}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Active Now</p>
            <p className="mt-2 text-3xl font-bold text-emerald-500">{activeSessions}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Idle</p>
            <p className="mt-2 text-3xl font-bold text-yellow-500">{idleSessions}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Total Messages</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{totalMessages}</p>
          </div>
        </div>

        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-lg font-medium text-primary">
                      {session.customerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{session.customerName}</h3>
                    <p className="text-sm text-muted-foreground">Session: {session.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={cn("capitalize", channelStyles[session.channel])}>
                    {session.channel}
                  </Badge>
                  <Badge variant="outline" className={cn("capitalize", statusStyles[session.status])}>
                    {session.status}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-6 p-6 lg:grid-cols-2">
                <div>
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <ShoppingCart className="h-4 w-4" />
                    Cart ({session.cartItems.length} items)
                  </h4>
                  {session.cartItems.length > 0 ? (
                    <ul className="space-y-2">
                      {session.cartItems.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2 text-sm"
                        >
                          <span className="text-foreground">{item.name}</span>
                          <span className="text-muted-foreground">x{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">Cart is empty</p>
                  )}
                </div>

                <div>
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    Conversation ({session.conversationHistory.length} messages)
                  </h4>
                  <div className="max-h-48 space-y-2 overflow-y-auto">
                    {session.conversationHistory.map((msg, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "rounded-lg px-3 py-2 text-sm",
                          msg.role === "user" ? "bg-primary/10 text-foreground" : "bg-secondary text-muted-foreground",
                        )}
                      >
                        <span className="text-xs font-medium uppercase text-muted-foreground">{msg.role}:</span>
                        <p className="mt-1">{msg.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-border px-6 py-3 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                Last activity: {new Date(session.lastActivity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
