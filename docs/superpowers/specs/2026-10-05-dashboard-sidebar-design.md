# Dashboard Sidebar & AppLayout Design Specification

- **Date**: 2026-10-05
- **Status**: Approved
- **Scope**: Authenticated Dashboard Shell (`app/(app)/layout.tsx`), Dashboard Sidebar (`components/app/dashboard-sidebar.tsx`), Account Toggle Card (`components/app/account-toggle-card.tsx`), and Sidebar State Provider (`components/app/sidebar-context.tsx`).

---

## 1. Overview & Goals
Echo requires a unified, modern, and accessible application shell for all authenticated dashboard views. This specification details the layout structure, sidebar navigation, responsive mechanics, account toggle card, and theme switching capabilities.

### Key Objectives
1. **Clean Brand Integration**: Integrate `components/ui/logo.tsx` at the top of the sidebar with dynamic text display based on expanded/collapsed state.
2. **Single Flat Navigation**: Deliver a flat list of primary links with Lucide icons, active state indicators based on `usePathname()`, and accessibility annotations.
3. **Collapsible Desktop & Mobile Drawer**: Support desktop rail collapsing (icon-only mode) with persistent state and an off-canvas drawer on mobile screens without any top bar cluttering the view.
4. **Bottom Utility & Account Toggle Card**: Position `ThemeToggle` alongside a collapse trigger in a bottom utility bar, followed by an interactive account card supporting an accessible popover dropdown for Profile, Organization, and Sign Out.
5. **Strict Design System Compliance**: Rely exclusively on OKLCH semantic tokens (`--sidebar`, `--sidebar-foreground`, `--sidebar-border`, `--sidebar-accent`, `.bento`, `shadow-card`, `ring-ring`).

---

## 2. Architecture & File Structure

```
components/
└── app/
    ├── sidebar-context.tsx       # React Context: isCollapsed, isMobileOpen, toggles, persistence
    ├── dashboard-sidebar.tsx     # Main sidebar container (desktop rail + mobile drawer)
    └── account-toggle-card.tsx   # User profile card + popover menu
app/
└── (app)/
    └── layout.tsx                # AppLayout Server Component wrapping SidebarProvider & viewport
```

---

## 3. Detailed Component Specifications

### 3.1. `SidebarContext` (`components/app/sidebar-context.tsx`)
- **State**:
  - `isCollapsed: boolean` (desktop rail state, defaults to `false`, hydrated from `localStorage` if present).
  - `isMobileOpen: boolean` (mobile drawer state, defaults to `false`).
- **Actions**:
  - `toggleCollapsed: () => void`
  - `setCollapsed: (collapsed: boolean) => void`
  - `toggleMobile: () => void`
  - `setMobileOpen: (open: boolean) => void`
- **Hook**: `useSidebar()` providing type-safe access and guards against usage outside `SidebarProvider`.

### 3.2. `DashboardSidebar` (`components/app/dashboard-sidebar.tsx`)
- **Container Structure**:
  - Desktop: `<aside>` with sticky positioning `sticky top-0 h-screen flex flex-col justify-between border-r border-sidebar-border bg-sidebar transition-all duration-300 z-30`. Width transitions between `w-64` (expanded) and `w-18` (collapsed).
  - Mobile: Slide-over drawer with backdrop overlay (`fixed inset-0 z-50 bg-background/80 backdrop-blur-xs md:hidden`), smoothly animated.
- **Top Section**:
  - Renders `<Logo place="sidebar" size="default" hasText={!isCollapsed} />`.
  - In collapsed mode, centers the logo mark icon.
- **Navigation Links**:
  - Flat list of items mapped with `usePathname()` matching:
    1. **Overview**: `/dashboard` — Icon: `LayoutDashboard`
    2. **Feedback Boards**: `/dashboard/boards` — Icon: `Columns3`
    3. **Roadmap**: `/dashboard/roadmap` — Icon: `Milestone`
    4. **Changelog**: `/dashboard/changelog` — Icon: `Sparkles`
    5. **Analytics**: `/dashboard/analytics` — Icon: `BarChart3`
    6. **Settings**: `/dashboard/settings` — Icon: `Settings`
  - **Active State**: `bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-2xs`
  - **Inactive State**: `text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground`
  - In collapsed mode: Tooltip / title attribute on hover for accessibility and icon-only centering.
- **Bottom Utility Row**:
  - Positioned directly above the Account Card.
  - Hosts `<ThemeToggle variant="ghost" />` and the sidebar collapse toggle button (`ChevronsLeft` / `ChevronsRight`).
  - In collapsed mode, stacks vertically to fit neatly within `w-18`.

### 3.3. `AccountToggleCard` (`components/app/account-toggle-card.tsx`)
- **Visual Design**:
  - Bordered flat card (`border border-sidebar-border rounded-xl bg-card/60 p-2 hover:bg-sidebar-accent transition-colors cursor-pointer select-none`).
  - Contains:
    - User avatar: 32px circular container with soft primary background (`bg-primary-soft text-primary font-semibold`) or image.
    - User details (expanded only): Display name (`text-sm font-semibold text-foreground truncate`) and email/role (`text-xs text-muted-foreground truncate`).
    - More / Chevron icon indicator.
- **Popover / Dropdown Interaction**:
  - Accessible menu overlay positioned relative to the card (`bg-popover border border-border rounded-xl shadow-lift p-1.5 min-w-[200px] z-50`).
  - Menu Items:
    - **Profile Settings** (`/dashboard/profile` or modal trigger) with `User` icon.
    - **Organization / Team** (`/dashboard/organization`) with `Building` icon.
    - Divider (`border-t border-border my-1`).
    - **Sign Out** button (`text-destructive hover:bg-destructive/10`) with `LogOut` icon.
  - Closes on outside click or `Escape` key press.

### 3.4. `AppLayout` (`app/(app)/layout.tsx`)
- **Shell Structure**:
  - Server Component wrapping the authenticated application tree.
  - Encapsulates `<SidebarProvider>`.
  - Renders `<DashboardSidebar />`.
  - **Mobile Menu Trigger**: Subtle floating button (`fixed top-4 left-4 z-40 md:hidden bg-card border border-border shadow-card rounded-xl p-2`) to open the mobile drawer without imposing a permanent top navbar.
  - `<main className="flex-1 min-h-screen overflow-y-auto bg-background p-4 sm:p-6 lg:p-8">`: Host for child page content.

---

## 4. Accessibility (a11y) & Responsiveness

1. **Semantic HTML**: `<aside aria-label="Sidebar Navigation">`, `<nav aria-label="Primary Navigation">`, `<main>`.
2. **Keyboard Focus**: Visible focus rings (`focus-visible:ring-2 focus-visible:ring-sidebar-ring`).
3. **Screen Readers**: Active link denoted with `aria-current="page"`. Collapse button labeled with descriptive `aria-expanded` and `aria-label`.
4. **Mobile Usability**: Touch targets $\ge 40\text{px}$, backdrop click dismisses mobile drawer, `Escape` key closes drawer and dropdowns.

---

## 5. Verification Plan
- **Desktop Navigation**: Verify smooth switching between active routes and correct icon rendering.
- **Collapse Mechanism**: Verify toggling between expanded (260px) and collapsed (72px) states with proper tooltip/centering behavior.
- **Dark Mode**: Verify `ThemeToggle` works seamlessly inside the sidebar and all OKLCH colors switch accurately.
- **Account Dropdown**: Verify opening, navigation, and outside-click dismissal of the popover menu.
- **Mobile Drawer**: Test responsive viewport (< 768px) with floating trigger opening and backdrop closing.
