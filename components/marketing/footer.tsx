import { ThemeToggle } from "@/components/common/theme-toggle"
import { Logo } from "@/components/ui/logo"
import { cn } from "@/lib/utils"
import { Globe } from "lucide-react"
import Link from "next/link"
import * as React from "react"

function GithubIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  )
}

function XTwitterIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const FOOTER_SECTIONS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Public Boards", href: "/board" },
      { label: "Roadmap", href: "/#roadmap" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Changelog", href: "/#changelog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#docs" },
      { label: "API Reference", href: "#api" },
      { label: "Guides", href: "#guides" },
      { label: "Community", href: "#community" },
      { label: "Status", href: "#status" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact Support", href: "#contact" },
    ],
  },
]

export function Footer({ className }: { className?: string } = {}) {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn(
        "w-full border-t border-zinc-800/80 bg-zinc-950 text-zinc-100 transition-colors mt-auto",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Brand & Description (Left Column) */}
          <div className="space-y-4 lg:col-span-2">
            <Logo place="footer" size="default" />

            <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
              A modern, user-centered feedback and product management platform. Collect ideas, prioritize features with voting, and build transparent roadmaps.
            </p>

            {/* Social & External Links + Theme Switcher */}
            <div className="flex items-center gap-2 pt-1 text-zinc-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-lg border border-zinc-800 transition-colors hover:border-zinc-700 hover:bg-zinc-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="size-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-lg border border-zinc-800 transition-colors hover:border-zinc-700 hover:bg-zinc-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="X / Twitter"
              >
                <XTwitterIcon className="size-3.5" />
              </a>
              <a
                href="https://3mr5aled.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-8 items-center justify-center rounded-lg border border-zinc-800 transition-colors hover:border-zinc-700 hover:bg-zinc-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Creator Portfolio"
              >
                <Globe className="size-4" />
              </a>

              <div className="ml-1 pl-2 border-l border-zinc-800">
                <ThemeToggle className="size-8 rounded-lg border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900 hover:text-white" />
              </div>
            </div>
          </div>

          {/* Navigation Columns (Right Columns) */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title} className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
                  {section.title}
                </h4>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="rounded-xs text-zinc-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Rights Reserved & Developer Credit */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800/80 pt-8 sm:flex-row text-xs text-zinc-400">
          <p>© {currentYear} Echo Feedback Platform. All rights reserved.</p>

          <p className="flex items-center gap-1.5">
            <span>Developed by</span>
            <a
              href="https://3mr5aled.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-200 underline-offset-4 hover:underline hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xs"
            >
              3mr 5aled
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
