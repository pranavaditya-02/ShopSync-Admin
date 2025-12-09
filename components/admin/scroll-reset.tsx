"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function ScrollReset() {
  const pathname = usePathname()

  useEffect(() => {
    // Reset scroll position of the main content area when route changes
    const mainContent = document.getElementById("admin-main-content")
    if (mainContent) {
      mainContent.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}
