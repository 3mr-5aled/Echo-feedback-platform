"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { useSidebar } from "@/components/app/sidebar-context"
import { Button } from "@/components/ui/button"

export function MobileSidebarTrigger() {
  const { toggleMobile, isMobileOpen } = useSidebar()

  if (isMobileOpen) {
    return null
  }

  return (
    <div className="fixed top-3 left-3 z-40 md:hidden">
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={toggleMobile}
        aria-label="Open navigation menu"
        className="size-9 rounded-xl bg-card/90 shadow-card border-border backdrop-blur-md cursor-pointer hover:bg-accent"
      >
        <Menu className="size-4.5 text-foreground" aria-hidden="true" />
      </Button>
    </div>
  )
}
