# Feedback Board Design System

A modern, scalable design system created for the **Echo** feedback and product management platform. It combines **Flat Design** with **Bento-inspired layouts** to create an interface that feels clean, structured, approachable, and highly functional.

The system is built around **clarity, consistency, accessibility, and flexibility**, providing a shared visual language across both the customer-facing feedback experience and the internal admin dashboard.

---

## 1. Visual Language & Core Principles

### Flat Design + Bento Layouts
* **Flat Surfaces**: Solid, clean semantic surfaces with crisp 1px borders (`border-border`) and high legibility. Avoid heavy gradients or skeuomorphic styling.
* **Bento Structure**: Modular rectangular cards that fit into responsive grids. Cards adapt in size and visual hierarchy to their information density.
* **Rounded Corners**: Generous radii (`rounded-2xl` / 1.25rem container radius via `.bento`, `rounded-lg` for inner elements, `rounded-full` for badges and avatars).
* **Restrained Shadows**: Subtle, calm elevation using OKLCH-alpha shadows (`shadow-card` for resting cards, `shadow-lift` for hover/elevated states).
* **Generous Whitespace**: Ample padding (`p-5` to `p-6` on bento cards, `gap-4` to `gap-6` in grids) preventing visual clutter.

---

## 2. Design Tokens Reference

All design tokens are defined in `app/globals.css` using the `oklch()` color model for consistent perceptual lightness across light and dark modes.

### Surfaces & Backgrounds
| Token / Utility | Light Mode Value | Dark Mode Value | Usage |
| :--- | :--- | :--- | :--- |
| `bg-background` | `oklch(0.975 0.004 95)` | `oklch(0.14 0.012 260)` | Main page background |
| `bg-card` | `oklch(1 0 0)` | `oklch(0.18 0.012 260)` | Bento cells, card surfaces |
| `bg-popover` | `oklch(1 0 0)` | `oklch(0.18 0.012 260)` | Menus, tooltips, dialogs |
| `border-border` | `oklch(0.915 0.006 95)` | `oklch(0.26 0.01 260)` | Surface outlines & dividers |
| `border-input` | `oklch(0.9 0.006 95)` | `oklch(0.26 0.01 260)` | Form controls & text inputs |

### Typography & Ink
| Token / Utility | Description |
| :--- | :--- |
| `text-foreground` | High-contrast body text (`oklch(0.2 0.015 260)` in light, `oklch(0.96 0.006 95)` in dark) |
| `text-muted-foreground` | Secondary labels, descriptions, timestamps (`oklch(0.52)` light / `oklch(0.68)` dark) |
| `bg-ink` / `text-ink-foreground` | Maximum contrast surfaces (e.g. primary dark tags, CTA accents) |
| Font Family | `font-sans` ("Manrope", ui-sans-serif, system-ui) |

### Brand & Interactive Colors
| Token / Utility | Light Mode | Dark Mode | Usage |
| :--- | :--- | :--- | :--- |
| `bg-primary` / `text-primary-foreground` | `oklch(0.55 0.17 252)` | `oklch(0.65 0.18 252)` | Main brand buttons, active tabs |
| `bg-primary-soft` | `oklch(0.95 0.03 252)` | `oklch(0.24 0.06 252)` | Soft badge background, active pill fill |
| `bg-secondary` | `oklch(0.955 0.005 95)` | `oklch(0.22 0.01 260)` | Secondary buttons, subtle chips |
| `bg-accent` | `oklch(0.95 0.008 95)` | `oklch(0.24 0.012 260)` | Hover highlights on lists / items |
| `bg-destructive` | `oklch(0.6 0.21 27)` | `oklch(0.62 0.22 27)` | Danger buttons, delete confirmations |
| `ring-ring` | `oklch(0.55 0.17 252)` | `oklch(0.65 0.18 252)` | Focus outline ring |

### Feedback Lifecycle & Status Tokens
Standardized semantic states for roadmap columns, status badges, and feedback triage:

