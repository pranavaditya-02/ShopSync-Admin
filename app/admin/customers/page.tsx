import { orders, sessions } from "@/lib/data/mock-data"
import { formatINR } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { User, ShoppingBag, MessageSquare, TrendingUp, Crown, Star, Calendar, Phone, Globe, MessageCircle, Smartphone, Target, Award, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const customersMap = new Map<
  string,
  { id: string; name: string; orders: number; spent: number; sessions: number; lastChannel: string; joinDate: string }
>()

orders.forEach((o) => {
  const ex = customersMap.get(o.customerId)
  if (ex) {
    ex.orders++
    ex.spent += o.total
    ex.lastChannel = o.channel
  } else
    customersMap.set(o.customerId, {
      id: o.customerId,
      name: o.customerName,
      orders: 1,
      spent: o.total,
      sessions: 0,
      lastChannel: o.channel,
      joinDate: "2024-11-15",
    })
})

sessions.forEach((s) => {
  const ex = customersMap.get(s.customerId)
  if (ex) ex.sessions++
  else
    customersMap.set(s.customerId, {
      id: s.customerId,
      name: s.customerName,
      orders: 0,
      spent: 0,
      sessions: 1,
      lastChannel: s.channel,
      joinDate: "2024-12-01",
    })
})

const customers = Array.from(customersMap.values())

const channelStyles: Record<string, string> = {
  web: "bg-blue-500/10 text-blue-500",
  mobile: "bg-green-500/10 text-green-500",
  voice: "bg-orange-500/10 text-orange-500",
  chat: "bg-purple-500/10 text-purple-500",
}

const channelIcons: Record<string, any> = {
  web: Globe,
  mobile: Smartphone,
  voice: Phone,
  chat: MessageCircle,
}

export default function CustomersPage() {
  const totalSpent = customers.reduce((s, c) => s + c.spent, 0)
  const avgOrder = totalSpent / orders.length || 0
  const repeat = customers.filter((c) => c.orders > 1).length
  const avgLifetimeValue = totalSpent / customers.length || 0
  
  // Customer Segments
  const vipCustomers = customers.filter(c => c.spent > 40000).length
  const regularCustomers = customers.filter(c => c.spent >= 10000 && c.spent <= 40000).length
  const newCustomers = customers.filter(c => c.orders === 1).length
  
  // Channel Distribution
  const channelDistribution = [
    { channel: "web", count: customers.filter(c => c.lastChannel === "web").length, icon: Globe },
    { channel: "mobile", count: customers.filter(c => c.lastChannel === "mobile").length, icon: Smartphone },
    { channel: "voice", count: customers.filter(c => c.lastChannel === "voice").length, icon: Phone },
    { channel: "chat", count: customers.filter(c => c.lastChannel === "chat").length, icon: MessageCircle },
  ]
  
  // Top customers by spending
  const topCustomers = [...customers].sort((a, b) => b.spent - a.spent).slice(0, 5)
  
  // Customer segments for display
  const segments = [
    { 
      name: "VIP Customers", 
      count: vipCustomers, 
      revenue: formatINR(customers.filter(c => c.spent > 40000).reduce((sum, c) => sum + c.spent, 0)),
      icon: Crown,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10"
    },
    { 
      name: "Regular Customers", 
      count: regularCustomers, 
      revenue: formatINR(customers.filter(c => c.spent >= 10000 && c.spent <= 40000).reduce((sum, c) => sum + c.spent, 0)),
      icon: Star,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    { 
      name: "New Customers", 
      count: newCustomers, 
      revenue: formatINR(customers.filter(c => c.orders === 1).reduce((sum, c) => sum + c.spent, 0)),
      icon: Target,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Customers</h1>
          <p className="text-sm sm:text-base text-muted-foreground">View and manage customer relationships</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Filter by Date</span>
            <span className="sm:hidden">Filter</span>
          </Button>
          <Button size="sm">
            <span className="hidden sm:inline">Export Data</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <User className="h-4 w-4" />
            <p className="text-sm">Total Customers</p>
          </div>
          <p className="text-3xl font-bold">{customers.length}</p>
          <p className="text-xs text-muted-foreground mt-1">+{newCustomers} new this week</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendingUp className="h-4 w-4" />
            <p className="text-sm">Total Revenue</p>
          </div>
          <p className="text-3xl font-bold text-emerald-500">{formatINR(totalSpent)}</p>
          <p className="text-xs text-emerald-500 mt-1">+12.5% from last month</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <ShoppingBag className="h-4 w-4" />
            <p className="text-sm">Avg Order Value</p>
          </div>
          <p className="text-3xl font-bold">{formatINR(avgOrder)}</p>
          <p className="text-xs text-muted-foreground mt-1">{orders.length} total orders</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Award className="h-4 w-4" />
            <p className="text-sm">Lifetime Value</p>
          </div>
          <p className="text-3xl font-bold text-primary">{formatINR(avgLifetimeValue)}</p>
          <p className="text-xs text-muted-foreground mt-1">per customer</p>
        </Card>
      </div>

      {/* Customer Segments */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Customer Segments</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {segments.map((segment, idx) => {
            const Icon = segment.icon
            return (
              <Card key={idx} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("flex h-12 w-12 items-center justify-center rounded-lg", segment.bgColor)}>
                    <Icon className={cn("h-6 w-6", segment.color)} />
                  </div>
                  <Badge variant="secondary">{segment.count} customers</Badge>
                </div>
                <h3 className="font-semibold text-lg mb-1">{segment.name}</h3>
                <p className="text-2xl font-bold text-emerald-500">{segment.revenue}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {((segment.count / customers.length) * 100).toFixed(1)}% of customer base
                </p>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Customers */}
        <Card>
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold">Top Customers by Revenue</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topCustomers.map((customer, idx) => (
                <div key={customer.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      {idx === 0 ? (
                        <Crown className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <User className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{customer.name}</p>
                      <p className="text-xs text-muted-foreground">{customer.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-emerald-500">{formatINR(customer.spent)}</p>
                    <Badge variant="secondary" className={cn("text-xs mt-1", channelStyles[customer.lastChannel])}>
                      {customer.lastChannel}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Channel Distribution */}
        <Card>
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold">Customer Distribution by Channel</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {channelDistribution.map((item) => {
                const Icon = item.icon
                const percentage = (item.count / customers.length) * 100
                return (
                  <div key={item.channel}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium capitalize">{item.channel}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold">{item.count} customers</span>
                        <span className="text-xs text-muted-foreground">{percentage.toFixed(0)}%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className={cn("h-full transition-all", 
                          item.channel === "web" && "bg-blue-500",
                          item.channel === "mobile" && "bg-green-500",
                          item.channel === "voice" && "bg-orange-500",
                          item.channel === "chat" && "bg-purple-500"
                        )}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">All Customers</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Repeat Only</Button>
            <Button variant="outline" size="sm">VIP Only</Button>
          </div>
        </div>
        <div className="divide-y divide-border">
          {customers.map((c) => {
            const Icon = channelIcons[c.lastChannel]
            const isVIP = c.spent > 40000
            const isRepeat = c.orders > 1
            return (
              <div
                key={c.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 sm:px-6 py-4 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={cn(
                    "flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full shrink-0",
                    isVIP ? "bg-yellow-500/10" : "bg-primary/10"
                  )}>
                    {isVIP ? (
                      <Crown className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
                    ) : (
                      <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium text-sm sm:text-base">{c.name}</h3>
                      {isVIP && <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 text-xs">VIP</Badge>}
                      {isRepeat && <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 text-xs">Repeat</Badge>}
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{c.id}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    <span>{c.orders} orders</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    <span>{c.sessions} sessions</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" />
                    <span className="font-medium text-emerald-500">{formatINR(c.spent)}</span>
                  </div>
                  <Badge variant="secondary" className={cn("capitalize flex items-center gap-1 text-xs", channelStyles[c.lastChannel])}>
                    <Icon className="h-3 w-3" />
                    {c.lastChannel}
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm">View Details</Button>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
