"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/data/mock-data"
import { formatINR } from "@/lib/utils"
import { Bot, Send, ShoppingCart, ArrowLeft, Plus, X, Loader2, Star } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "assistant"
  content: string
}
interface CartItem {
  productId: string
  name: string
  quantity: number
  price: number
  image?: string
}

export default function ShopPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Namaste! I'm your ShopSync assistant. How can I help you find products today?" },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [search, setSearch] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("/api/v1/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId: `guest_${Date.now()}`, customerName: "Guest User", channel: "web" }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setSessionId(d.data.id)
          if (d.isResumed && d.data.cartItems?.length) {
            fetch(`/api/v1/cart?sessionId=${d.data.id}`)
              .then((r) => r.json())
              .then((c) => c.success && setCart(c.data.items))
          }
        }
      })
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function send() {
    if (!input.trim() || !sessionId || loading) return
    const msg = input.trim()
    setInput("")
    setMessages((m) => [...m, { role: "user", content: msg }])
    setLoading(true)

    try {
      const res = await fetch("/api/v1/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: msg }),
      })
      const data = await res.json()
      if (data.success) {
        setMessages((m) => [...m, { role: "assistant", content: data.data.response }])
        if (data.data.cart) {
          const c = await fetch(`/api/v1/cart?sessionId=${sessionId}`).then((r) => r.json())
          if (c.success) setCart(c.data.items)
        }
      }
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, something went wrong. Please try again." }])
    } finally {
      setLoading(false)
    }
  }

  async function addToCart(productId: string) {
    if (!sessionId) return
    await fetch("/api/v1/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, productId, quantity: 1 }),
    })
    const c = await fetch(`/api/v1/cart?sessionId=${sessionId}`).then((r) => r.json())
    if (c.success) setCart(c.data.items)
  }

  async function removeFromCart(productId: string) {
    if (!sessionId) return
    await fetch(`/api/v1/cart?sessionId=${sessionId}&productId=${productId}`, { method: "DELETE" })
    setCart((c) => c.filter((i) => i.productId !== productId))
  }

  const total = cart.reduce((s, i) => s + (i.price || 0) * i.quantity, 0)
  const count = cart.reduce((s, i) => s + i.quantity, 0)
  const filteredProducts = search
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()),
      )
    : products

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-80 flex-col border-r border-border lg:flex">
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back</span>
          </Link>
          <h2 className="font-semibold">Products</h2>
        </div>
        <div className="p-3 border-b border-border">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9"
          />
        </div>
        <div className="flex-1 overflow-auto p-3">
          <div className="space-y-3">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="rounded-lg border border-border bg-card p-3 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-secondary">
                    <img src={p.image || "/placeholder.svg"} alt={p.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">{p.brand}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-semibold text-primary">{formatINR(p.price)}</span>
                      <div className="flex items-center gap-0.5 text-yellow-500">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs">{p.rating}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="secondary" className="mt-2 h-7 text-xs" onClick={() => addToCart(p.id)}>
                      <Plus className="mr-1 h-3 w-3" /> Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-border px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold">ShopSync Assistant</h1>
              <p className="text-xs text-muted-foreground">AI-powered shopping help</p>
            </div>
          </div>
          <Button variant="outline" className="relative bg-transparent" onClick={() => setShowCart(!showCart)}>
            <ShoppingCart className="h-4 w-4" />
            {count > 0 && <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs">{count}</Badge>}
          </Button>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col">
            <div className="flex-1 overflow-auto p-6">
              <div className="mx-auto max-w-2xl space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}>
                    {m.role === "assistant" && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2",
                        m.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary",
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="rounded-2xl bg-secondary px-4 py-2">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>

            <div className="border-t border-border p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  send()
                }}
                className="mx-auto flex max-w-2xl gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about products, orders, or recommendations..."
                  className="flex-1"
                  disabled={loading || !sessionId}
                />
                <Button type="submit" disabled={loading || !sessionId || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>

          {showCart && (
            <aside className="w-80 border-l border-border bg-card">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-border p-4">
                  <h2 className="font-semibold">Your Cart</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowCart(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  {!cart.length ? (
                    <p className="text-center text-sm text-muted-foreground">Your cart is empty</p>
                  ) : (
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.productId} className="flex items-center gap-3 rounded-lg bg-secondary p-3">
                          {item.image && (
                            <div className="relative h-12 w-12 overflow-hidden rounded-md">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatINR(item.price)} x {item.quantity}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.productId)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {cart.length > 0 && (
                  <div className="border-t border-border p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-medium">Total</span>
                      <span className="text-lg font-semibold">{formatINR(total)}</span>
                    </div>
                    <Button className="w-full">Checkout</Button>
                  </div>
                )}
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  )
}
