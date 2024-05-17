import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'

const LoginPage = () => {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    login(id, password)
    console.log('로그인이 완료되었습니다.')
    navigate('/')
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <form className="w-4/5 h-full flex flex-col justify-center items-center gap-6">
        <div className="py-4 px-2 flex flex-col w-full gap-1">
          <h1 className="text-2xl font-bold">로그인</h1>
          <p className="text-lg font-semibold">
            로그인하여 다양한 해택을 누려보세요!
          </p>
        </div>
        <div className="flex flex-col w-full">
          <label className="flex gap-3 items-end text-red-500 pl-2">
            <p className="text-lg font-bold text-gray-600">아이디</p>
            <p className="text-sm font-semibold">아이디가 일치하지 않습니다.</p>
          </label>
          <div className="w-full border border-black rounded-md">
            <input
              type="text"
              placeholder="아이디 입력 (6~20자)"
              className="w-full rounded-md px-3 py-2 placeholder:text-sm"
              onChange={(e) => setId(e.target.value)}
              value={id}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label className="flex gap-3 items-end text-red-500 pl-2">
            <p className="text-lg font-bold text-gray-600">비밀번호</p>
            <p className="text-sm font-semibold">
              비밀번호가 일치하지 않습니다.
            </p>
          </label>
          <div className="w-full border border-black rounded-md">
            <input
              type="text"
              placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
              className="w-full rounded-md px-3 py-2 placeholder:text-sm"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-red-500 text-white font-bold py-2 rounded-md mt-4 disabled:transition-opacity disabled:opacity-50"
          disabled={!id || !password}
        >
          로그인
        </button>
      </form>
    </div>
  )
}

export default LoginPage
