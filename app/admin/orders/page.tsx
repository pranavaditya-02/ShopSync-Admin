import type React from "react"
import { orders } from "@/lib/data/mock-data"
import { formatINR } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Package, Truck, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react"

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  confirmed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  processing: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  shipped: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  delivered: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
}

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="h-4 w-4" />,
  confirmed: <AlertCircle className="h-4 w-4" />,
  processing: <Package className="h-4 w-4" />,
  shipped: <Truck className="h-4 w-4" />,
  delivered: <CheckCircle className="h-4 w-4" />,
  cancelled: <XCircle className="h-4 w-4" />,
}

const channelStyles: Record<string, string> = {
  web: "bg-blue-500/10 text-blue-500",
  mobile: "bg-green-500/10 text-green-500",
  voice: "bg-orange-500/10 text-orange-500",
  chat: "bg-purple-500/10 text-purple-500",
}

export default function OrdersPage() {
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
  const pending = orders.filter((o) => o.status === "pending").length
  const shipped = orders.filter((o) => o.status === "shipped").length

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Orders</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Manage and track all customer orders</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <p className="text-xs sm:text-sm text-muted-foreground">Total Orders</p>
          <p className="mt-2 text-2xl sm:text-3xl font-bold">{orders.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <p className="text-xs sm:text-sm text-muted-foreground">Total Revenue</p>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-emerald-500">{formatINR(totalRevenue)}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <p className="text-xs sm:text-sm text-muted-foreground">Pending</p>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-yellow-500">{pending}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <p className="text-xs sm:text-sm text-muted-foreground">Shipped</p>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-cyan-500">{shipped}</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-4 sm:px-6 py-3 sm:py-4">
          <h2 className="text-base sm:text-lg font-semibold">All Orders</h2>
        </div>
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Channel
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono">{order.id}</td>
                  <td className="px-6 py-4 text-sm">{order.customerName}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground max-w-[200px] truncate">
                    {order.items.map((i) => i.name).join(", ")}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{formatINR(order.total)}</td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary" className={cn("capitalize", channelStyles[order.channel])}>
                      {order.channel}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="outline"
                      className={cn("capitalize flex w-fit items-center gap-1", statusStyles[order.status])}
                    >
                      {statusIcons[order.status]}
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden divide-y divide-border">
          {orders.map((order) => (
            <div key={order.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-mono text-muted-foreground">{order.id}</p>
                  <p className="text-sm font-medium mt-1">{order.customerName}</p>
                </div>
                <Badge
                  variant="outline"
                  className={cn("capitalize flex items-center gap-1 text-xs", statusStyles[order.status])}
                >
                  {statusIcons[order.status]}
                  {order.status}
                </Badge>
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                {order.items.map((i) => i.name).join(", ")}
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={cn("capitalize text-xs", channelStyles[order.channel])}>
                    {order.channel}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <span className="text-sm sm:text-base font-semibold">{formatINR(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
