import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground font-sans">
        Echo Feedback Platform
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted-foreground">
        Welcome to the home page of the Echo Feedback Platform. Collect feedback, prioritize with votes, and build transparent roadmaps.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Button asChild size="lg" className="rounded-xl shadow-xs">
          <Link href="/signup">Get Started</Link>
        </Button>
        <Button variant="outline" asChild size="lg" className="rounded-xl">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
