import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ContentsPage() {
  const { id } = useParams()
  const [isVisible, setIsVisible] = useState(true)

  const handleJoin = () => {
    setIsVisible(!isVisible)
  }
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <header className="min-w-[430px] flex flex-col border-b border-grey-400">
        <h2 className="text-center text-lg pt-2">{id}. 게시글 제목</h2>
        <a
          href="#"
          className="cursor-pointer py-1 pl-10 flex items-center text-sm outline-none focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
        >
          <img
            src="https://placekitten.com/40/40"
            className="h-9 w-9 rounded-full object-cover"
            alt="user"
          />
          <p className="block ml-2 font-bold">작성자 닉네임</p>
        </a>
        <div>작성자 나눔 포인트</div>
        <div className="flex justify-between space-x-4 mb-4 pl-10">
          <p className="text-gray-500 text-sm">x 시간 전에 작성</p>
        </div>
      </header>

      <div className="min-h-96 mt-5 border-b border-grey-400">
        <div>사진...</div>
        <div>게시글 내용</div>
        <div>나눔 위치</div>
        <div>모집 인원 수(최소 ~ 최대)</div>
        <div>만나는 시간</div>
      </div>
      {/* { userInfo.나눔자 ? 띱 버튼 보이기 : 안보이기} */}
      <div>
        <button
          className={`middle none center rounded-lg bg-indigo-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${isVisible ? '' : 'hidden'}`}
          onClick={handleJoin}
        >
          띱!
        </button>
        <button
          className={`middle none center rounded-lg bg-indigo-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${isVisible ? 'hidden' : ''}`}
          onClick={handleJoin}
        >
          띱 취소
        </button>
      </div>
    </div>
  )
}
