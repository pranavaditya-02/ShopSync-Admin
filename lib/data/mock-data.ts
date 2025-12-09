export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  inventory: number
  image: string
  rating: number
  reviews: number
  brand: string
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  items: { productId: string; name: string; quantity: number; price: number }[]
  total: number
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  channel: "web" | "mobile" | "voice" | "chat"
  createdAt: string
  updatedAt: string
}

export interface CustomerSession {
  id: string
  customerId: string
  customerName: string
  channel: "web" | "mobile" | "voice" | "chat"
  status: "active" | "idle" | "completed"
  cartItems: { productId: string; name: string; quantity: number }[]
  lastActivity: string
  conversationHistory: { role: "user" | "assistant"; content: string; timestamp: string }[]
}

export interface AgentMetrics {
  totalConversations: number
  activeConversations: number
  avgResponseTime: number
  successRate: number
  ordersProcessed: number
  queriesHandled: number
}

export const products: Product[] = [
  {
    id: "prod_001",
    name: "Sony WH-1000XM5 Wireless Headphones",
    description: "Industry-leading noise cancellation with 30-hour battery",
    price: 29990,
    category: "Electronics",
    inventory: 45,
    image: "/sony-wireless-headphones-black-premium.jpg",
    rating: 4.8,
    reviews: 1247,
    brand: "Sony",
  },
  {
    id: "prod_002",
    name: "Apple Watch Series 9",
    description: "Advanced health monitoring with GPS and always-on display",
    price: 41900,
    category: "Electronics",
    inventory: 32,
    image: "/apple-watch-series-9-silver.jpg",
    rating: 4.6,
    reviews: 892,
    brand: "Apple",
  },
  {
    id: "prod_003",
    name: "Blue Tokai Coffee Beans",
    description: "Single-origin Arabica from Chikmagalur, 250g pack",
    price: 599,
    category: "Food & Beverage",
    inventory: 156,
    image: "/premium-coffee-beans-pack-brown.jpg",
    rating: 4.9,
    reviews: 2341,
    brand: "Blue Tokai",
  },
  {
    id: "prod_004",
    name: "Green Soul Monster Ultimate",
    description: "Ergonomic gaming chair with lumbar support and footrest",
    price: 24999,
    category: "Furniture",
    inventory: 12,
    image: "/black-gaming-chair-ergonomic.jpg",
    rating: 4.7,
    reviews: 567,
    brand: "Green Soul",
  },
  {
    id: "prod_005",
    name: "JBL Flip 6 Bluetooth Speaker",
    description: "Waterproof portable speaker with 12-hour playtime",
    price: 9999,
    category: "Electronics",
    inventory: 89,
    image: "/jbl-bluetooth-speaker-blue-portable.jpg",
    rating: 4.5,
    reviews: 1823,
    brand: "JBL",
  },
  {
    id: "prod_006",
    name: "Boldfit Yoga Mat 6mm",
    description: "Anti-skid NBR material, includes carrying strap",
    price: 799,
    category: "Sports",
    inventory: 67,
    image: "/purple-yoga-mat-rolled-fitness.jpg",
    rating: 4.8,
    reviews: 934,
    brand: "Boldfit",
  },
  {
    id: "prod_007",
    name: "Milton Thermosteel Flask 1L",
    description: "24hr hot/cold retention, leak-proof steel bottle",
    price: 1299,
    category: "Home",
    inventory: 203,
    image: "/steel-water-bottle-flask-silver.jpg",
    rating: 4.7,
    reviews: 1456,
    brand: "Milton",
  },
  {
    id: "prod_008",
    name: "Philips LED Desk Lamp",
    description: "Eye comfort tech, 4 brightness levels, USB charging",
    price: 2499,
    category: "Home",
    inventory: 78,
    image: "/modern-led-desk-lamp-white.jpg",
    rating: 4.6,
    reviews: 723,
    brand: "Philips",
  },
  {
    id: "prod_009",
    name: "Samsung Galaxy Buds2 Pro",
    description: "Active noise cancellation, 360 audio, IPX7 rated",
    price: 17999,
    category: "Electronics",
    inventory: 54,
    image: "/samsung-galaxy-buds-wireless-earbuds.jpg",
    rating: 4.4,
    reviews: 1089,
    brand: "Samsung",
  },
  {
    id: "prod_010",
    name: "Prestige Induction Cooktop",
    description: "2000W power, auto voltage regulator, touch panel",
    price: 2999,
    category: "Home",
    inventory: 41,
    image: "/black-induction-cooktop-kitchen.jpg",
    rating: 4.3,
    reviews: 2156,
    brand: "Prestige",
  },
  {
    id: "prod_011",
    name: "Levi's 511 Slim Fit Jeans",
    description: "Stretch denim, classic indigo wash, all sizes",
    price: 2799,
    category: "Fashion",
    inventory: 128,
    image: "/blue-denim-jeans-folded.jpg",
    rating: 4.5,
    reviews: 3421,
    brand: "Levi's",
  },
  {
    id: "prod_012",
    name: "Nike Air Max 270",
    description: "Mesh upper, Max Air unit, lifestyle running shoe",
    price: 12995,
    category: "Fashion",
    inventory: 36,
    image: "/nike-air-max-shoes-white-black.jpg",
    rating: 4.7,
    reviews: 1876,
    brand: "Nike",
  },
  {
    id: "prod_013",
    name: "Kindle Paperwhite 11th Gen",
    description: "6.8 inch display, waterproof, 8GB storage",
    price: 14999,
    category: "Electronics",
    inventory: 29,
    image: "/amazon-kindle-ereader-black.jpg",
    rating: 4.8,
    reviews: 4532,
    brand: "Amazon",
  },
  {
    id: "prod_014",
    name: "boAt Rockerz 550 Headphones",
    description: "50mm drivers, 20hr playback, foldable design",
    price: 1799,
    category: "Electronics",
    inventory: 92,
    image: "/boat-headphones-black-over-ear.jpg",
    rating: 4.2,
    reviews: 5621,
    brand: "boAt",
  },
  {
    id: "prod_015",
    name: "Himalaya Neem Face Wash",
    description: "Purifying formula, soap-free, 200ml pack",
    price: 199,
    category: "Beauty",
    inventory: 312,
    image: "/green-face-wash-tube-skincare.jpg",
    rating: 4.4,
    reviews: 8934,
    brand: "Himalaya",
  },
  {
    id: "prod_016",
    name: "Logitech MX Master 3S Mouse",
    description: "8K DPI sensor, quiet clicks, USB-C fast charging",
    price: 9995,
    category: "Electronics",
    inventory: 23,
    image: "/logitech-mx-master-mouse-grey.jpg",
    rating: 4.9,
    reviews: 2341,
    brand: "Logitech",
  },
  {
    id: "prod_017",
    name: "Pigeon by Stovekraft Pressure Cooker 5L",
    description: "Induction compatible, ISI certified, outer lid",
    price: 1549,
    category: "Home",
    inventory: 67,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.3,
    reviews: 3245,
    brand: "Pigeon",
  },
  {
    id: "prod_018",
    name: "Decathlon Resistance Bands Set",
    description: "5 resistance levels, latex-free, with door anchor",
    price: 999,
    category: "Sports",
    inventory: 84,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
    reviews: 1234,
    brand: "Decathlon",
  },
  {
    id: "prod_019",
    name: "Cadbury Celebrations Pack",
    description: "Premium chocolate assortment, 286g gift box",
    price: 349,
    category: "Food & Beverage",
    inventory: 189,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.6,
    reviews: 6721,
    brand: "Cadbury",
  },
  {
    id: "prod_020",
    name: "Urban Ladder Engineered Wood Study Table",
    description: "Minimalist design, cable management, walnut finish",
    price: 8999,
    category: "Furniture",
    inventory: 15,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.4,
    reviews: 876,
    brand: "Urban Ladder",
  },
]

