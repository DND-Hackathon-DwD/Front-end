import { Link } from 'react-router-dom'

export default function Home() {
  const sample = [1, 2, 3, 4, 5, 6, 7, 8, 0]

  return (
    <>
      <h1 className="w-full flex justify-center bg-green-200">I'm Juha</h1>
      <Link to="/posting">
        <div>게시물 작성하기</div>
      </Link>
      <Link to="/contents-list">
        <div>리스트 보기(무한스크롤)</div>
      </Link>
      <div>게시물로 이동</div>
      {sample.map((contentsId) => {
        return (
          <Link key={contentsId} to={`/${contentsId}`}>
            <div>{contentsId}</div>
          </Link>
        )
      })}
    </>
  )
}
