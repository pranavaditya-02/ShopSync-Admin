"use client"

import { useState, useMemo } from "react"
import { products, getCategories, getBrands } from "@/lib/data/mock-data"
import { formatINR } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Star, AlertTriangle, Search, SlidersHorizontal, X } from "lucide-react"

export default function ProductsPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000])
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "rating" | "name">("name")
  const [showFilters, setShowFilters] = useState(true)
  const [stockFilter, setStockFilter] = useState<"all" | "in-stock" | "low-stock">("all")

  const categories = getCategories()
  const brands = getBrands()

  const filtered = useMemo(() => {
    let result = [...products]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
    }
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory)
    if (selectedBrand) result = result.filter((p) => p.brand === selectedBrand)
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    if (stockFilter === "in-stock") result = result.filter((p) => p.inventory >= 20)
    if (stockFilter === "low-stock") result = result.filter((p) => p.inventory < 20)

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        result.sort((a, b) => a.name.localeCompare(b.name))
    }

    return result
  }, [search, selectedCategory, selectedBrand, priceRange, sortBy, stockFilter])

  const totalInventory = products.reduce((s, p) => s + p.inventory, 0)
  const lowStock = products.filter((p) => p.inventory < 20).length
  const activeFilters = [selectedCategory, selectedBrand, stockFilter !== "all"].filter(Boolean).length

  function clearFilters() {
    setSearch("")
    setSelectedCategory(null)
    setSelectedBrand(null)
    setPriceRange([0, 50000])
    setSortBy("name")
    setStockFilter("all")
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Products</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Manage your product catalog and inventory</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <p className="text-xs sm:text-sm text-muted-foreground">Total Products</p>
          <p className="mt-2 text-2xl sm:text-3xl font-bold">{products.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <p className="text-xs sm:text-sm text-muted-foreground">Total Inventory</p>
          <p className="mt-2 text-2xl sm:text-3xl font-bold">{totalInventory.toLocaleString("en-IN")}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <p className="text-xs sm:text-sm text-muted-foreground">Categories</p>
          <p className="mt-2 text-2xl sm:text-3xl font-bold">{categories.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <p className="text-xs sm:text-sm text-muted-foreground">Low Stock</p>
          <p className="mt-2 text-2xl sm:text-3xl font-bold text-amber-500">{lowStock}</p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="border-b border-border px-6 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">Product Catalog</h2>
              <Badge variant="secondary">{filtered.length} items</Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button
                variant={showFilters ? "secondary" : "outline"}
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                {activeFilters > 0 && (
                  <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                    {activeFilters}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex flex-wrap gap-3">
                <select
                  value={selectedCategory || ""}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedBrand || ""}
                  onChange={(e) => setSelectedBrand(e.target.value || null)}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="">All Brands</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>

                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value as typeof stockFilter)}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="all">All Stock</option>
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="name">Sort: Name</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Price:</span>
                  <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                    className="w-24 h-9"
                    placeholder="Min"
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                    className="w-24 h-9"
                    placeholder="Max"
                  />
                </div>

                {activeFilters > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-1" /> Clear
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="group rounded-lg border border-border bg-secondary/30 p-4 transition-all hover:bg-secondary/50 hover:shadow-md"
            >
              <div className="mb-3 aspect-square overflow-hidden rounded-lg bg-secondary">
                <img
                  src={p.image || "/placeholder.svg"}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-foreground line-clamp-2 text-sm">{p.name}</h3>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{p.brand}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{formatINR(p.price)}</span>
                  <div className="flex items-center gap-1 text-sm text-yellow-500">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="text-xs">{p.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <Badge variant="outline" className="text-xs">
                    {p.category}
                  </Badge>
                  <span
                    className={cn(
                      "flex items-center gap-1 text-xs",
                      p.inventory < 20 ? "text-amber-500" : "text-muted-foreground",
                    )}
                  >
                    {p.inventory < 20 && <AlertTriangle className="h-3 w-3" />}
                    {p.inventory} left
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No products found matching your filters</p>
            <Button variant="link" onClick={clearFilters}>
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
