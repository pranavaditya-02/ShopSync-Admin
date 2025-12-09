"use client"

import { orders, products } from "@/lib/data/mock-data"
import { formatINR } from "@/lib/utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"

const channelData = [
  { name: "Web", value: orders.filter((o) => o.channel === "web").length, color: "#3b82f6" },
  { name: "Mobile", value: orders.filter((o) => o.channel === "mobile").length, color: "#22c55e" },
  { name: "Voice", value: orders.filter((o) => o.channel === "voice").length, color: "#f97316" },
  { name: "Chat", value: orders.filter((o) => o.channel === "chat").length, color: "#a855f7" },
]

const categoryData = products.reduce(
  (acc, product) => {
    const existing = acc.find((c) => c.name === product.category)
    if (existing) {
      existing.products += 1
      existing.inventory += product.inventory
    } else {
      acc.push({ name: product.category, products: 1, inventory: product.inventory })
    }
    return acc
  },
  [] as { name: string; products: number; inventory: number }[],
)

const dailyData = [
  { day: "Mon", conversations: 145, orders: 23, revenue: 45600 },
  { day: "Tue", conversations: 189, orders: 31, revenue: 62400 },
  { day: "Wed", conversations: 167, orders: 28, revenue: 57800 },
  { day: "Thu", conversations: 234, orders: 42, revenue: 91200 },
  { day: "Fri", conversations: 278, orders: 51, revenue: 104600 },
  { day: "Sat", conversations: 312, orders: 67, revenue: 135600 },
  { day: "Sun", conversations: 198, orders: 38, revenue: 79600 },
]

const agentPerformanceData = [
  { name: "Product", success: 96, tasks: 523 },
  { name: "Order", success: 94, tasks: 342 },
  { name: "Support", success: 91, tasks: 382 },
]

export default function AnalyticsPage() {
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

  return (
    <div className="p-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Insights and performance metrics</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Weekly Activity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyData}>
                  <defs>
                    <linearGradient id="colorConversations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#f8fafc",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="conversations"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorConversations)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Orders by Channel</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#f8fafc",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {channelData.map((channel) => (
                <div key={channel.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: channel.color }} />
                  <span className="text-sm text-muted-foreground">{channel.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Revenue Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#f8fafc",
                    }}
                    formatter={(value: number) => [formatINR(value), "Revenue"]}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} dot={{ fill: "#22c55e" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Agent Performance</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={agentPerformanceData} layout="vertical">
                  <XAxis type="number" stroke="#64748b" fontSize={12} domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={12} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#f8fafc",
                    }}
                    formatter={(value: number) => [`${value}%`, "Success Rate"]}
                  />
                  <Bar dataKey="success" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Inventory by Category</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#f8fafc",
                    }}
                  />
                  <Bar dataKey="inventory" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