export const orders: Order[] = [
  {
    id: "ord_001",
    customerId: "cust_001",
    customerName: "Priya Sharma",
    items: [
      { productId: "prod_001", name: "Sony WH-1000XM5", quantity: 1, price: 29990 },
      { productId: "prod_007", name: "Milton Thermosteel Flask", quantity: 2, price: 1299 },
    ],
    total: 32588,
    status: "shipped",
    channel: "web",
    createdAt: "2024-12-06T14:23:00Z",
    updatedAt: "2024-12-07T09:15:00Z",
  },
  {
    id: "ord_002",
    customerId: "cust_002",
    customerName: "Rahul Verma",
    items: [{ productId: "prod_002", name: "Apple Watch Series 9", quantity: 1, price: 41900 }],
    total: 41900,
    status: "processing",
    channel: "mobile",
    createdAt: "2024-12-07T08:45:00Z",
    updatedAt: "2024-12-07T10:30:00Z",
  },
  {
    id: "ord_003",
    customerId: "cust_003",
    customerName: "Ananya Patel",
    items: [
      { productId: "prod_003", name: "Blue Tokai Coffee", quantity: 3, price: 599 },
      { productId: "prod_008", name: "Philips LED Lamp", quantity: 1, price: 2499 },
    ],
    total: 4296,
    status: "delivered",
    channel: "voice",
    createdAt: "2024-12-05T16:00:00Z",
    updatedAt: "2024-12-07T11:00:00Z",
  },
  {
    id: "ord_004",
    customerId: "cust_004",
    customerName: "Vikram Singh",
    items: [{ productId: "prod_004", name: "Green Soul Gaming Chair", quantity: 1, price: 24999 }],
    total: 24999,
    status: "confirmed",
    channel: "chat",
    createdAt: "2024-12-07T11:20:00Z",
    updatedAt: "2024-12-07T11:25:00Z",
  },
  {
    id: "ord_005",
    customerId: "cust_005",
    customerName: "Meera Iyer",
    items: [
      { productId: "prod_005", name: "JBL Flip 6", quantity: 2, price: 9999 },
      { productId: "prod_006", name: "Boldfit Yoga Mat", quantity: 1, price: 799 },
    ],
    total: 20797,
    status: "pending",
    channel: "web",
    createdAt: "2024-12-07T12:00:00Z",
    updatedAt: "2024-12-07T12:00:00Z",
  },
  {
    id: "ord_006",
    customerId: "cust_006",
    customerName: "Arjun Reddy",
    items: [
      { productId: "prod_012", name: "Nike Air Max 270", quantity: 1, price: 12995 },
      { productId: "prod_011", name: "Levi's 511 Jeans", quantity: 2, price: 2799 },
    ],
    total: 18593,
    status: "shipped",
    channel: "mobile",
    createdAt: "2024-12-06T09:30:00Z",
    updatedAt: "2024-12-07T14:00:00Z",
  },
  {
    id: "ord_007",
    customerId: "cust_007",
    customerName: "Sneha Gupta",
    items: [{ productId: "prod_013", name: "Kindle Paperwhite", quantity: 1, price: 14999 }],
    total: 14999,
    status: "delivered",
    channel: "web",
    createdAt: "2024-12-04T18:45:00Z",
    updatedAt: "2024-12-06T10:00:00Z",
  },
]

