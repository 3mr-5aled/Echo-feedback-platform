import { Feedback } from "./Feedback";

export type Status = "review" | "opened" | "in progress" | "closed";

export interface Board{
    id: string;
    title: string;
    status: Status;
    description: string;
    feedbacks: Feedback[];
}