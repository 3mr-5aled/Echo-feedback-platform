# Dashboard Sidebar & AppLayout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the authenticated `AppLayout` shell and responsive `DashboardSidebar` featuring brand integration with `Logo`, flat navigation links with Lucide icons, bottom utilities with `ThemeToggle` and rail collapse, an interactive `AccountToggleCard` with popover menu, and mobile drawer support without any top bar.

**Architecture:** A modular React context (`SidebarProvider`) orchestrates sidebar collapse state (persisted to `localStorage`) and mobile drawer visibility. The layout is structured as a Next.js Server Component in `app/(app)/layout.tsx` providing a persistent sidebar on the left and a scrollable content area on the right, with a minimal floating trigger on mobile screens to toggle the drawer.

**Tech Stack:** Next.js 16 (App Router, React 19, Server Components & Client Components), Tailwind CSS v4, OKLCH color tokens, `lucide-react`, `next-themes`.

**Spec:** `docs/superpowers/specs/2026-10-05-dashboard-sidebar-design.md`

## Global Constraints

- Must use semantic OKLCH tokens (`--sidebar`, `--sidebar-foreground`, `--sidebar-border`, `--sidebar-accent`, `bg-card`, `text-muted-foreground`, etc.) and never hardcode hex or arbitrary colors.
- Must use `components/ui/logo.tsx` for brand rendering with `place="sidebar"`.
- Must integrate `components/theme-toggle.tsx` in the bottom utility row.
- No top bar header inside `AppLayout`; mobile uses a floating trigger button to open the sidebar drawer.
- Navigation links must be a single flat list: Overview (`/dashboard`), Feedback Boards (`/dashboard/boards`), Roadmap (`/dashboard/roadmap`), Changelog (`/dashboard/changelog`), Analytics (`/dashboard/analytics`), Settings (`/dashboard/settings`).
- All interactive triggers must have accessible names (`aria-label`), visible focus rings (`focus-visible:ring-2 focus-visible:ring-sidebar-ring`), and keyboard navigation.

## Review Focus

1. Hydration mismatch when reading sidebar collapse state from `localStorage`: Ensure client-side mounting guard prevents React hydration discrepancies.
2. Mobile drawer scroll-lock and backdrop dismissal: Verify that clicking the backdrop or pressing `Escape` closes the mobile drawer and restores body scrolling.
3. Collapsed desktop rail usability: Verify that when `isCollapsed` is true (72px rail), navigation links center their icons, provide accessible `title` attributes, and `AccountToggleCard` collapses into an avatar trigger.
4. Active route matching: Verify `usePathname()` matches root `/dashboard` without incorrectly highlighting it on sub-routes unless exact, while sub-routes like `/dashboard/boards` match `/dashboard/boards/*`.
5. Outside click handling for account dropdown: Verify menu properly unmounts on outside clicks and does not trap focus or break layout.

---

### Task 1: Sidebar Context & State Provider

**Files:**
- Create: `components/app/sidebar-context.tsx`

**Interfaces:**
- Produces:
  ```typescript
  interface SidebarContextValue {
    isCollapsed: boolean
    isMobileOpen: boolean
    toggleCollapsed: () => void
    setCollapsed: (collapsed: boolean) => void
    toggleMobile: () => void
    setMobileOpen: (open: boolean) => void
  }
  export function SidebarProvider({ children }: { children: React.ReactNode }): JSX.Element
  export function useSidebar(): SidebarContextValue
  ```

- [ ] **Step 1: Write `components/app/sidebar-context.tsx`**

```tsx
"use client"

import * as React from "react"

interface SidebarContextValue {
  isCollapsed: boolean
  isMobileOpen: boolean
  toggleCollapsed: () => void
  setCollapsed: (collapsed: boolean) => void
  toggleMobile: () => void
  setMobileOpen: (open: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined)

const STORAGE_KEY = "echo_sidebar_collapsed"

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsedState] = React.useState<boolean>(false)
  const [isMobileOpen, setIsMobileOpen] = React.useState<boolean>(false)

  // Hydrate collapsed state from localStorage after mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored !== null) {
        setIsCollapsedState(stored === "true")
      }
    } catch {
      // localStorage may be unavailable in private browsing mode
    }
  }, [])

  const setCollapsed = React.useCallback((value: boolean) => {
    setIsCollapsedState(value)
    try {
      localStorage.setItem(STORAGE_KEY, String(value))
    } catch {
      // ignore
    }
  }, [])

  const toggleCollapsed = React.useCallback(() => {
    setCollapsed(!isCollapsed)
  }, [isCollapsed, setCollapsed])

  const setMobileOpen = React.useCallback((open: boolean) => {
    setIsMobileOpen(open)
  }, [])

  const toggleMobile = React.useCallback(() => {
    setIsMobileOpen((prev) => !prev)
  }, [])

  // Close mobile drawer on resize to desktop
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileOpen) {
        setIsMobileOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMobileOpen])

  const value = React.useMemo<SidebarContextValue>(
    () => ({
      isCollapsed,
      isMobileOpen,
      toggleCollapsed,
      setCollapsed,
      toggleMobile,
      setMobileOpen,
    }),
    [isCollapsed, isMobileOpen, toggleCollapsed, setCollapsed, toggleMobile, setMobileOpen]
  )

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

export function useSidebar(): SidebarContextValue {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
```

- [ ] **Step 2: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: Exits with code 0

