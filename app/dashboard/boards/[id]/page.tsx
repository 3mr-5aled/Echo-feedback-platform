export default function BoardPage({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1>Board</h1>
            <p>{params.id}</p>
        </div>
    )
}