import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const MyPositionSetting = () => {
  const navigate = useNavigate()
  const [initPosition, setInitPosition] = useState(null)
  const [position, setPosition] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setInitPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // 서버로 회원가입 요청을 보내는 코드
    // ID, 닉네임 중복 확인 처리 코드 필요
    console.log('회원 가입 완료')
    navigate('/login')
  }

  return (
    <>
      {initPosition ? (
        <div className="w-full h-full flex flex-col justify-center items-center gap-6">
          <div className="py-3 text-2xl font-bold">내 동네 설정하기</div>
          <Map
            id="map"
            className="w-full h-[600px] border-2 border-black"
            center={initPosition}
            level={3}
            onClick={(_, mouseEvent) => {
              setPosition({
                lat: mouseEvent.latLng.getLat(),
                lng: mouseEvent.latLng.getLng(),
              })
            }}
          >
            <MapMarker position={position} />
          </Map>
          <button
            onClick={handleSubmit}
            className="w-3/5 bg-red-500 text-white font-bold py-2 rounded-md mt-4"
          >
            내 위치 설정
          </button>
        </div>
      ) : (
        <div>위치 정보를 불러오는 중입니다...</div>
      )}
    </>
  )
}

export default MyPositionSetting