- [ ] **Step 3: Commit**

```bash
git add components/app/sidebar-context.tsx
git commit -m "feat(sidebar): add SidebarProvider and useSidebar context hook"
```

---

### Task 2: Account Toggle Card Component

**Files:**
- Create: `components/app/account-toggle-card.tsx`

**Interfaces:**
- Consumes: `useSidebar()` from `@/components/app/sidebar-context`
- Produces:
  ```typescript
  export interface UserProfile {
    name: string
    email: string
    avatarUrl?: string
    role?: string
  }
  export function AccountToggleCard({ user }: { user?: UserProfile }): JSX.Element
  ```

- [ ] **Step 1: Write `components/app/account-toggle-card.tsx`**

```tsx
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
              // Trigger sign out flow or redirect to /login
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
```

- [ ] **Step 2: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: Exits with code 0

- [ ] **Step 3: Commit**

```bash
git add components/app/account-toggle-card.tsx
git commit -m "feat(sidebar): add AccountToggleCard component with popover menu"
```

---

### Task 3: Dashboard Sidebar Component

**Files:**
- Create: `components/app/dashboard-sidebar.tsx`

**Interfaces:**
- Consumes:
  - `useSidebar()` from `@/components/app/sidebar-context`
  - `Logo` from `@/components/ui/logo`
  - `ThemeToggle` from `@/components/theme-toggle`
  - `AccountToggleCard` from `@/components/app/account-toggle-card`
- Produces:
  ```typescript
  export function DashboardSidebar(): JSX.Element
  ```

- [ ] **Step 1: Write `components/app/dashboard-sidebar.tsx`**

```tsx
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
import { ThemeToggle } from "@/components/theme-toggle"
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
            "flex h-12 items-center px-1 transition-all duration-200",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          <Logo
            place="sidebar"
            size="default"
            hasText={!isCollapsed}
            badge={isCollapsed ? null : "App"}
            href="/dashboard"
          />

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

      {/* Bottom Utility Footer & Account Toggle Card */}
      <div className="flex flex-col gap-3 pt-3 border-t border-sidebar-border">
        {/* Utilities: ThemeToggle + Collapse button */}
        <div
          className={cn(
            "flex items-center gap-1",
            isCollapsed ? "flex-col justify-center" : "justify-between px-1"
          )}
        >
          <ThemeToggle
            variant="ghost"
            className="size-8 rounded-lg text-muted-foreground hover:text-foreground"
          />

          {/* Desktop-only collapse trigger */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden md:flex size-8 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {isCollapsed ? (
              <ChevronsRight className="size-4" aria-hidden="true" />
            ) : (
              <ChevronsLeft className="size-4" aria-hidden="true" />
            )}
          </Button>
        </div>

        {/* Account Toggle Card */}
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
```

- [ ] **Step 2: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: Exits with code 0

- [ ] **Step 3: Commit**

```bash
git add components/app/dashboard-sidebar.tsx
git commit -m "feat(sidebar): add DashboardSidebar component with desktop collapse and mobile drawer"
```

---

### Task 4: AppLayout Integration & Mobile Trigger

**Files:**
- Modify: `app/(app)/layout.tsx`

**Interfaces:**
- Consumes:
  - `SidebarProvider` from `@/components/app/sidebar-context`
  - `DashboardSidebar` from `@/components/app/dashboard-sidebar`
- Produces: Authenticated AppLayout shell

- [ ] **Step 1: Write `components/app/mobile-sidebar-trigger.tsx`**

Create a clean client trigger for the mobile drawer button so the layout itself remains lightweight.

```tsx
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
        className="size-9 rounded-xl bg-card/90 shadow-card border-border backdrop-blur-md cursor-pointer"
      >
        <Menu className="size-4.5 text-foreground" aria-hidden="true" />
      </Button>
    </div>
  )
}
```

- [ ] **Step 2: Update `app/(app)/layout.tsx`**

```tsx
import * as React from "react"
import { SidebarProvider } from "@/components/app/sidebar-context"
import { DashboardSidebar } from "@/components/app/dashboard-sidebar"
import { MobileSidebarTrigger } from "@/components/app/mobile-sidebar-trigger"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen bg-background text-foreground">
        {/* Floating Mobile Drawer Trigger */}
        <MobileSidebarTrigger />

        {/* Dashboard Sidebar (Desktop Rail & Mobile Drawer) */}
        <DashboardSidebar />

        {/* Main Viewport Content */}
        <main className="flex-1 min-w-0 min-h-screen overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
```

- [ ] **Step 3: Verify TypeScript compilation**

Run: `npx tsc --noEmit`
Expected: Exits with code 0

- [ ] **Step 4: Commit**

```bash
git add components/app/mobile-sidebar-trigger.tsx app/\(app\)/layout.tsx
git commit -m "feat(layout): integrate DashboardSidebar and MobileSidebarTrigger into AppLayout"
```

---

### Task 5: End-to-End Build & Visual Verification

**Files:**
- Verify: Full project build & compilation

- [ ] **Step 1: Run TypeScript compiler check**

Run: `npx tsc --noEmit`
Expected: Clean pass with code 0

- [ ] **Step 2: Run linter**

Run: `npm run lint`
Expected: 0 errors

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: Build successfully produces output for all routes without errors

- [ ] **Step 4: Commit any final polishing touches**

```bash
git add .
git commit -m "chore(sidebar): complete verification for dashboard sidebar in AppLayout"
```
