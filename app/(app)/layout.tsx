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

        {/* Dashboard Sidebar (Desktop Sticky Rail & Mobile Drawer) */}
        <DashboardSidebar />

        {/* Main Viewport Content */}
        <main className="flex-1 min-w-0 min-h-screen overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}