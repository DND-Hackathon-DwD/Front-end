import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoIcon, LogoSmallIcon, LeftArrowIcon } from '@/assets/Icons'
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
      <div className="flex relative py-6 justify-center w-full">
        <LeftArrowIcon className="absolute left-6 w-6 h-6" onClick={() => navigate('/landing')} />
        <p className="text-xl">로그인하기</p>
      </div>
      <i className="flex justify-center items-center w-full">
        <LogoIcon className="w-48 h-48" />
      </i>
      <form className="w-full h-full px-6 py-10 flex flex-col items-center gap-6">
        <div className="flex flex-col w-full">
          <label className="flex gap-3 items-end text-red-500 pl-2">
            <p className="text-lg">이메일</p>
          </label>
          <div className="w-full border border-primary rounded-xl overflow-hidden">
            <input
              type="text"
              placeholder="사용 중인 이메일 주소를 입력해주세요."
              className="w-full rounded-md px-4 py-4 placeholder:text-sm"
              onChange={(e) => setId(e.target.value)}
              value={id}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label className="flex gap-3 items-end text-red-500 pl-2">
            <p className="text-lg">비밀번호</p>
          </label>
          <div className="w-full border border-primary rounded-xl overflow-hidden">
            <input
              type="text"
              placeholder="6자 이상 입력해주세요."
              className="w-full rounded-md px-4 py-4 placeholder:text-sm"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-400 py-4">
            <p>비밀번호 찾기</p>
            <p>회원가입</p>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className={`w-full flex justify-center bg-primary items-center gap-1  text-white font-bold py-4 rounded-lg mt-2 disabled:bg-[#F5F5F5] disabled:border disabled:border-gray-400`}
          disabled={!id || !password}
        >
          <LogoSmallIcon className={`w-10 ${!id || !password ? 'fill-gray-400' : 'fill-[#fff]'}`} />
          <p className={`${!id || !password ? 'text-gray-400' : 'text-[#fff]'}`}>로그인하기</p>
        </button>
      </form>
    </div>
  )
}

export default LoginPage
