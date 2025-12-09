import { products, orders, sessions, getProductById, getLowStockProducts } from "@/lib/data/mock-data"

export const agentTools = {
  searchProducts: {
    description: "Search for products by name, category, or description",
    parameters: {
      query: { type: "string", description: "Search query" },
      category: { type: "string", description: "Optional category filter" },
      maxResults: { type: "number", description: "Maximum results to return" },
    },
    execute: async ({ query, category, maxResults = 5 }: { query: string; category?: string; maxResults?: number }) => {
      let results = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()),
      )
      if (category) results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase())
      return results.slice(0, maxResults)
    },
  },

  getProductDetails: {
    description: "Get detailed information about a specific product",
    parameters: { productId: { type: "string", description: "The product ID" } },
    execute: async ({ productId }: { productId: string }) =>
      getProductById(productId) || { error: "Product not found" },
  },

  checkInventory: {
    description: "Check inventory levels for products",
    parameters: {
      productId: { type: "string", description: "Optional product ID for specific product" },
      lowStockOnly: { type: "boolean", description: "Only return low stock items" },
    },
    execute: async ({ productId, lowStockOnly }: { productId?: string; lowStockOnly?: boolean }) => {
      if (productId) {
        const p = getProductById(productId)
        return p ? { id: p.id, name: p.name, inventory: p.inventory } : { error: "Product not found" }
      }
      if (lowStockOnly) return getLowStockProducts().map((p) => ({ id: p.id, name: p.name, inventory: p.inventory }))
      return products.map((p) => ({ id: p.id, name: p.name, inventory: p.inventory }))
    },
  },

  addToCart: {
    description: "Add a product to the customer's cart",
    parameters: {
      sessionId: { type: "string", description: "Customer session ID" },
      productId: { type: "string", description: "Product to add" },
      quantity: { type: "number", description: "Quantity to add" },
    },
    execute: async ({
      sessionId,
      productId,
      quantity = 1,
    }: { sessionId: string; productId: string; quantity?: number }) => {
      const session = sessions.find((s) => s.id === sessionId)
      const product = getProductById(productId)
      if (!session) return { error: "Session not found" }
      if (!product) return { error: "Product not found" }
      if (product.inventory < quantity) return { error: "Insufficient inventory" }

      const existing = session.cartItems.find((i) => i.productId === productId)
      if (existing) existing.quantity += quantity
      else session.cartItems.push({ productId, name: product.name, quantity })
      return { success: true, cart: session.cartItems }
    },
  },

  removeFromCart: {
    description: "Remove a product from the customer's cart",
    parameters: {
      sessionId: { type: "string", description: "Customer session ID" },
      productId: { type: "string", description: "Product to remove" },
    },
    execute: async ({ sessionId, productId }: { sessionId: string; productId: string }) => {
      const session = sessions.find((s) => s.id === sessionId)
      if (!session) return { error: "Session not found" }
      session.cartItems = session.cartItems.filter((i) => i.productId !== productId)
      return { success: true, cart: session.cartItems }
    },
  },

  getCart: {
    description: "Get the current cart contents",
    parameters: { sessionId: { type: "string", description: "Customer session ID" } },
    execute: async ({ sessionId }: { sessionId: string }) => {
      const session = sessions.find((s) => s.id === sessionId)
      if (!session) return { error: "Session not found" }
      const items = session.cartItems.map((item) => {
        const p = getProductById(item.productId)
        return { ...item, price: p?.price || 0, subtotal: (p?.price || 0) * item.quantity }
      })
      return { items, total: items.reduce((sum, i) => sum + i.subtotal, 0) }
    },
  },

  createOrder: {
    description: "Create a new order from the cart",
    parameters: { sessionId: { type: "string", description: "Customer session ID" } },
    execute: async ({ sessionId }: { sessionId: string }) => {
      const session = sessions.find((s) => s.id === sessionId)
      if (!session) return { error: "Session not found" }
      if (!session.cartItems.length) return { error: "Cart is empty" }

      const items = session.cartItems.map((item) => {
        const p = getProductById(item.productId)
        return { productId: item.productId, name: item.name, quantity: item.quantity, price: p?.price || 0 }
      })
      const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

      const order = {
        id: `ord_${Date.now()}`,
        customerId: session.customerId,
        customerName: session.customerName,
        items,
        total,
        status: "pending" as const,
        channel: session.channel,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      orders.push(order)
      session.cartItems = []
      return { success: true, order }
    },
  },

  getOrderStatus: {
    description: "Get the status of an order",
    parameters: {
      orderId: { type: "string", description: "Order ID" },
      customerId: { type: "string", description: "Customer ID for verification" },
    },
    execute: async ({ orderId, customerId }: { orderId: string; customerId?: string }) => {
      const order = orders.find((o) => o.id === orderId)
      if (!order) return { error: "Order not found" }
      if (customerId && order.customerId !== customerId) return { error: "Order not found" }
      return {
        id: order.id,
        status: order.status,
        items: order.items,
        total: order.total,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      }
    },
  },

  escalateToHuman: {
    description: "Escalate the conversation to a human agent",
    parameters: {
      sessionId: { type: "string", description: "Customer session ID" },
      reason: { type: "string", description: "Reason for escalation" },
    },
    execute: async ({ reason }: { sessionId: string; reason: string }) => ({
      success: true,
      message: "A human agent will be with you shortly.",
      escalationId: `esc_${Date.now()}`,
      reason,
    }),
  },
}

export type AgentToolName = keyof typeof agentTools

export function searchProducts(query: string, maxResults = 5) {
  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()),
    )
    .slice(0, maxResults)
}

export function getOrderStatus(orderId: string) {
  return orders.find((o) => o.id === orderId) || null
}
