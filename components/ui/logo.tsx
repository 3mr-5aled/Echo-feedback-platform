import { cn } from "@/lib/utils"
import { Radio } from "lucide-react"
import Link from "next/link"
import * as React from "react"

export type LogoPlace = "header" | "footer" | "sidebar" | "dashboard" | "standalone"
export type LogoSize = "sm" | "default" | "lg" | "xl"

export interface LogoProps extends React.HTMLAttributes<HTMLElement> {
  place?: LogoPlace
  size?: LogoSize
  hasText?: boolean
  badge?: string | boolean | null
  href?: string | null
}

const SIZE_CONFIGS: Record<
  LogoSize,
  {
    box: string
    icon: string
    text: string
    badge: string
    gap: string
  }
> = {
  sm: {
    box: "size-7 rounded-lg",
    icon: "size-3.5",
    text: "text-base font-bold",
    badge: "text-[10px] px-1.5 py-0.25",
    gap: "gap-2",
  },
  default: {
    box: "size-8.5 rounded-xl",
    icon: "size-4.5",
    text: "text-lg font-bold",
    badge: "text-[11px] px-2 py-0.5",
    gap: "gap-2.5",
  },
  lg: {
    box: "size-10 rounded-xl",
    icon: "size-5",
    text: "text-xl font-bold",
    badge: "text-xs px-2.5 py-0.5",
    gap: "gap-3",
  },
  xl: {
    box: "size-12 rounded-2xl",
    icon: "size-6",
    text: "text-2xl font-bold",
    badge: "text-xs px-3 py-1",
    gap: "gap-3.5",
  },
}

export function Logo({
  place = "standalone",
  size = "default",
  hasText = true,
  badge = true,
  href,
  className,
  ...props
}: LogoProps) {
  const config = SIZE_CONFIGS[size] || SIZE_CONFIGS.default

  // Contextual destination if not explicitly overridden
  const resolvedHref =
    href !== undefined
      ? href
      : place === "dashboard" || place === "sidebar"
        ? "/dashboard"
        : "/"

  // Contextual color mappings based on placement
  const isFooter = place === "footer"
  const titleColor = isFooter ? "text-white" : "text-foreground"
  const badgeStyle = isFooter
    ? "bg-primary/20 text-white"
    : "bg-primary-soft text-primary"

  // Badge content resolution
  const badgeText = typeof badge === "string" ? badge : badge === true ? "Platform" : null

  const content = (
    <>
      {/* Icon Container: solid primary background with white icon across all modes */}
      <div
        className={cn(
          "flex shrink-0 items-center justify-center bg-primary text-white shadow-xs transition-transform duration-200 group-hover:scale-105",
          config.box
        )}
      >
        <Radio className={cn("text-white shrink-0", config.icon)} aria-hidden="true" />
      </div>

      {/* Brand title and optional badge */}
      {hasText && (
        <div className="flex items-center gap-1.5 leading-none">
          <span className={cn("tracking-tight font-sans", titleColor, config.text)}>
            Echo
          </span>
          {badgeText && (
            <span
              className={cn(
                "rounded-full font-semibold transition-colors",
                badgeStyle,
                config.badge
              )}
            >
              {badgeText}
            </span>
          )}
        </div>
      )}
    </>
  )

  const sharedClassName = cn(
    "group inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg select-none",
    config.gap,
    className
  )

  if (resolvedHref) {
    return (
      <Link
        href={resolvedHref}
        className={sharedClassName}
        aria-label="Echo Home"
        {...props}
      >
        {content}
      </Link>
    )
  }

  return (
    <div className={sharedClassName} {...props}>
      {content}
    </div>
  )
}
