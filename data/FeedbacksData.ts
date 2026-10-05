import { Feedback } from "@/types";

export const FEEDBACK: Feedback[] = [
  {
    id: "dark-mode", title: "Add dark mode", category: "UI/UX", status: "progress", votes: 482,
    description: "Working late nights with a bright white interface is exhausting. A system-aware dark theme with a manual toggle would make the app far more comfortable, especially for teams across time zones.",
    author: "maya", createdAt: "2026-08-12", updated: "2h ago", tags: ["theme", "accessibility"], progress: 65, priority: "High",
    adminResponse: "We're actively building this! Dark theme tokens are done and we're now polishing charts and embeds. Expect a beta in the next release.",
  },
  {
    id: "slack", title: "Integrate Slack notifications", category: "Integrations", status: "planned", votes: 356,
    description: "Post new feedback, status changes and comments to a chosen Slack channel so the product team can react without leaving Slack.",
    author: "omar", createdAt: "2026-08-28", updated: "1d ago", tags: ["slack", "notifications"], progress: 15, priority: "High",
    adminResponse: "Scheduled for Q4. We'll start with channel posts and add per-user DMs later.",
  },
  {
    id: "mobile", title: "Improve mobile experience", category: "Mobile", status: "progress", votes: 298,
    description: "Voting and commenting on phones feels cramped. Larger tap targets, a bottom navigation and faster loading would help a lot.",
    author: "lena", createdAt: "2026-07-30", updated: "5h ago", tags: ["responsive"], progress: 40, priority: "Medium",
  },
  {
    id: "csv", title: "Export feedback to CSV", category: "Feature Request", status: "done", votes: 214,
    description: "Allow exporting all feedback with votes, statuses and comments to CSV for reporting in spreadsheets.",
    author: "jonas", createdAt: "2026-06-04", updated: "2w ago", tags: ["export", "reporting"], progress: 100, priority: "Medium",
    adminResponse: "Shipped in v2.4! Find it under Feedback → Export.",
  },
  {
    id: "branding", title: "Add custom branding", category: "UI/UX", status: "planned", votes: 187,
    description: "Upload our logo, pick brand colors and use a custom domain for the public board so it feels like part of our product.",
    author: "priya", createdAt: "2026-09-02", updated: "3d ago", tags: ["white-label"], progress: 10, priority: "Medium",
  },
  {
    id: "api", title: "Create public API", category: "Integrations", status: "review", votes: 163,
    description: "A REST API with webhooks would let us sync feedback with our internal tools and CRM.",
    author: "sam", createdAt: "2026-09-14", updated: "6h ago", tags: ["api", "webhooks"], progress: 0, priority: "Low",
  },
  {
    id: "search", title: "Improve search performance", category: "Performance", status: "review", votes: 121,
    description: "Search takes a few seconds on boards with 5,000+ posts. Instant, typo-tolerant search would be great.",
    author: "aiko", createdAt: "2026-09-20", updated: "12h ago", tags: ["search"], progress: 0, priority: "Medium",
  },
  {
    id: "dup-bug", title: "Duplicate notifications on mention", category: "Bug", status: "done", votes: 74,
    description: "Being mentioned in a comment sends the email notification twice.",
    author: "leo", createdAt: "2026-08-01", updated: "3w ago", tags: ["email"], progress: 100, priority: "High",
  },
];