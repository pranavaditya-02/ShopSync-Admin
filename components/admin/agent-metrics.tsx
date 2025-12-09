"use client"

import { agentMetrics } from "@/lib/data/mock-data"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { time: "00:00", conversations: 12, orders: 3 },
  { time: "04:00", conversations: 8, orders: 2 },
  { time: "08:00", conversations: 45, orders: 12 },
  { time: "12:00", conversations: 78, orders: 24 },
  { time: "16:00", conversations: 92, orders: 31 },
  { time: "20:00", conversations: 56, orders: 18 },
  { time: "Now", conversations: 23, orders: 8 },
]

export function AgentMetrics() {
  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">AI Agent Activity</h3>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Conversations</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">Orders</span>
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-foreground">{agentMetrics.totalConversations}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Total Conversations</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-foreground">{agentMetrics.activeConversations}</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Active Now</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-foreground">{agentMetrics.avgResponseTime}s</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Avg Response</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-foreground">{agentMetrics.successRate}%</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Success Rate</p>
          </div>
        </div>
        <div className="h-48 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Area
                type="monotone"
                dataKey="conversations"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#convGrad)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="orders"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#orderGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
