// UserLogin.jsx
import React, { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

const UserLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault() // 기본 동작 방지

    try {
      const response = await axios.post('http://your-api-url/login', {
        username,
        password,
      })
      const token = response.data.token
      const decoded = jwt_decode(token)
      console.log(decoded) // 디코딩된 토큰 정보 출력
      // 로그인 성공 시 필요한 작업 수행 (예: 토큰 저장)
    } catch (error) {
      setError('로그인에 실패하였습니다.')
      console.error('로그인 오류:', error)
    }
  }

  return (
    <div>
      <h1>로그인 페이지</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>사용자명:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  )
}

export default UserLogin
