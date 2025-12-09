import { StatsCard } from "@/components/admin/stats-card"
import { RecentOrders } from "@/components/admin/recent-orders"
import { ActiveSessions } from "@/components/admin/active-sessions"
import { AgentMetrics } from "@/components/admin/agent-metrics"
import { ShoppingCart, Package, MessageSquare, IndianRupee, TrendingUp, Users, Clock, Star, Activity, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminDashboard() {
  const topProducts = [
    { name: "Sony WH-1000XM5", revenue: "₹89,970", orders: 3, trend: "+15%" },
    { name: "Apple Watch Series 9", revenue: "₹83,800", orders: 2, trend: "+8%" },
    { name: "Nike Air Max 270", revenue: "₹38,985", orders: 3, trend: "+12%" },
  ]

  const revenueByChannel = [
    { channel: "Web", amount: "₹68,234", percentage: 43, change: "+5%" },
    { channel: "Mobile", amount: "₹52,118", percentage: 33, change: "+12%" },
    { channel: "Voice", amount: "₹25,342", percentage: 16, change: "+8%" },
    { channel: "Chat", amount: "₹12,478", percentage: 8, change: "+3%" },
  ]

  const alerts = [
    { type: "critical", message: "2 products below 10 units", action: "View Inventory", href: "/admin/products" },
    { type: "warning", message: "High cart abandonment rate (18%)", action: "View Sessions", href: "/admin/sessions" },
    { type: "info", message: "3 orders pending confirmation", action: "Review Orders", href: "/admin/orders" },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-sm sm:text-base text-muted-foreground">Monitor your AI shopping agents and store performance</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Last 7 days</span>
            <span className="sm:hidden">7 days</span>
          </Button>
          <Link href="/admin/analytics">
            <Button size="sm">
              <Activity className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Full Analytics</span>
              <span className="sm:hidden">Analytics</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="₹1,58,172"
          change="+12.5% from last week"
          changeType="positive"
          icon={IndianRupee}
        />
        <StatsCard
          title="Orders Today"
          value="47"
          change="+8 from yesterday"
          changeType="positive"
          icon={ShoppingCart}
        />
        <StatsCard
          title="Active Sessions"
          value="23"
          change="3 voice, 12 web, 8 mobile"
          changeType="neutral"
          icon={MessageSquare}
        />
        <StatsCard
          title="Low Stock Items"
          value="4"
          change="2 critical (< 10 units)"
          changeType="negative"
          icon={Package}
          iconColor="bg-destructive/10"
        />
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Conversion Rate"
          value="14.3%"
          change="+2.1% from last week"
          changeType="positive"
          icon={TrendingUp}
        />
        <StatsCard
          title="Total Customers"
          value="1,847"
          change="+127 new this week"
          changeType="positive"
          icon={Users}
        />
        <StatsCard
          title="Avg Order Value"
          value="₹3,368"
          change="-₹124 from last week"
          changeType="negative"
          icon={IndianRupee}
        />
        <StatsCard
          title="Customer Satisfaction"
          value="4.7/5"
          change="Based on 234 reviews"
          changeType="positive"
          icon={Star}
        />
      </div>

      {/* Alerts Section */}
      {alerts.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Alerts & Notifications</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {alerts.map((alert, idx) => (
              <Card key={idx} className={"p-4 border-l-4 " + 
                (alert.type === "critical" ? "border-l-red-500 bg-red-500/5" : 
                 alert.type === "warning" ? "border-l-yellow-500 bg-yellow-500/5" : 
                 "border-l-blue-500 bg-blue-500/5")}>
                <div className="flex items-start gap-3">
                  <AlertTriangle className={"h-5 w-5 mt-0.5 " + 
                    (alert.type === "critical" ? "text-red-500" : 
                     alert.type === "warning" ? "text-yellow-500" : 
                     "text-blue-500")} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <Link href={alert.href}>
                      <Button variant="link" size="sm" className="h-auto p-0 mt-1 text-xs">
                        {alert.action} →
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8">
        <AgentMetrics />
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <Card>
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold text-foreground">Top Performing Products</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{product.revenue}</p>
                    <div className="flex items-center gap-1 text-xs text-emerald-500">
                      <ArrowUpRight className="h-3 w-3" />
                      {product.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Revenue by Channel */}
        <Card>
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold text-foreground">Revenue by Channel</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {revenueByChannel.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="capitalize">
                        {item.channel}
                      </Badge>
                      <span className="text-xs text-emerald-500">{item.change}</span>
                    </div>
                    <span className="font-semibold text-sm">{item.amount}</span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentOrders />
        <ActiveSessions />
      </div>
    </div>
  )
}
