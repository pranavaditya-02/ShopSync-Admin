// Flutter-ready API: Products endpoint
import { NextResponse } from "next/server"
import { products, getProductById } from "@/lib/data/mock-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const category = searchParams.get("category")
  const search = searchParams.get("search")
  const limit = Number.parseInt(searchParams.get("limit") || "20")

  // Single product lookup
  if (id) {
    const product = getProductById(id)
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: product })
  }

  // Filter products
  let results = [...products]

  if (category) {
    results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase())
  }

  if (search) {
    const searchLower = search.toLowerCase()
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower),
    )
  }

  return NextResponse.json({
    success: true,
    data: results.slice(0, limit),
    total: results.length,
  })
}
