import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiClient from '@/apis/apiClient'
import { LogoSmallIcon, CalendarIcon, UsersIcon, MarkIcon } from '@/assets/Icons'

const getPostList = async (id) => {
  const response = await apiClient.get(`/post/${id}`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsImlkIjo0LCJzdWIiOiJzdHJpbmdAbmF2ZXIuY29tIiwiZXhwIjoxNzE2MDY0MDI0fQ.0d630JtWlVMhTwwHrMaBwYyzG2Pd8MTzHMpYSB3oO8c`,
    },
  })

  return response.data.data
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}.${month}.${day} (${dayOfWeek}) ${hours}:${minutes}`
}

export default function ContentsPage() {
  const { id } = useParams()
  const [detail, setDetail] = useState({})
  const [center, setCenter] = useState(null)

  useEffect(() => {
    getPostList(id).then((data) => {
      setDetail(data.post)
      setCenter({ lat: data.post.latitude, lng: data.post.longitude })
    })
  }, [id])

  return (
    <div className="flex flex-col h-full w-full">
      {detail && (
        <>
          <i className="flex w-full h-[35%]">
            <img src={detail.thumbnail_image} alt="image" className="object-cover w-full" />
          </i>
          <div className="w-full">
            <div className="flex justify-between w-full py-2 bg-[#FFF7ED] px-4">
              <div className="flex gap-1">
                <img src={detail.profile_image} alt="profile" className="rounded-lg w-6 h-6" />
                <p>{detail.nickname}</p>
              </div>
              <div className="flex items-center">
                <p className="text-primary text-lg font-semibold">{detail.share_point}</p>
                <LogoSmallIcon className="w-10 fill-primary" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-start px-6 py-6 gap-4 overflow-y-scroll">
              <div className="text-xl mb-2">{detail.title}</div>
              <div className="flex justify-between items-center w-full">
                <div className="flex w-full items-center gap-1.5">
                  <p className="px-4 py-1 rounded-xl bg-[#FED7AA] text-[#C9510C] text-sm">
                    마감임박
                  </p>
                  <CalendarIcon className="w-5 h-5" />
                  <p>{formatDate(detail.share_time)}</p>
                </div>
                <div className="flex items-center">
                  <UsersIcon className="w-6 h-6" />
                  <p className="text-gray-400 text-sm">{`${detail.current_recruited_num}/${detail.max_recruited_num}`}</p>
                </div>
              </div>
              <div className="px-4 py-4 bg-[#FFEDD5] min-h-[6rem] rounded-xl text-sm w-full">
                {detail.content}
              </div>
              <div className="flex items-center gap-2 w-full">
                <MarkIcon className="w-5 h-5" />
                <p className="text-gray-400">나와의 거리</p>
                <p className="text-[#FF9135]">•</p>
                <p className="text-[#FF9135]">상세 도로명 주소</p>
              </div>
            </div>
            <div className="w-full px-6">
              {center && (
                <Map id="map" className="w-full h-[200px] rounded-xl" center={center} level={3}>
                  <MapMarker position={center} />
                </Map>
              )}
            </div>
            <div className="w-full px-6">
              <button
                type="submit"
                className={`w-full flex justify-center bg-primary items-center gap-1 font-bold py-4 rounded-lg mt-4`}
              >
                <p className={`text-[#fff]`}>지금 바로</p>
                <LogoSmallIcon className={`w-10 fill-[#fff]`} />
                <p className={`text-[#fff]`}>하기</p>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
