import { Board } from "@/types";
import { FEEDBACK } from "./FeedbacksData";

export const BoardsData: Board[] = [
  {
    id: "b1",
    title: "Product Feedback",
    status: "opened",
    description:
      "Public ideas and requests for the core product. Vote, comment, and track what the team is working on next.",
    feedbacks: [FEEDBACK[0], FEEDBACK[1], FEEDBACK[3], FEEDBACK[5]],
  },
  {
    id: "b2",
    title: "Platform & Integrations",
    status: "in progress",
    description:
      "Connect Echo with the tools your team already uses — APIs, webhooks, Slack, and export workflows.",
    feedbacks: [FEEDBACK[1], FEEDBACK[3], FEEDBACK[5]],
  },
  {
    id: "b3",
    title: "Mobile Experience",
    status: "review",
    description:
      "Feedback focused on the phone and tablet experience, including navigation, tap targets, and performance.",
    feedbacks: [FEEDBACK[2]],
  },
  {
    id: "b4",
    title: "Design System",
    status: "opened",
    description:
      "Branding, theming, and visual polish for public boards so they feel like part of your product.",
    feedbacks: [FEEDBACK[0], FEEDBACK[4]],
  },
  {
    id: "b5",
    title: "Reliability",
    status: "closed",
    description:
      "Bugs and performance issues that have been triaged and resolved. Kept for reference and changelog context.",
    feedbacks: [FEEDBACK[6], FEEDBACK[7]],
  },
];
