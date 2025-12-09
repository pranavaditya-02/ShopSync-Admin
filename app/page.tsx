import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bot, ShoppingCart, BarChart3, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">ShopSync</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Admin Dashboard
            </Link>
            <Link href="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Shop Demo
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            AI-Powered
            <br />
            <span className="text-primary">Shopping Agents</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            ShopSync provides intelligent shopping assistance across all channels - web, mobile, and voice. Our AI
            agents handle product discovery, recommendations, and order processing seamlessly.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/admin">
                Open Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/shop">Try Shop Demo</Link>
            </Button>
          </div>
        </div>

        <div className="mt-24 grid gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">Multi-Agent System</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Orchestrator routes requests to specialized agents for products, orders, and support.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
              <ShoppingCart className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">Cross-Channel</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Unified experience across web, mobile apps, and voice assistants with shared context.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10">
              <BarChart3 className="h-6 w-6 text-cyan-500" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">Real-Time Analytics</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Monitor agent performance, track orders, and manage inventory from one dashboard.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
