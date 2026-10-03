import Link from "next/link";

export default function BoardPage({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1>Board</h1>
            <p>{params.id}</p>
            <Link href={`/dashboard/boards/${params.id}/feedback`}>Feedback</Link>
        </div>
    )
}