export default function FeedbackPage({ params }: { params: { slug: string, id: string } }) {
    return (
        <div>
            <h1>Feedback</h1>
            <p>{params.slug}</p>
            <p>{params.id}</p>
        </div>
    )
}