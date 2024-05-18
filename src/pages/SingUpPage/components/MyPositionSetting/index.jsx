import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const MyPositionSetting = ({ onClick }) => {
  const navigate = useNavigate()
  const { kakao } = window
  const [initPosition, setInitPosition] = useState(null)
  const [position, setPosition] = useState(null)
  const [address, setAddress] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude
      const lng = position.coords.longitude

      setInitPosition({ lat, lng })
      setPosition({ lat, lng })
    })
  }, [])

  const handleClickMap = (_, mouseEvent) => {
    const geocoder = new kakao.maps.services.Geocoder()
    geocoder.coord2Address(position.lng, position.lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name)
      }
    })

    setPosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (onClick) onClick(position, address)
  }

  return (
    <>
      {initPosition ? (
        <div className="w-full h-full flex flex-col justify-center items-center gap-5 z-10"
          style={{ position: 'relative' }}>
          {/* <div className="py-1 text-2xl font-bold">내 동네 설정하기</div> */}
          <Map
            id="map"
            className="w-full h-full"
            style={{ minHeight: 250 }}
            center={initPosition}
            level={4}
            onClick={handleClickMap}
          >
            <p className="text-gray-600 font-semibold"
              style={{ position: 'absolute', zIndex: 100, top: 10, borderRadius: 8, padding: 8, background: '#ff9135', color: 'white' }}
            >{address}</p>
            <MapMarker position={position} />
            <button
              onClick={handleSubmit}
              style={{ position: 'absolute', zIndex: 100, bottom: 10, borderRadius: 8, padding: 8, background: '#ff9135', color: 'white' }}
              className="bg-red-500 text-white py-2 rounded-md mt-4"
            >
              내 위치 설정
            </button>
          </Map>
        </div>
      ) : (
        <div>위치 정보를 불러오는 중입니다...</div>
      )}
    </>
  )
}

export default MyPositionSetting