| Status | Text Utility | Background Soft Utility | Indicator Color Description |
| :--- | :--- | :--- | :--- |
| **Under Review** | `text-s-review` | `bg-s-review-soft` | Warm Amber (`oklch(0.72 0.14 75)`) |
| **Planned** | `text-s-planned` | `bg-s-planned-soft` | Soft Indigo / Blue (`oklch(0.55 0.17 252)`) |
| **In Progress** | `text-s-progress` | `bg-s-progress-soft` | Coral / Orange (`oklch(0.62 0.17 45)`) |
| **Done / Completed** | `text-s-done` | `bg-s-done-soft` | Emerald / Mint (`oklch(0.6 0.13 160)`) |

### Custom Utilities
* `.bento`: Pre-composed utility for bento cards:
  ```css
  border-radius: 1.25rem;
  border: 1px solid var(--color-border);
  background: var(--color-card);
  box-shadow: var(--shadow-card);
  ```
* `.animate-vote`: Upvote micro-interaction animation (`vote-pop 320ms ease-out`).
* `shadow-card`: Subtle card resting elevation.
* `shadow-lift`: Elevated hover state elevation.

---

## 3. Component Taxonomy

### 1. Core UI Components (`components/ui/`)
* **Button**: Variants (`default`, `outline`, `secondary`, `ghost`, `destructive`, `link`), sizes (`xs`, `sm`, `default`, `lg`, `icon`).
* **Logo**: Reusable brand mark with variants (`place`: `header`, `footer`, `sidebar`, `dashboard`, `standalone`; `size`: `sm`, `default`, `lg`, `xl`; `hasText`: boolean; `badge`: string/boolean/null). Inner icon stays white in both light and dark modes.
* **Input / Textarea**: Clean flat borders with focus ring.
* **Badge**: Pill badges with solid or soft semantic fills (`bg-s-planned-soft text-s-planned`).
* **Dialog / Modal**: Centered modal with `bg-card`, `rounded-2xl`, `shadow-lift`.
* **Dropdown / Select**: Styled popovers matching theme tokens.
* **Tabs**: Segmented control or underline tabs for filtering views.

### 2. Feedback Domain Components (`components/feedback/`)
* **FeedbackCard**: Individual suggestion card with upvote button, category badge, status indicator, comment count, and author.
* **VoteButton**: Interactive vertical or horizontal counter button with `.animate-vote` trigger and active state.
* **StatusBadge**: Semantic pill displaying roadmap state (Under Review, Planned, In Progress, Done).
* **CategoryTag**: Flat chip for tagging feedback (e.g., "Integrations", "Mobile", "Billing", "UX").
* **RoadmapColumn**: Vertical bento column displaying feedback cards grouped by stage with progress counters.
* **CommentItem / CommentList**: Threaded customer and admin feedback responses.
* **FeedbackModal**: Submission form with title, category select, description, and rich details.

### 3. Layout & Bento Components
* **BentoGrid**: Responsive grid wrapper (`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6`).
* **BentoCard**: Individual modular card supporting asymmetric spans (`col-span-2`, `row-span-2`), headers, and actions.
* **Marketing Header**: Clean, sticky navigation with brand mark, navigation links, theme toggle, and auth actions.
* **App / Dashboard Layout**: Sidebar navigation, breadcrumbs, search & filter bar, and main bento content viewport.

---

## 4. Interaction States & Micro-Interactions

| State | Pattern |
| :--- | :--- |
| **Hover** | Smooth transition `transition-all duration-200 hover:shadow-lift hover:border-foreground/15` |
| **Active / Pressed** | Tactile feedback with `active:scale-[0.98]` or `active:translate-y-px` |
| **Focus** | High-visibility accessible outline `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` |
| **Voting** | Instant optimistic count increment + `.animate-vote` bounce |
| **Disabled** | `disabled:opacity-50 disabled:pointer-events-none` |
| **Loading** | Shimmer skeleton placeholders using `bg-muted animate-pulse rounded-lg` |

---

## 5. Accessibility (a11y) Standards

* **Keyboard Navigation**: All interactive elements must be focusable with discernible focus indicators.
* **Color Independence**: Status badges must combine both color and clear descriptive text labels or icons.
* **Semantic HTML**: Use proper tags (`<main>`, `<nav>`, `<article>`, `<header>`, `<section>`, `<button>`).
* **High Contrast**: Ensure text elements achieve WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text).
