import React from 'react'
import { Map, useMap, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk'
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
        content: <div style={{ color: '#000' }}>카카오</div>,
        latlng: { lat: 33.450705, lng: 126.570677 },
      },
      {
        content: <div style={{ color: '#000' }}>생태연못</div>,
        latlng: { lat: 33.450936, lng: 126.569477 },
      },
      {
        content: <div style={{ color: '#000' }}>텃밭</div>,
        latlng: { lat: 33.450879, lng: 126.56994 },
      },
      {
        content: <div style={{ color: '#000' }}>근린공원</div>,
        latlng: { lat: 33.451393, lng: 126.570738 },
      },
    ])
  }, [])

  const EventMarkerContainer = ({ position, content }) => {
    const map = useMap()
    const [isOpen, setIsOpen] = useState(false) //인포윈도우 open 여부 저장 state

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        clickable={true}
        // @ts-ignore
        onClick={(marker) => {
          setIsOpen(true)
          map.panTo(marker.getPosition())
        }}
      >
        {isOpen && (
          <div className="min-h-auto min-w-auto" style={{ minWidth: '150px' }}>
            <img
              alt="close"
              width="14"
              height="13"
              src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
              style={{
                position: 'absolute',
                right: '5px',
                top: '5px',
                cursor: 'pointer',
              }}
              onClick={() => setIsOpen(false)}
            />
            <div>게시글 리스트 컴포넌트</div>
            <button
              className=""
              onClick={() => {
                // navigation('/contents/:id')
                console.log('상세 보기로 이동할게요')
              }}
            >
              상세 보기
            </button>
          </div>
        )}
      </MapMarker>
    )
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
            center={{
              // 지도의 중심좌표
              lat: 33.450701,
              lng: 126.570667,
            }}
            level={4}
          >
            {/* sharingList size = 0이라면 infowindow 표시? */}
            {sharingList.map((value, index) => (
              // 만약 마감된 리스트라면 표시 안함!
              <EventMarkerContainer
                key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
                position={value.latlng}
                content={value.content}
              />
            ))}

            <MapTypeControl position={'TOPRIGHT'} />
            <ZoomControl position={'RIGHT'} />
          </Map>
        </div>
      ) : (
        <div>위치 정보를 불러오는 중입니다...</div>
      )}
    </>
  )
}

export default SharingRadiusMap
