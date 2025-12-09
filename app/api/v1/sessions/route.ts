// Flutter-ready API: Sessions endpoint for cross-channel context
import { NextResponse } from "next/server"
import { SessionStore } from "@/lib/session-store"
import type { CustomerSession } from "@/lib/data/mock-data"

// GET - Retrieve session
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get("sessionId")
  const customerId = searchParams.get("customerId")

  if (sessionId) {
    const session = SessionStore.get(sessionId)
    if (!session) {
      return NextResponse.json({ success: false, error: "Session not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: session })
  }

  if (customerId) {
    const session = SessionStore.getByCustomerId(customerId)
    if (!session) {
      return NextResponse.json({ success: false, error: "No session for customer" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: session })
  }

  // Return all active sessions (for admin)
  return NextResponse.json({
    success: true,
    data: SessionStore.getActiveSessions(),
  })
}

// POST - Create or resume session
export async function POST(request: Request) {
  const body = await request.json()
  const { customerId, customerName, channel } = body as {
    customerId: string
    customerName: string
    channel: CustomerSession["channel"]
  }

  if (!customerId || !customerName || !channel) {
    return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
  }

  const session = SessionStore.create(customerId, customerName, channel)

  return NextResponse.json({
    success: true,
    data: session,
    isResumed: session.conversationHistory.length > 0,
  })
}

// PATCH - Update session
export async function PATCH(request: Request) {
  const body = await request.json()
  const { sessionId, ...updates } = body

  if (!sessionId) {
    return NextResponse.json({ success: false, error: "Session ID required" }, { status: 400 })
  }

  const session = SessionStore.update(sessionId, updates)
  if (!session) {
    return NextResponse.json({ success: false, error: "Session not found" }, { status: 404 })
  }

  return NextResponse.json({ success: true, data: session })
}
