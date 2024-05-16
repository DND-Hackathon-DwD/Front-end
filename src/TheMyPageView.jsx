import axios from 'axios'
import { useState, useEffect } from "react"

function TheMyPageView() {
  // const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const [boards, setBoards] = useState([])

  // 테스트용
  const [userInfo, setUserInfo] = useState({
    userId: 1,
    email: "test@test.com",
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

  const handleFetchPosts = async () => {
    try {
      // 서버에 사용자가 작성한 게시물 목록을 가져오는 요청을 보냄
      const response = await axios.get(`http://localhost/board/${userInfo.userId}`);
      setPosts(response.data);
    } catch (error) {
      setError('게시물을 가져오는데 실패하였습니다.');
      console.error('게시물 가져오기 오류:', error);
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
        <p>닉네임 {userInfo.nickname}</p>
        </div>
        <div>
          <h1>내가 작성한 게시물</h1>
          {/* 라우터 이용해서 view 변환 */}
          <ul>
            {boards.map(board => (
              <li key={board.id}>{board.title}</li>
            ))}
          </ul>
        </div> 
        <button onClick={handleLogout}>로그아웃</button>
        </div>
    </div>
  )
}

export default TheMyPageView