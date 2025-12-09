import { agentMetrics } from "@/lib/data/mock-data"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Bot, Zap, Clock, CheckCircle, MessageSquare, ShoppingCart, Activity, TrendingUp, AlertCircle, ThumbsUp, ThumbsDown, Settings, BarChart3, Package, Search, Headphones, Brain, Target, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const agents = [
  {
    id: "orchestrator",
    name: "Orchestrator Agent",
    role: "Routes requests to specialized agents",
    description: "Analyzes user intent and delegates to appropriate specialized agents",
    status: "active",
    tasksHandled: 1247,
    avgResponseTime: 0.3,
    successRate: 98.5,
    uptime: 99.9,
    currentLoad: 23,
    maxLoad: 100,
    icon: Brain,
    capabilities: ["Intent Classification", "Agent Routing", "Context Management", "Response Coordination"],
  },
  {
    id: "product",
    name: "Product Agent",
    role: "Product search, recommendations, comparisons",
    description: "Handles product discovery, filtering, and personalized recommendations",
    status: "active",
    tasksHandled: 523,
    avgResponseTime: 1.1,
    successRate: 94.2,
    uptime: 99.7,
    currentLoad: 18,
    maxLoad: 50,
    icon: Package,
    capabilities: ["Semantic Search", "Product Filtering", "Recommendations", "Price Comparisons"],
  },
  {
    id: "order",
    name: "Order Agent",
    role: "Order tracking, status updates, modifications",
    description: "Manages order lifecycle, tracking, and customer order inquiries",
    status: "active",
    tasksHandled: 342,
    avgResponseTime: 0.9,
    successRate: 96.8,
    uptime: 99.8,
    currentLoad: 12,
    maxLoad: 40,
    icon: ShoppingCart,
    capabilities: ["Order Tracking", "Status Updates", "Order Modifications", "Refund Processing"],
  },
  {
    id: "support",
    name: "Support Agent",
    role: "General inquiries, returns, complaints",
    description: "Provides customer support, handles returns, and resolves issues",
    status: "active",
    tasksHandled: 382,
    avgResponseTime: 1.4,
    successRate: 92.3,
    uptime: 99.6,
    currentLoad: 15,
    maxLoad: 35,
    icon: Headphones,
    capabilities: ["Issue Resolution", "Return Management", "FAQ Responses", "Escalation Handling"],
  },
]

const conversationInsights = [
  { type: "Product Inquiries", count: 523, percentage: 42, trend: "+8%", color: "bg-blue-500" },
  { type: "Order Status", count: 342, percentage: 27, trend: "+5%", color: "bg-green-500" },
  { type: "Support Requests", count: 382, percentage: 31, trend: "+12%", color: "bg-orange-500" },
]

const performanceMetrics = [
  { metric: "Response Time", value: "1.2s", target: "< 2s", status: "good", icon: Clock },
  { metric: "Accuracy Rate", value: "94.7%", target: "> 90%", status: "good", icon: Target },
  { metric: "User Satisfaction", value: "4.6/5", target: "> 4.0", status: "good", icon: ThumbsUp },
  { metric: "Resolution Rate", value: "89.3%", target: "> 85%", status: "good", icon: CheckCircle },
]

const recentActivity = [
  { agent: "Product Agent", action: "Processed product recommendation", time: "2 min ago", status: "success" },
  { agent: "Order Agent", action: "Updated order status for ORD_123", time: "5 min ago", status: "success" },
  { agent: "Support Agent", action: "Resolved return request", time: "8 min ago", status: "success" },
  { agent: "Orchestrator Agent", action: "Routed 23 conversations", time: "12 min ago", status: "info" },
]

