import { generateText, streamText } from "ai"
import { agentTools, searchProducts, getOrderStatus } from "./agent-tools"

export type AgentRole = "orchestrator" | "product" | "order" | "support"

export interface AgentContext {
  sessionId: string
  customerId: string
  customerName: string
  channel: string
  conversationHistory: { role: "user" | "assistant"; content: string }[]
}

const prompts: Record<AgentRole, string> = {
  orchestrator: `You are the ShopSync Orchestrator. Analyze customer messages and classify intent as:
- PRODUCT: searches, recommendations, inventory questions
- ORDER: placement, status, modifications
- SUPPORT: complaints, returns, general help
Respond with JSON: { "intent": "PRODUCT|ORDER|SUPPORT", "confidence": 0.0-1.0, "summary": "brief description" }`,

  product: `You are the ShopSync Product Agent. Help customers find products, provide details, make recommendations. Be helpful and conversational.`,

  order: `You are the ShopSync Order Agent. Help with cart management, orders, status checks. Be efficient and confirm actions before executing.`,

  support: `You are the ShopSync Support Agent. Resolve issues, process returns, answer questions. Be empathetic and solution-oriented.`,
}

function fallbackResponse(msg: string, role: AgentRole): string {
  const q = msg.toLowerCase()

  if (
    role === "product" ||
    q.includes("product") ||
    q.includes("find") ||
    q.includes("search") ||
    q.includes("looking")
  ) {
    const results = searchProducts(q)
    if (results.length) {
      const list = results
        .slice(0, 3)
        .map((p) => `- **${p.name}** - $${p.price} (${p.inventory} in stock)`)
        .join("\n")
      return `I found some products:\n\n${list}\n\nWant more details on any of these?`
    }
    return "I'd be happy to help you find products! What are you looking for? Electronics, fitness gear, home office items?"
  }

  if (role === "order" || q.includes("order") || q.includes("status") || q.includes("track")) {
    const match = msg.match(/ord_\d+/i)
    if (match) {
      const order = getOrderStatus(match[0])
      if (order) {
        return `Found your order ${order.id}:\n- **Status**: ${order.status}\n- **Items**: ${order.items.length} item(s)\n- **Total**: $${order.total.toFixed(2)}\n\nAnything else about this order?`
      }
    }
    return "I can help with orders! Give me your order ID (like ord_001) and I'll look it up."
  }

  if (q.includes("cart") || q.includes("add") || q.includes("buy")) {
    return "I can help with your cart! Add items from the product list or tell me what you want."
  }

  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return "Hello! Welcome to ShopSync. I can help you find products, track orders, or answer questions. What do you need?"
  }

  return "I'm here to help! I can:\n- **Find products** - tell me what you need\n- **Track orders** - give me your order ID\n- **Make recommendations** - ask away\n\nWhat would you like?"
}

export async function orchestrateRequest(
  message: string,
  context: AgentContext,
): Promise<{ intent: string; confidence: number; summary: string }> {
  try {
    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: prompts.orchestrator,
      prompt: `Customer: "${message}"\nContext: ${JSON.stringify(context)}`,
    })
    return JSON.parse(text)
  } catch {
    const q = message.toLowerCase()
    if (q.includes("order") || q.includes("status") || q.includes("track") || q.includes("shipping")) {
      return { intent: "ORDER", confidence: 0.7, summary: "Order query" }
    }
    if (
      q.includes("product") ||
      q.includes("find") ||
      q.includes("search") ||
      q.includes("recommend") ||
      q.includes("buy") ||
      q.includes("looking")
    ) {
      return { intent: "PRODUCT", confidence: 0.7, summary: "Product query" }
    }
    return { intent: "SUPPORT", confidence: 0.5, summary: "General query" }
  }
}

export async function handleAgentRequest(
  role: AgentRole,
  message: string,
  context: AgentContext,
  onStream?: (chunk: string) => void,
): Promise<string> {
  const systemPrompt = `${prompts[role]}

Session: ${context.sessionId} | Customer: ${context.customerName} | Channel: ${context.channel}

Tools available:
${Object.entries(agentTools)
  .map(([name, t]) => `- ${name}: ${t.description}`)
  .join("\n")}

Respond naturally.`

  try {
    if (onStream) {
      const { textStream } = streamText({
        model: "openai/gpt-4o-mini",
        system: systemPrompt,
        messages: [
          ...context.conversationHistory.map((m) => ({ role: m.role, content: m.content })),
          { role: "user" as const, content: message },
        ],
      })
      let response = ""
      for await (const chunk of textStream) {
        response += chunk
        onStream(chunk)
      }
      return response
    }

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      system: systemPrompt,
      messages: [
        ...context.conversationHistory.map((m) => ({ role: m.role, content: m.content })),
        { role: "user" as const, content: message },
      ],
    })
    return text
  } catch {
    return fallbackResponse(message, role)
  }
}

export async function processCustomerMessage(
  message: string,
  context: AgentContext,
  onStream?: (chunk: string) => void,
): Promise<string> {
  const { intent } = await orchestrateRequest(message, context)
  const roleMap: Record<string, AgentRole> = { PRODUCT: "product", ORDER: "order", SUPPORT: "support" }
  return handleAgentRequest(roleMap[intent] || "support", message, context, onStream)
}
