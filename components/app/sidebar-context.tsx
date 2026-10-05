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

// Custom event to sync collapse state within the client
const STORAGE_EVENT = "echo_sidebar_collapse_change"

function subscribe(callback: () => void) {
  window.addEventListener(STORAGE_EVENT, callback)
  window.addEventListener("storage", callback)
  return () => {
    window.removeEventListener(STORAGE_EVENT, callback)
    window.removeEventListener("storage", callback)
  }
}

function getSnapshot(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true"
  } catch {
    return false
  }
}

function getServerSnapshot(): boolean {
  return false
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const isCollapsed = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [isMobileOpen, setIsMobileOpen] = React.useState<boolean>(false)

  const setCollapsed = React.useCallback((value: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, String(value))
      window.dispatchEvent(new Event(STORAGE_EVENT))
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