export default function AgentsPage() {
  const totalTasks = agents.reduce((sum, a) => sum + a.tasksHandled, 0)
  const avgSuccessRate = agents.reduce((sum, a) => sum + a.successRate, 0) / agents.length

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">AI Agents</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Monitor and manage your AI shopping assistants</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Button variant="outline" size="sm">
              <BarChart3 className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">View Analytics</span>
              <span className="sm:hidden">Analytics</span>
            </Button>
            <Button size="sm">
              <Settings className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Configure Agents</span>
              <span className="sm:hidden">Configure</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <MessageSquare className="h-4 w-4" />
              <p className="text-sm">Total Conversations</p>
            </div>
            <p className="text-3xl font-bold text-foreground">{agentMetrics.totalConversations}</p>
            <p className="text-xs text-emerald-500 mt-1">+18% from last week</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Zap className="h-4 w-4" />
              <p className="text-sm">Active Now</p>
            </div>
            <p className="text-3xl font-bold text-emerald-500">{agentMetrics.activeConversations}</p>
            <p className="text-xs text-muted-foreground mt-1">Across all channels</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Clock className="h-4 w-4" />
              <p className="text-sm">Avg Response</p>
            </div>
            <p className="text-3xl font-bold text-foreground">{agentMetrics.avgResponseTime}s</p>
            <p className="text-xs text-emerald-500 mt-1">-0.3s improvement</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <CheckCircle className="h-4 w-4" />
              <p className="text-sm">Success Rate</p>
            </div>
            <p className="text-3xl font-bold text-emerald-500">{agentMetrics.successRate}%</p>
            <p className="text-xs text-muted-foreground mt-1">Target: &gt;90%</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <ShoppingCart className="h-4 w-4" />
              <p className="text-sm">Orders Processed</p>
            </div>
            <p className="text-3xl font-bold text-foreground">{agentMetrics.ordersProcessed}</p>
            <p className="text-xs text-emerald-500 mt-1">+24 from yesterday</p>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Activity className="h-4 w-4" />
              <p className="text-sm">Queries Handled</p>
            </div>
            <p className="text-3xl font-bold text-foreground">{agentMetrics.queriesHandled}</p>
            <p className="text-xs text-muted-foreground mt-1">{totalTasks} total tasks</p>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Performance Overview</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {performanceMetrics.map((metric, idx) => {
              const Icon = metric.icon
              return (
                <Card key={idx} className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{metric.metric}</p>
                      <p className="text-lg font-bold">{metric.value}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">Target: {metric.target}</span>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500">
                      On Track
                    </Badge>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Conversation Breakdown */}
          <Card>
            <div className="border-b border-border px-6 py-4">
              <h2 className="text-lg font-semibold text-foreground">Conversation Breakdown</h2>
            </div>
            <div className="p-6 space-y-4">
              {conversationInsights.map((insight, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{insight.type}</span>
                      <span className="text-xs text-emerald-500">{insight.trend}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold">{insight.count}</span>
                      <span className="text-xs text-muted-foreground ml-1">({insight.percentage}%)</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className={cn("h-full transition-all", insight.color)}
                      style={{ width: `${insight.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card>
            <div className="border-b border-border px-6 py-4">
              <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full mt-0.5",
                      activity.status === "success" ? "bg-emerald-500/10" : "bg-blue-500/10"
                    )}>
                      {activity.status === "success" ? (
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Activity className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">{activity.agent}</Badge>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <Card>
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-lg font-semibold text-foreground">Agent Fleet</h2>
          </div>
          <div className="grid gap-4 p-6 lg:grid-cols-2">
            {agents.map((agent) => {
              const Icon = agent.icon
              const loadPercentage = (agent.currentLoad / agent.maxLoad) * 100
              return (
                <div
                  key={agent.id}
                  className="rounded-lg border border-border bg-secondary/30 p-6 transition-colors hover:bg-secondary/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{agent.name}</h3>
                        <p className="text-sm text-muted-foreground">{agent.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                        Active
                      </Badge>
                      <span className="text-xs text-muted-foreground">{agent.uptime}% uptime</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-4">{agent.description}</p>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="rounded-lg bg-background p-3">
                      <p className="text-xs text-muted-foreground">Tasks</p>
                      <p className="mt-1 text-lg font-bold text-foreground">{agent.tasksHandled}</p>
                    </div>
                    <div className="rounded-lg bg-background p-3">
                      <p className="text-xs text-muted-foreground">Response</p>
                      <p className="mt-1 text-lg font-bold text-foreground">{agent.avgResponseTime}s</p>
                    </div>
                    <div className="rounded-lg bg-background p-3">
                      <p className="text-xs text-muted-foreground">Success</p>
                      <p className="mt-1 text-lg font-bold text-emerald-500">{agent.successRate}%</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">Current Load</span>
                      <span className="text-xs text-muted-foreground">
                        {agent.currentLoad}/{agent.maxLoad}
                      </span>
                    </div>
                    <Progress value={loadPercentage} className="h-2" />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Capabilities</p>
                    <div className="flex flex-wrap gap-1.5">
                      {agent.capabilities.map((capability, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
