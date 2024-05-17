import React from 'react'
import { Map, useMap, MapMarker } from 'react-kakao-maps-sdk'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import instance from '../../../../apis/apiClient'

const SharingRadiusMap = () => {
  const navigate = useNavigate()
  const { kakao } = window
  const [initPosition, setInitPosition] = useState(null)
  const [position, setPosition] = useState(null)
  const [address, setAddress] = useState('')
  const [sharingList, setSharingList] = useState([])

  useEffect(() => {
    const getCurrentPosition = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    }

    const fetchData = async ({ lat, lng }) => {
      try {
        const response = await instance.get('/post/map', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsImlkIjo0LCJzdWIiOiJzdHJpbmdAbmF2ZXIuY29tIiwiZXhwIjoxNzE2MDY0MDI0fQ.0d630JtWlVMhTwwHrMaBwYyzG2Pd8MTzHMpYSB3oO8c`,
          },

          params: {
            latitude: lat,
            longitude: lng,
            radius: 1.5,
          },
        })

        console.log('Server response:', response.data)
        return response.data.data
      } catch (error) {
        console.error('Error fetching data from server:', error)
      }
    }

    getCurrentPosition().then((position) => {
      const lat = position.coords.latitude
      const lng = position.coords.longitude
      setInitPosition({ latitude: lat, longitude: lng })
      setPosition({ latitude: lat, longitude: lng })
      fetchData({ lat, lng }).then((response) => {
        console.log(response)
        setSharingList(response.post_list)
      })
    })
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
          <Map id="map" className="w-full h-[600px] border-2 " center={initPosition} level={4}>
            {/* sharingList size = 0이라면 infowindow 표시? */}
            {sharingList.map(
              (value, index) => (
                // 만약 마감된 리스트라면 표시 안함!
                <EventMarkerContainer
                  key={`EventMarkerContainer-${value.post_id}`}
                  position={{ lat: value.latitude, lng: value.longitude }}
                  //  content={value.content}
                />
              ),
              //console.log(value),
            )}
          </Map>
        </div>
      ) : (
        <div>위치 정보를 불러오는 중입니다...</div>
      )}
    </>
  )
}

export default SharingRadiusMap
