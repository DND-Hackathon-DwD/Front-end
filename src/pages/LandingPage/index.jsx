import { LogoIcon, LogoSmallIcon } from '@/assets/Icons'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full h-full flex flex-col items-center">
      <i className="w-full h-full flex justify-center items-center">
        <LogoIcon className="w-48 h-48" />
      </i>
      <div className="flex flex-col gap-6 px-6 py-8 w-full">
        <button className="bg-primary w-full rounded-lg py-4" onClick={() => navigate('/login')}>
          <div className="flex justify-center items-center gap-1">
            <LogoSmallIcon className="w-10 fill-[#FFF]" />
            <p className="text-[#fff]">로그인하기</p>
          </div>
        </button>
        <button
          className="bg-[#FFF7ED] py-4 border border-primary w-full rounded-lg"
          onClick={() => navigate('/signup')}
        >
          <div className="flex justify-center items-center gap-1">
            <p className="text-gray-400">지금 바로</p>
            <LogoSmallIcon className="w-10 fill-primary" />
            <p className="text-gray-400">회원가입하기</p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default LandingPage
