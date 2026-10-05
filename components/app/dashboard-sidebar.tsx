"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  ChevronsLeft,
  ChevronsRight,
  Columns3,
  LayoutDashboard,
  Milestone,
  Settings,
  Sparkles,
  X,
} from "lucide-react"
import { useSidebar } from "@/components/app/sidebar-context"
import { Logo } from "@/components/ui/logo"
import { AccountToggleCard } from "@/components/app/account-toggle-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export const DASHBOARD_NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Boards", href: "/dashboard/boards", icon: Columns3 },
  { label: "Roadmap", href: "/dashboard/roadmap", icon: Milestone },
  { label: "Changelog", href: "/dashboard/changelog", icon: Sparkles },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { isCollapsed, toggleCollapsed, isMobileOpen, setMobileOpen } = useSidebar()

  // Helper to check if a navigation item is active
  const isItemActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

  // Sidebar content markup shared between desktop rail and mobile drawer
  const sidebarContent = (
    <div className="flex h-full flex-col justify-between p-3">
      {/* Top Header & Brand */}
      <div className="flex flex-col gap-4">
        <div
          className={cn(
            "flex items-center px-1 transition-all duration-200",
            isCollapsed ? "flex-col gap-2 justify-center py-1" : "h-12 justify-between"
          )}
        >
          <Logo
            place="sidebar"
            size="default"
            hasText={!isCollapsed}
            badge={isCollapsed ? null : "App"}
            href="/dashboard"
          />

          <div className="flex items-center gap-1">
            {/* Desktop collapse button beside the logo */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={toggleCollapsed}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="hidden md:flex size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent cursor-pointer"
            >
              {isCollapsed ? (
                <ChevronsRight className="size-4" aria-hidden="true" />
              ) : (
                <ChevronsLeft className="size-4" aria-hidden="true" />
              )}
            </Button>

            {/* Mobile drawer close button */}
            <div className="flex md:hidden">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-8 rounded-lg"
                onClick={() => setMobileOpen(false)}
                aria-label="Close sidebar"
              >
                <X className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav aria-label="Dashboard Navigation" className="flex flex-col gap-1">
          {DASHBOARD_NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const active = isItemActive(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                title={isCollapsed ? item.label : undefined}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring select-none",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-2xs"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <Icon
                  className={cn(
                    "size-4 shrink-0 transition-transform duration-200 group-hover:scale-105",
                    active ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-foreground"
                  )}
                  aria-hidden="true"
                />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Bottom Account Toggle Card */}
      <div className="pt-3 border-t border-sidebar-border">
        <AccountToggleCard />
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sticky Rail */}
      <aside
        aria-label="Sidebar Navigation"
        className={cn(
          "hidden md:flex sticky top-0 h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-300 z-30",
          isCollapsed ? "w-18" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Off-canvas Drawer */}
      {isMobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Drawer"
          className="fixed inset-0 z-50 flex md:hidden"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-xs transition-opacity animate-in fade-in-0 duration-200"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Surface */}
          <aside className="relative flex w-72 max-w-[85vw] flex-col border-r border-sidebar-border bg-sidebar shadow-lift animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}
