import Link from "next/link";

export default function FeedbackPage({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1>Feedback</h1>
            <p>{params.id}</p>
            <Link href={`/dashboard/boards/${params.id}/feedback/1`}>Feedback 1</Link>
            <Link href={`/dashboard/boards/${params.id}/feedback/2`}>Feedback 2</Link>
            <Link href={`/dashboard/boards/${params.id}/feedback/3`}>Feedback 3</Link>
            <Link href={`/dashboard/boards/${params.id}/feedback/4`}>Feedback 4</Link>
            <Link href={`/dashboard/boards/${params.id}/feedback/5`}>Feedback 5</Link>
            <Link href={`/dashboard/boards/${params.id}/feedback/6`}>Feedback 6</Link>
            <Link href={`/dashboard/boards/${params.id}/feedback/7`}>Feedback 7</Link>
            <Link href={`/dashboard/boards/${params.id}/feedback/8`}>Feedback 8</Link>
        </div>
    )
}