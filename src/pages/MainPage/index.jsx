import { useRef, useEffect, useState, useCallback } from 'react'

const MainPage = () => {
  const endRef = useRef(null)
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7, 8, 0, 10, 11, 12, 13, 14, 15, 16])
  const fetchData = () => {
    setData((prevData) => prevData.concat([1, 2, 3, 4, 5, 6, 7, 8, 0, 10, 11, 12, 13, 14, 15, 16]))
  }

  const handleInfiniteScroll = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fetchData()
      }
    })
  }, [])

  useEffect(() => {
    if (endRef.current) {
      const observer = new IntersectionObserver(handleInfiniteScroll, {
        threshold: 1.0,
      })
      observer.observe(endRef.current)

      return () => observer.disconnect()
    }
  }, [handleInfiniteScroll])

  return (
    <div className="w-full h-full flex flex-col items-center gap-5 justify-start relative py-4 px-2">
      <div className="font-bold text-2xl">게시글 페이지</div>
      <div className="flex flex-wrap h-full w-full justify-center gap-4 py-2 overflow-y-scroll">
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className="w-32 h-40 shrink-0 flex justify-center items-center bg-red-100 rounded-lg shadow-md"
            >
              {item}
            </div>
          ))}
        <div ref={endRef} className="w-full h-1" />
      </div>
    </div>
  )
}

export default MainPage
