export default function FeedbackPage({ params }: { params: { id: string, feedbackId: string } }) {
    return (
        <div>
            <h1>Feedback</h1>
            <p>{params.id}</p>
            <p>{params.feedbackId}</p>
        </div>
    )
}