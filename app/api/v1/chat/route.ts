// Flutter-ready API: AI Chat endpoint
import { NextResponse } from "next/server"
import { SessionStore } from "@/lib/session-store"
import { processCustomerMessage } from "@/lib/ai/agents"

export async function POST(request: Request) {
  const body = await request.json()
  const { sessionId, message } = body as { sessionId: string; message: string }

  if (!sessionId || !message) {
    return NextResponse.json({ success: false, error: "Missing sessionId or message" }, { status: 400 })
  }

  const session = SessionStore.get(sessionId)
  if (!session) {
    return NextResponse.json({ success: false, error: "Session not found" }, { status: 404 })
  }

  // Add user message to history
  SessionStore.addMessage(sessionId, "user", message)

  try {
    // Process through AI agent system
    const response = await processCustomerMessage(message, {
      sessionId: session.id,
      customerId: session.customerId,
      customerName: session.customerName,
      channel: session.channel,
      conversationHistory: session.conversationHistory.slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      })),
    })

    // Add assistant response to history
    SessionStore.addMessage(sessionId, "assistant", response)

    // Get updated session with cart
    const updatedSession = SessionStore.get(sessionId)

    return NextResponse.json({
      success: true,
      data: {
        response,
        cart: updatedSession?.cartItems || [],
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json({ success: false, error: "Failed to process message" }, { status: 500 })
  }
}