export const sessions: CustomerSession[] = [
  {
    id: "sess_001",
    customerId: "cust_008",
    customerName: "Aditya Kumar",
    channel: "web",
    status: "active",
    cartItems: [
      { productId: "prod_001", name: "Sony WH-1000XM5", quantity: 1 },
      { productId: "prod_005", name: "JBL Flip 6", quantity: 1 },
    ],
    lastActivity: "2024-12-07T12:15:00Z",
    conversationHistory: [
      { role: "user", content: "Looking for good headphones for office work", timestamp: "2024-12-07T12:10:00Z" },
      {
        role: "assistant",
        content: "Sony WH-1000XM5 is perfect for that. Best noise cancellation in the market. Want me to add it?",
        timestamp: "2024-12-07T12:10:15Z",
      },
      { role: "user", content: "Yes, and any portable speakers?", timestamp: "2024-12-07T12:12:00Z" },
      {
        role: "assistant",
        content: "JBL Flip 6 is great - waterproof and 12hr battery. Added both to your cart.",
        timestamp: "2024-12-07T12:12:10Z",
      },
    ],
  },
  {
    id: "sess_002",
    customerId: "cust_009",
    customerName: "Kavya Nair",
    channel: "mobile",
    status: "active",
    cartItems: [{ productId: "prod_006", name: "Boldfit Yoga Mat", quantity: 2 }],
    lastActivity: "2024-12-07T12:10:00Z",
    conversationHistory: [
      { role: "user", content: "Need yoga mats for me and my sister", timestamp: "2024-12-07T12:05:00Z" },
      {
        role: "assistant",
        content: "Added 2 Boldfit Yoga Mats. Anti-skid and comes with carrying strap. Total ₹1,598.",
        timestamp: "2024-12-07T12:05:12Z",
      },
    ],
  },
  {
    id: "sess_003",
    customerId: "cust_010",
    customerName: "Rohan Joshi",
    channel: "voice",
    status: "idle",
    cartItems: [],
    lastActivity: "2024-12-07T11:45:00Z",
    conversationHistory: [
      { role: "user", content: "Where's my order?", timestamp: "2024-12-07T11:40:00Z" },
      {
        role: "assistant",
        content: "Your order shipped yesterday. Expected delivery by Dec 9th. Need tracking link?",
        timestamp: "2024-12-07T11:40:08Z",
      },
    ],
  },
]

export const agentMetrics: AgentMetrics = {
  totalConversations: 1247,
  activeConversations: 23,
  avgResponseTime: 1.2,
  successRate: 94.7,
  ordersProcessed: 342,
  queriesHandled: 905,
}

// Additional metrics for enhanced dashboard
export interface CustomerSegment {
  segment: string
  count: number
  revenue: number
  avgOrderValue: number
  repeatRate: number
}

