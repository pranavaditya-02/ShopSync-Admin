import type React from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { ScrollReset } from "@/components/admin/scroll-reset"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar />
      <main id="admin-main-content" className="flex-1 overflow-y-auto pt-16 lg:pt-0">
        <ScrollReset />
        {children}
      </main>
    </div>
  )
}
