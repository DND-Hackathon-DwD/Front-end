import { Link } from 'react-router-dom'

const MainPage = () => {
  const sample = [1, 2, 3, 4, 5, 6, 7, 8, 0]

  return (
    <div>
      <h1>Main Page</h1>
      <Link to="/posting">
        <div>게시물 작성하기</div>
      </Link>
      <Link to="/contents-list">
        <div>리스트 보기(무한스크롤)</div>
      </Link>
      <div>게시물로 이동</div>
      {sample.map((contentsId) => {
        return (
          <Link key={contentsId} to={`/contents/${contentsId}`}>
            <div>{contentsId}</div>
          </Link>
        )
      })}
    </div>
  )
}

export default MainPage
