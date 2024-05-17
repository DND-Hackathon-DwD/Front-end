import axios from 'axios'
import { useState, useEffect } from "react"
const { VITE_REACT_API_URL } = import.meta.env;

function MyPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const [boards, setBoards] = useState([])

  // 테스트용
  // const [userInfo, setUserInfo] = useState({
  //   user_id: 2,
  //   email: "test@test.com",
  //   nickname: "테스트 ",
  // })

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        // 현재 로그인 중이라면
        // 토큰 만료 확인 추가
        // 서버에 GET 요청을 보내고, 현재 로그인 중인 회원의 정보를 받아옴
        // const response = await axios.get(VITE_REACT_API_URL + `user/mypage/${userInfo.userId}`);
        const response = await axios.get(VITE_REACT_API_URL + `user/mypage/2`);
        setUserInfo(response.data.data);
        console.log(response.status)
        
        // 로그인 중이 아니라면
        // 로그인 페이지로 이동
  
      } catch (error) {
        setError('회원 정보를 가져오는데 실패하였습니다.');
        console.error('회원 정보 가져오기 오류:', error);
      }
    }
    
    getUserInfo()
  }, []);

  if (!userInfo) {
    return (
      <div>
        <p>Loading...</p>
        {/* 라우터 :홈으로 돌아가기 */}
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
      const response = await axios.get(VITE_REACT_API_URL + `post/user/${userInfo.user_id}`);
      setPosts(response.data);
    } catch (error) {
      setError('게시물을 가져오는데 실패하였습니다.');
      console.error('게시물 가져오기 오류:', error);
    }
  };

  return (
    <div className="flex items-center h-screen w-full justify-center">
      <div className="w-64">
        <div className="bg-white shadow-xl rounded-lg py-3">
          <div className="photo-wrapper p-2">
            <img className="w-32 h-32 rounded-full mx-auto" src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="profile"/>
          </div>
          <div className="p-2">
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{userInfo.nickname}</h3>
            <div className="text-center text-gray-400 text-xs font-semibold">
              <p>@{userInfo.user_id}</p>
            </div>
            <table className="text-xs my-3 flex items-center justify-center">
              <tbody>
                <tr className="">
                  <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                  <td className="px-2 py-2">{userInfo.email}</td>
                </tr>
            </tbody></table>

            <div className="text-center my-3">
                <a className="text-xs text-indigo-500 hover:text-indigo-600 font-medium m-2" href="#">회원정보 수정</a>
                <a className="text-xs text-indigo-500 hover:text-indigo-600 font-medium" href="#" onClick={handleFetchPosts}>게시글 조회</a>
            </div>
            <div>
              {/* 라우터 이용해서 view 변환 */}
              <ul>
                {boards.map(board => (
                  <li key={board.id}>{board.title}</li>
                ))}
              </ul>
            </div> 
            <div className="flex justify-center items-center text-center">
              <button className="middle none center rounded-lg bg-indigo-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" onClick={handleLogout}>로그아웃</button>

            </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default MyPage