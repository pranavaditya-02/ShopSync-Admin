// Flutter-ready API: Cart management
import { NextResponse } from "next/server"
import { SessionStore } from "@/lib/session-store"
import { getProductById } from "@/lib/data/mock-data"

// GET - Get cart contents
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get("sessionId")

  if (!sessionId) {
    return NextResponse.json({ success: false, error: "Session ID required" }, { status: 400 })
  }

  const session = SessionStore.get(sessionId)
  if (!session) {
    return NextResponse.json({ success: false, error: "Session not found" }, { status: 404 })
  }

  const cartWithPrices = session.cartItems.map((item) => {
    const product = getProductById(item.productId)
    return {
      ...item,
      price: product?.price || 0,
      subtotal: (product?.price || 0) * item.quantity,
      image: product?.image,
    }
  })

  const total = cartWithPrices.reduce((sum, item) => sum + item.subtotal, 0)

  return NextResponse.json({
    success: true,
    data: {
      items: cartWithPrices,
      itemCount: cartWithPrices.reduce((sum, item) => sum + item.quantity, 0),
      total,
    },
  })
}

// POST - Add to cart
export async function POST(request: Request) {
  const body = await request.json()
  const { sessionId, productId, quantity = 1 } = body

  if (!sessionId || !productId) {
    return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
  }

  const session = SessionStore.get(sessionId)
  if (!session) {
    return NextResponse.json({ success: false, error: "Session not found" }, { status: 404 })
  }

  const product = getProductById(productId)
  if (!product) {
    return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
  }

  if (product.inventory < quantity) {
    return NextResponse.json({ success: false, error: "Insufficient inventory" }, { status: 400 })
  }

  const existingItem = session.cartItems.find((i) => i.productId === productId)
  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    session.cartItems.push({ productId, name: product.name, quantity })
  }

  SessionStore.update(sessionId, { cartItems: session.cartItems })

  return NextResponse.json({
    success: true,
    data: { cart: session.cartItems },
  })
}

// DELETE - Remove from cart
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get("sessionId")
  const productId = searchParams.get("productId")

  if (!sessionId || !productId) {
    return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
  }

  const session = SessionStore.get(sessionId)
  if (!session) {
    return NextResponse.json({ success: false, error: "Session not found" }, { status: 404 })
  }

  session.cartItems = session.cartItems.filter((i) => i.productId !== productId)
  SessionStore.update(sessionId, { cartItems: session.cartItems })

  return NextResponse.json({
    success: true,
    data: { cart: session.cartItems },
  })
}
