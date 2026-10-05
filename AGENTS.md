<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Echo Feedback Platform — Engineering & Design System Rules

## 1. Project Overview & Philosophy
Echo is a modern, scalable feedback and product management platform. The interface combines **Flat Design** with **Bento-inspired layouts** to deliver an experience that feels clean, structured, approachable, and highly functional.

* **Core Pillars**: Clarity, consistency, accessibility, and flexibility.
* **Shared Visual Language**: Seamless cohesion between the public customer-facing feedback experience (boards, roadmaps, idea submission, voting) and the internal admin workspace (triage, analytics, prioritization).
* **Aesthetic Standard**: Avoid unnecessary or skeuomorphic decoration. Rely on rounded surfaces (`rounded-2xl`, `.bento`), crisp 1px borders (`border-border`), restrained elevation (`shadow-card`, `shadow-lift`), generous spacing, and expressive semantic accents.

---

## 2. Tech Stack & Architecture
* **Framework**: Next.js 16 (App Router, Turbopack, React 19)
* **Styling**: Tailwind CSS v4 (`@import "tailwindcss";`, `@theme inline` in `app/globals.css`)
* **UI Primitives**: shadcn/ui (`radix-vega` style, Radix UI)
* **Icons**: `lucide-react`
* **Utility**: `cn` helper in `@/lib/utils`
* **Path Aliases**:
  * `@/components` → `components`
  * `@/components/ui` → `components/ui` (shadcn primitives)
  * `@/lib` → `lib`
  * `@/hooks` → `hooks`

---

## 3. Design System & Tokens (Feedback Board Design System)

All design tokens are defined using the **OKLCH** color format in `app/globals.css` with native light and dark mode support:

### Surface & Typography Tokens
* `bg-background` / `text-foreground` — App-level page background and default text
* `bg-card` / `text-card-foreground` — Card surfaces and bento container backgrounds
* `bg-popover` / `text-popover-foreground` — Menus, dropdowns, tooltips, dialogs
* `bg-muted` / `text-muted-foreground` — Subtle backgrounds, secondary text, timestamps
* `bg-secondary` / `text-secondary-foreground` — Inactive pills, secondary actions
* `bg-accent` / `text-accent-foreground` — Interactive hover states
* `border-border` — Subtle surface borders (1px)
* `border-input` — Form field and input borders
* `ring-ring` — Focus indicator ring (primary blue tint)

### Brand & High-Contrast Tokens
* `bg-primary` / `text-primary-foreground` — Main brand call to actions, upvotes, highlights
* `bg-primary-soft` — Soft primary tint for subtle active badges or hover glows
* `bg-ink` / `text-ink-foreground` — Maximum contrast elements (dark in light mode, light in dark mode)
* `bg-footer-bg` / `text-footer-fg` / `border-footer-border` — Anchoring dark footer tokens across modes
* `bg-destructive` / `text-destructive-foreground` — Critical actions, errors, deletions

### Roadmap & Status Tokens
Use these semantic tokens for feedback lifecycle states:
* **Under Review**: `text-s-review` / `bg-s-review-soft` (warm amber)
* **Planned**: `text-s-planned` / `bg-s-planned-soft` (indigo / primary blue)
* **In Progress**: `text-s-progress` / `bg-s-progress-soft` (orange / coral)
* **Done / Completed**: `text-s-done` / `bg-s-done-soft` (emerald / mint green)

### Elevation & Custom Utilities
* `.bento` — Standard modular bento box:
  ```css
  border-radius: 1.25rem;
  border: 1px solid var(--color-border);
  background: var(--color-card);
  box-shadow: var(--shadow-card);
  ```
* `shadow-card` — Resting shadow for cards and bento blocks
* `shadow-lift` — Elevated shadow for hover states, floating cards, and modals
* `.animate-vote` — Micro-interaction bounce keyframe (`vote-pop 320ms ease-out`) for upvote buttons
* Font Family: `Manrope`, system-ui fallback

---

## 4. Layout & Bento Patterns
* **Bento Grid Layouts**:
  * Use CSS Grid with consistent spacing (`gap-4` or `gap-6`).
  * Compose screens with asymmetrical, modular bento cells (`col-span-*`, `row-span-*`) to establish natural visual hierarchy.
  * Feature important sections (e.g. trending feedback, primary roadmap column, top metric) with larger spans (`col-span-2` or `col-span-3`).
* **Flat Design Principles**:
  * Crisp borders (`border-border`), minimal gradients, and solid legible surfaces.
  * Information density is managed via clean whitespace and clear categorization rather than heavy shadows or complex ornamentation.

---

## 5. Component Taxonomy & Directory Rules
* `components/ui/` — Base primitives from shadcn (e.g., `button.tsx`, `input.tsx`, `badge.tsx`, `dialog.tsx`, `card.tsx`, `tabs.tsx`).
* `components/feedback/` — Feedback-specific components (e.g., `feedback-card.tsx`, `vote-button.tsx`, `status-badge.tsx`, `category-tag.tsx`, `roadmap-column.tsx`, `comment-list.tsx`).
* `components/marketing/` — Public marketing and landing page components (`header.tsx`, `hero.tsx`, `features-bento.tsx`, `footer.tsx`).
* `components/app/` (or `components/dashboard/`) — Logged-in application experience, dashboard bento widgets, feedback submission modal, admin triage tools.
* `components/auth/` — Sign-in / sign-up forms and authentication dialogs.

---

## 6. Coding & Implementation Rules
1. **Semantic Color Usage**: Never hardcode hex codes or arbitrary Tailwind color values (e.g. `bg-blue-500`, `#3b82f6`). Always use semantic tokens (`bg-primary`, `bg-card`, `text-muted-foreground`, `border-border`, `bg-s-progress-soft`, etc.).
2. **React 19 & Next.js 16 Standards**:
   * Default to Server Components.
   * Only mark components with `"use client"` when they manage local state, use hooks (`useState`, `useEffect`), or handle DOM browser events.
3. **Accessibility (a11y)**:
   * Accessible names on all buttons and icon-only triggers (`aria-label`).
   * Proper focus states with visible ring: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`.
   * Maintain high text contrast ratios in both light and dark modes.
4. **Interactive States**:
   * Hover: Smooth transition with slight lift or border emphasis (`transition-all duration-200 hover:shadow-lift hover:border-foreground/15`).
   * Active: Subtle tactile push (`active:scale-[0.98]` or `active:translate-y-px`).
   * Upvote: Trigger `.animate-vote` on click.
