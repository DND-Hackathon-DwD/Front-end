import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../stores/userSlice'

function LoginComponent() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [loginCheck, setLoginCheck] = useState(false) // 로그인 상태 체크
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        setMsg('')
        setLoading(false)
      }, 2000)
    }
  }, [msg])

  const LoginFunc = (e) => {
    e.preventDefault()
    console.log(email)
    console.log(password)
    if (!email) {
      return alert('이메일을 입력해주세요.')
    } else if (!password) {
      return alert('비밀번호를 입력하세요.')
    } else {
      let body = {
        email,
        password,
      }

      //      axios.post('http://localhost/', body).then((res) => {
      //        console.log(res.data)
      //        if (res.data.code === 200) {
      //          console.log('로그인')
      //          dispatch(loginUser(res.data.userInfo))
      //          setMsg('')
      //        }
      //        if (res.data.code === 400) {
      //          setMsg('ID, Password가 비어있습니다.')
      //        }
      //        if (res.data.code === 401) {
      //          setMsg('존재하지 않는 ID입니다.')
      //        }
      //        if (res.data.code === 402) {
      //          setMsg('Password가 틀립니다.')
      //        }
      //      })
      setLoading(true)
    }

    const LogoutFunc = () => {
      console.log('로그아웃')
      dispatch(clearUser())
    }
  }

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={LoginFunc}>
        <label htmlFor="id">이메일</label>
        <input
          type="text"
          id="id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          로그인
        </button>
      </form>
      <p>{msg}</p>
    </div>
  )
}

export default LoginComponent
