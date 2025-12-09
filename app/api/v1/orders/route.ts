// Flutter-ready API: Orders endpoint
import { NextResponse } from "next/server"
import { orders, getOrderById } from "@/lib/data/mock-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const customerId = searchParams.get("customerId")
  const status = searchParams.get("status")

  // Single order lookup
  if (id) {
    const order = getOrderById(id)
    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
    }
    // Verify customer ownership if customerId provided
    if (customerId && order.customerId !== customerId) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: order })
  }

  // Filter orders
  let results = [...orders]

  if (customerId) {
    results = results.filter((o) => o.customerId === customerId)
  }

  if (status) {
    results = results.filter((o) => o.status === status)
  }

  // Sort by most recent
  results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return NextResponse.json({
    success: true,
    data: results,
    total: results.length,
  })
}
