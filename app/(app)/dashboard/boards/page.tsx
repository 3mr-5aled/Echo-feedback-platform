import Link from "next/link";

export default function BoardsPage() {
    return (
        <div>
            <h1>Boards</h1>
            <Link href="/dashboard/boards/new">New Board</Link>
            <Link href="/dashboard/boards/1">Board 1</Link>
            <Link href="/dashboard/boards/2">Board 2</Link>
            <Link href="/dashboard/boards/3">Board 3</Link>
            <Link href="/dashboard/boards/4">Board 4</Link>
            <Link href="/dashboard/boards/5">Board 5</Link>
            <Link href="/dashboard/boards/6">Board 6</Link>
            <Link href="/dashboard/boards/7">Board 7</Link>
            <Link href="/dashboard/boards/8">Board 8</Link>
        </div>
    )
}