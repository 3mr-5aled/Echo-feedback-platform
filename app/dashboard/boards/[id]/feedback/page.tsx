export default function FeedbackPage({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1>Feedback</h1>
            <p>{params.id}</p>
        </div>
    )
}