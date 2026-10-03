import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold">Home</h1>
      <p className="text-lg text-gray-600">
        Welcome to the home page of the Echo Feedback Platform.
      </p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
        <Link href="/login">Get Started</Link>
      </button>
      <nav>
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/board">Board</Link>
        <Link href="/feedback">Feedback</Link>
        <Link href="/new-board">New Board</Link>
      </nav>
    </div>
  );
}
