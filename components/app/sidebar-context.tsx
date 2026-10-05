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
