export default function BoardPage({ params }: { params: { slug: string } }) {
    return (
        <div>
            <h1>Board</h1>
            <p>{params.slug}</p>
        </div>
    )
}