# ShopSync Admin Dashboard

A modern, AI-powered shopping admin dashboard built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Responsive Design** - Fully responsive across mobile, tablet, and desktop
- 🌓 **Dark/Light Mode** - Toggle between themes with smooth transitions
- 🤖 **AI Agent Monitoring** - Track AI shopping assistant performance
- 📊 **Real-time Analytics** - Monitor orders, revenue, and customer data
- 🛍️ **Product Management** - Manage inventory and product catalog
- 👥 **Customer Insights** - View customer segments and behavior
- 📱 **Mobile-First** - Optimized mobile navigation with drawer menu

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Charts:** Recharts
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd ShopSync-Admin
```

2. Install dependencies
```bash
pnpm install
```

3. Run the development server
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin dashboard routes
│   ├── api/               # API routes
│   └── shop/              # Shop frontend
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   └── ui/               # Reusable UI components
├── lib/                   # Utility functions and data
│   ├── data/             # Mock data
│   └── ai/               # AI agent logic
└── hooks/                 # Custom React hooks

```

## Features in Detail

### Dashboard
- Revenue metrics and trends
- Order statistics
- Active session monitoring
- Alert notifications
- AI agent activity charts

### Products
- Product catalog management
- Inventory tracking
- Low stock alerts
- Category and brand filtering

### Customers
- Customer segmentation (VIP, Regular, New)
- Lifetime value tracking
- Channel distribution
- Purchase history

### AI Agents
- Agent performance monitoring
- Response time tracking
- Success rate analytics
- Conversation insights

## License

MIT License
