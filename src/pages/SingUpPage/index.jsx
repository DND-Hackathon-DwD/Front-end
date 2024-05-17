import { useState } from 'react'
import { MyPositionSetting } from './components'
import { LeftArrowIcon, LogoIcon, LogoSmallIcon } from '@/assets/Icons'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [idFailMsg, setIdFailMsg] = useState('')
  const [passwordFailMsg, setPasswordFailMsg] = useState('')
  const [nicknameFailMsg, setNicknameFailMsg] = useState('')
  const [isIdValid, setIsIdValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isNicknameValid, setIsNicknameValid] = useState(false)

  const [step, setStep] = useState(1)

  const handleChangeId = (e) => {
    setId(e.target.value)
    if (e.target.value.length > 20 || e.target.value.length < 6) {
      setIdFailMsg('사용할 수 없는 아이디입니다.')
      setIsIdValid(false)
    } else {
      setIdFailMsg('')
      setIsIdValid(true)
    }
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length > 20 || e.target.value.length < 8) {
      setPasswordFailMsg('비밀번호는 8~20자 이내로 입력해주세요.')
      setIsPasswordValid(false)
    } else {
      setPasswordFailMsg('')
      setIsPasswordValid(true)
    }
  }

  const handleChangeNickname = (e) => {
    setNickname(e.target.value)
    if (e.target.value.length > 10 || e.target.value.length < 2) {
      setNicknameFailMsg('닉네임은 2~10자 이내로 입력해주세요.')
      setIsNicknameValid(false)
    } else {
      setNicknameFailMsg('')
      setIsNicknameValid(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('자신 위치 설정 페이지로 이동')
    setStep(2)
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex relative py-6 justify-center w-full">
        <LeftArrowIcon className="absolute left-6 w-6 h-6" onClick={() => navigate('/landing')} />
        <p className="text-xl">회원가입하기</p>
      </div>

      {step === 1 ? (
        <>
          <i className="flex justify-center items-center w-full">
            <LogoIcon className="w-48 h-48" />
          </i>
          <form className="w-4/5 h-full flex flex-col justify-center items-center gap-6">
            <div className="flex flex-col w-full">
              <label className="flex gap-3 items-end text-red-500 pl-2">
                <p className="text-lg">이메일</p>
                <p className="text-sm font-semibold">{idFailMsg}</p>
              </label>
              <div className="w-full border border-primary rounded-xl overflow-hidden">
                <input
                  type="text"
                  placeholder="사용 중인 이메일 주소를 입력해주세요."
                  className="w-full rounded-md px-4 py-4 placeholder:text-sm"
                  onChange={handleChangeId}
                  value={id}
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className="flex gap-3 items-end text-red-500 pl-2">
                <p className="text-lg">비밀번호</p>
                <p className="text-sm font-semibold">{passwordFailMsg}</p>
              </label>
              <div className="w-full border border-primary rounded-xl overflow-hidden">
                <input
                  type="text"
                  placeholder="6자 이상 입력해주세요."
                  className="w-full rounded-md px-4 py-4 placeholder:text-sm"
                  onChange={handleChangePassword}
                  value={password}
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label className="flex gap-3 items-end text-red-500 pl-2">
                <p className="text-lg">닉네임</p>
                <p className="text-sm font-semibold">{nicknameFailMsg}</p>
              </label>
              <div className="w-full border border-primary rounded-xl overflow-hidden">
                <input
                  type="text"
                  placeholder="원하시는 닉네임을 자유롭게 입력해주세요."
                  className="w-full rounded-md px-4 py-4 placeholder:text-sm"
                  onChange={handleChangeNickname}
                  value={nickname}
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className={`w-full flex justify-center ${!isIdValid || !isPasswordValid || !isNicknameValid ? 'bg-[#f5f5f5]]' : 'bg-primary'} items-center gap-1 font-bold py-4 rounded-lg mt-2 disabled:border disabled:border-gray-400`}
              disabled={!isIdValid || !isPasswordValid || !isNicknameValid}
            >
              <p
                className={`${!isIdValid || !isPasswordValid || !isNicknameValid ? 'text-gray-400' : 'text-[#fff]'}`}
              >
                지금 바로
              </p>
              <LogoSmallIcon
                className={`w-10 ${!isIdValid || !isPasswordValid || !isNicknameValid ? 'fill-gray-400' : 'fill-[#fff]'}`}
              />
              <p
                className={`${!isIdValid || !isPasswordValid || !isNicknameValid ? 'text-gray-400' : 'text-[#fff]'}`}
              >
                회원가입하기
              </p>
            </button>
          </form>
        </>
      ) : (
        <MyPositionSetting />
      )}
    </div>
  )
}

export default SignUpPage
