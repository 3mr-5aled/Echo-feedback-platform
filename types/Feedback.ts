export type Status = "review" | "planned" | "progress" | "done";
export type Category = "UI/UX" | "Integrations" | "Performance" | "Feature Request" | "Bug" | "Mobile";

export type Feedback = {
  id: string;
  title: string;
  description: string;
  category: Category;
  status: Status;
  votes: number;
  author: string;
  createdAt: string;
  updated: string;
  tags: string[];
  progress: number;
  priority: "Low" | "Medium" | "High";
  adminResponse?: string;
};