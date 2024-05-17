import React from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const SharingRadiusMap = () => {
  const navigate = useNavigate()
  const { kakao } = window
  const [initPosition, setInitPosition] = useState(null)
  const [position, setPosition] = useState(null)
  const [address, setAddress] = useState('')
  const [sharingList, setSharingList] = useState([])

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

    // 주변 나눔 리스트 목록 api 요청
    setSharingList([
      {
        title: '카카오',
        latlng: { lat: 33.450705, lng: 126.570677 },
      },
      {
        title: '생태연못',
        latlng: { lat: 33.450936, lng: 126.569477 },
      },
      {
        title: '텃밭',
        latlng: { lat: 33.450879, lng: 126.56994 },
      },
      {
        title: '근린공원',
        latlng: { lat: 33.451393, lng: 126.570738 },
      },
    ])
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

  return (
    <>
      {initPosition ? (
        <div className="w-full h-full flex flex-col justify-center items-center gap-5">
          <div className="py-1 text-2xl font-bold">내 동네 설정하기</div>
          <p className="text-gray-600 font-semibold">{address}</p>
          <Map
            id="map"
            className="w-full h-[600px] border-2 border-black"
            center={initPosition}
            level={4}
            onClick={handleClickMap}
          >
            {/* sharingList size = 0이라면 infowindow 표시? */}
            {sharingList.map((position, index) => (
              // 만약 마감된 리스트라면 표시 안함!
              <MapMarker
                key={`${position.title}-${position.latlng}`}
                position={position.latlng} // 마커를 표시할 위치
                image={{
                  src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
                  size: {
                    width: 24,
                    height: 35,
                  }, // 마커이미지의 크기입니다
                }}
                title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              />
            ))}
          </Map>
        </div>
      ) : (
        <div>위치 정보를 불러오는 중입니다...</div>
      )}
    </>
  )
}

export default SharingRadiusMap
