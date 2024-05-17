import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import './index.css'
import { Link } from 'react-router-dom'

// 예시용으로 다른 곳 데이터 가져옴.

export default function ContentsListPage() {
  // 한번에 가져올 데이터 수
  const limit = 20
  const [contents, setContents] = useState(null)
  const [page, setPage] = useState(1)
  const [isLoading, setLoading] = useState(false)
  const observer = new IntersectionObserver((entries) => {
    // observe하는 모든 요소가 배열로 e에 들어감
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isLoading) {
        // 화면에 보여지는가
        fetchContents()
      }
    })
  })

  const fetchContents = async () => {
    if (isLoading) return
    setLoading(true)
    const response = await fetch(`http://34.64.252.48/contents?page=${page}&limit=${limit}`)

    const responseJson = await response.json()
    if (Math.ceil(responseJson.total / limit) <= responseJson.page) {
      observer.disconnect()
    }
    setPage(page + 1)
    if (contents) setContents([...contents, ...responseJson.list])
    else setContents(responseJson.list)
    setLoading(false)
  }

  useEffect(() => {
    fetchContents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const target = document.getElementById('target')
    if (target) observer.observe(target)

    return observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contents])

  return (
    <div className="contentsListContainer">
      {!isLoading &&
        contents &&
        contents.map((content, index) => {
          return (
            <ContentsCard
              key={content.id}
              id={content.id}
              title={content.name}
              text={content.description}
              imageUrl={content.mainThumbnail.url}
              target={index === (page - 1) * limit - 5}
            />
          )
        })}
    </div>
  )
}

ContentsCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  imageUrl: PropTypes.string,
  target: PropTypes.bool,
}

function ContentsCard(props) {
  return (
    <div className="card" id={`${props.target && 'target'}`}>
      {props.imageUrl && (
        <Link href={`/contents/${props.id}`}>
          <img src={props.imageUrl} alt="thumbnail" className="thumbnail" />
        </Link>
      )}
      <div className="title">{props.title}</div>
      <div className="text">{props.text}</div>
      <button
        type="button"
        onClick={() => {
          // 좋아요
        }}
        style={{ backgroundColor: 'black', color: 'white', width: '100px', borderRadius: '8px' }}
      >
        좋아요
      </button>
    </div>
  )
}
