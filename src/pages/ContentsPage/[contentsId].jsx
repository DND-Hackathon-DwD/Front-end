import { useParams } from 'react-router-dom'

export default function ContentsPage() {
  const { id } = useParams()

  return (
    <div>
      <h2>게시글 ID: {id}</h2>
    </div>
  )
}
