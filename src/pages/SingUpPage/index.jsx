import { useState } from 'react'
import { MyPositionSetting } from './components'

const SignUpPage = () => {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [idFailMsg, setIdFailMsg] = useState('')
  const [passwordFailMsg, setPasswordFailMsg] = useState('')
  const [nicknameFailMsg, setNicknameFailMsg] = useState('')
  const [isIdValid, setIsIdValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isNicknameValid, setIsNicknameValid] = useState(false)

  const [step, setStep] = useState(2)

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
      {step === 1 ? (
        <form className="w-4/5 h-full flex flex-col justify-center items-center gap-6">
          <div className="py-4 px-2 flex flex-col w-full gap-1">
            <h1 className="text-2xl font-bold">회원가입</h1>
            <p className="text-lg font-semibold">회원이 되어 다양한 해택을 누려보세요!</p>
          </div>
          <div className="flex flex-col w-full">
            <label className="flex gap-3 items-end text-red-500 pl-2">
              <p className="text-lg font-bold text-gray-600">아이디</p>
              <p className="text-sm font-semibold">{idFailMsg}</p>
            </label>
            <div className="w-full border border-black rounded-md">
              <input
                type="text"
                placeholder="아이디 입력 (6~20자)"
                className="w-full rounded-md px-3 py-2 placeholder:text-sm"
                onChange={handleChangeId}
                value={id}
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="flex gap-3 items-end text-red-500 pl-2">
              <p className="text-lg font-bold text-gray-600">비밀번호</p>
              <p className="text-sm font-semibold">{passwordFailMsg}</p>
            </label>
            <div className="w-full border border-black rounded-md">
              <input
                type="text"
                placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
                className="w-full rounded-md px-3 py-2 placeholder:text-sm"
                onChange={handleChangePassword}
                value={password}
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <label className="flex gap-3 items-end text-red-500 pl-2">
              <p className="text-lg font-bold text-gray-600">닉네임</p>
              <p className="text-sm font-semibold">{nicknameFailMsg}</p>
            </label>
            <div className="w-full border border-black rounded-md">
              <input
                type="text"
                placeholder="닉네임을 입력해주세요"
                className="w-full rounded-md px-3 py-2 placeholder:text-sm"
                onChange={handleChangeNickname}
                value={nickname}
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-red-500 text-white font-bold py-2 rounded-md mt-4 disabled:transition-opacity disabled:opacity-50"
            disabled={!isIdValid || !isPasswordValid || !isNicknameValid}
          >
            회원가입
          </button>
        </form>
      ) : (
        <MyPositionSetting />
      )}
    </div>
  )
}

export default SignUpPage
