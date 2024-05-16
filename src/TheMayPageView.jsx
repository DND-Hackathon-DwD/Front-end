import axios from 'axios'
import { useState, useEffect } from "react"

function TheMyPageView() {
  // const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');

  // 테스트용
  const [userInfo, setUserInfo] = useState({
    email: "test@test.com",
    name: "kim",
    nickname: "테스트 ",
  })

  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     try {
  //       // 현재 로그인 중이라면
  //       // 토큰 만료 확인 추가
  //       // 서버에 GET 요청을 보내고, 현재 로그인 중인 회원의 정보를 받아옴
  //       const response = await axios.get('http://localhost/userInfo');
  //       setUserInfo(response.data);
  //        
  //       
  //       // 로그인 중이 아니라면
  //       // 로그인 페이지로 이동
  //
  //     } catch (error) {
  //       setError('회원 정보를 가져오는데 실패하였습니다.');
  //       console.error('회원 정보 가져오기 오류:', error);
  //     }
  //   }
    
  //   getUserInfo()
  // }, []);

  if (!userInfo) {
    return (
      <div>
        <p>Loading...</p>
        <p>라우터 추가시 삭제할 코드</p>
      </div>
    )
  }

  const handleLogout = async () => {
    try {
      setUserInfo(null)
      //sessionStorage.removeItem("accessToken")
      //sessionStorage.removeItem("refreshToken")
    } catch(error) {
      console.error(error)
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="text-center">
      <h1>마이 페이지</h1>
      <div>
        프로필 사진
      </div>
      <div>
        <p>이메일 {userInfo.email}</p>
        <p>이름 {userInfo.name}</p>
        <p>닉네임 {userInfo.nickname}</p>
      </div>
        <button onClick={handleLogout}>로그아웃</button>
        </div>
    </div>
  )
}

export default TheMyPageView