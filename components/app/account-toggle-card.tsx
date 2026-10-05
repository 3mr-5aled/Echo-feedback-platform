"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronsUpDown, LogOut, Settings, User } from "lucide-react"
import { useSidebar } from "@/components/app/sidebar-context"
import { cn } from "@/lib/utils"

export interface UserProfile {
  name: string
  email: string
  avatarUrl?: string
  role?: string
}

const DEFAULT_USER: UserProfile = {
  name: "Alex Morgan",
  email: "alex@echo.io",
  role: "Product Lead",
}

interface AccountToggleCardProps {
  user?: UserProfile
  className?: string
}

export function AccountToggleCard({ user = DEFAULT_USER, className }: AccountToggleCardProps) {
  const { isCollapsed, setMobileOpen } = useSidebar()
  const [isOpen, setIsOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  // Close popover when clicking outside or pressing Escape
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className={cn("relative w-full", className)}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="User account menu"
        className={cn(
          "flex w-full items-center gap-3 rounded-xl border border-sidebar-border bg-sidebar/50 p-2 text-left transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring cursor-pointer",
          isCollapsed && "justify-center p-2"
        )}
      >
        {/* Avatar */}
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-xs font-bold text-primary select-none">
          {user.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="size-full rounded-lg object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        {/* User Details (expanded only) */}
        {!isCollapsed && (
          <>
            <div className="flex flex-1 flex-col overflow-hidden text-left leading-tight">
              <span className="truncate text-xs font-semibold text-foreground">
                {user.name}
              </span>
              <span className="truncate text-[11px] text-muted-foreground">
                {user.email}
              </span>
            </div>
            <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          </>
        )}
      </button>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Account options"
          className={cn(
            "absolute bottom-full mb-2 z-50 rounded-xl border border-border bg-popover p-1.5 shadow-lift text-popover-foreground animate-in fade-in-0 zoom-in-95 duration-150",
            isCollapsed ? "left-full ml-2 w-56 bottom-0 mb-0" : "left-0 w-full"
          )}
        >
          {/* Header inside popover */}
          <div className="px-2.5 py-2 border-b border-border/60 mb-1">
            <p className="text-xs font-semibold text-foreground truncate">{user.name}</p>
            <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
            {user.role && (
              <span className="mt-1 inline-block rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-medium text-primary">
                {user.role}
              </span>
            )}
          </div>

          <Link
            href="/dashboard/profile"
            role="menuitem"
            onClick={() => {
              setIsOpen(false)
              setMobileOpen(false)
            }}
            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <User className="size-3.5 text-muted-foreground" aria-hidden="true" />
            <span>Profile Settings</span>
          </Link>

          <Link
            href="/dashboard/settings"
            role="menuitem"
            onClick={() => {
              setIsOpen(false)
              setMobileOpen(false)
            }}
            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Settings className="size-3.5 text-muted-foreground" aria-hidden="true" />
            <span>Workspace Preferences</span>
          </Link>

          <div className="my-1 border-t border-border/60" />

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setIsOpen(false)
              window.location.href = "/login"
            }}
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
          >
            <LogOut className="size-3.5" aria-hidden="true" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  )
}