export interface AgentPerformance {
  agentId: string
  date: string
  tasksCompleted: number
  avgResponseTime: number
  successRate: number
  errors: number
}

export interface ProductTrend {
  productId: string
  name: string
  salesThisWeek: number
  salesLastWeek: number
  revenueThisWeek: number
  trend: number // percentage change
}

export const customerSegments: CustomerSegment[] = [
  {
    segment: "VIP",
    count: 3,
    revenue: 124472,
    avgOrderValue: 41491,
    repeatRate: 100,
  },
  {
    segment: "Regular",
    count: 4,
    revenue: 82376,
    avgOrderValue: 20594,
    repeatRate: 50,
  },
  {
    segment: "New",
    count: 3,
    revenue: 51324,
    avgOrderValue: 17108,
    repeatRate: 0,
  },
]

export const agentPerformanceHistory: AgentPerformance[] = [
  {
    agentId: "orchestrator",
    date: "2024-12-07",
    tasksCompleted: 187,
    avgResponseTime: 0.3,
    successRate: 98.5,
    errors: 3,
  },
  {
    agentId: "product",
    date: "2024-12-07",
    tasksCompleted: 78,
    avgResponseTime: 1.1,
    successRate: 94.2,
    errors: 5,
  },
  {
    agentId: "order",
    date: "2024-12-07",
    tasksCompleted: 52,
    avgResponseTime: 0.9,
    successRate: 96.8,
    errors: 2,
  },
  {
    agentId: "support",
    date: "2024-12-07",
    tasksCompleted: 58,
    avgResponseTime: 1.4,
    successRate: 92.3,
    errors: 4,
  },
]

export const productTrends: ProductTrend[] = [
  {
    productId: "prod_001",
    name: "Sony WH-1000XM5",
    salesThisWeek: 3,
    salesLastWeek: 2,
    revenueThisWeek: 89970,
    trend: 50,
  },
  {
    productId: "prod_002",
    name: "Apple Watch Series 9",
    salesThisWeek: 2,
    salesLastWeek: 3,
    revenueThisWeek: 83800,
    trend: -33,
  },
  {
    productId: "prod_012",
    name: "Nike Air Max 270",
    salesThisWeek: 3,
    salesLastWeek: 2,
    revenueThisWeek: 38985,
    trend: 50,
  },
  {
    productId: "prod_003",
    name: "Blue Tokai Coffee",
    salesThisWeek: 3,
    salesLastWeek: 1,
    revenueThisWeek: 1797,
    trend: 200,
  },
  {
    productId: "prod_005",
    name: "JBL Flip 6",
    salesThisWeek: 2,
    salesLastWeek: 1,
    revenueThisWeek: 19998,
    trend: 100,
  },
]

// Real-time system metrics
export interface SystemMetrics {
  cpuUsage: number
  memoryUsage: number
  activeConnections: number
  requestsPerMinute: number
  avgLatency: number
  errorRate: number
}

export const systemMetrics: SystemMetrics = {
  cpuUsage: 34,
  memoryUsage: 58,
  activeConnections: 23,
  requestsPerMinute: 145,
  avgLatency: 128,
  errorRate: 0.3,
}

// Customer behavior insights
export interface CustomerBehavior {
  metric: string
  value: number
  change: number
  period: string
}

export const customerBehaviors: CustomerBehavior[] = [
  { metric: "Avg Session Duration", value: 8.5, change: 12, period: "minutes" },
  { metric: "Pages Per Session", value: 4.2, change: -5, period: "pages" },
  { metric: "Cart Abandonment", value: 18, change: -8, period: "%" },
  { metric: "Voice Interactions", value: 156, change: 25, period: "total" },
]

export const getProductById = (id: string) => products.find((p) => p.id === id)
export const getOrderById = (id: string) => orders.find((o) => o.id === id)
export const getSessionById = (id: string) => sessions.find((s) => s.id === id)
export const getLowStockProducts = (threshold = 20) => products.filter((p) => p.inventory < threshold)
export const getOrdersByStatus = (status: Order["status"]) => orders.filter((o) => o.status === status)
export const getActiveSessionsByChannel = (channel: CustomerSession["channel"]) =>
  sessions.filter((s) => s.channel === channel && s.status === "active")
export const getCategories = () => [...new Set(products.map((p) => p.category))]
export const getBrands = () => [...new Set(products.map((p) => p.brand))]
export const getTopProducts = (limit = 5) => 
  productTrends.sort((a, b) => b.revenueThisWeek - a.revenueThisWeek).slice(0, limit)
export const getTrendingProducts = () => 
  productTrends.filter(p => p.trend > 0).sort((a, b) => b.trend - a.trend)
