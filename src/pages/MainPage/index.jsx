import { useRef, useEffect, useState, useCallback } from 'react'
import { LogoIcon, LogoSmallIcon, DropDownIcon, MarkIcon, UsersIcon } from '@/assets/Icons'
import { MenuBar } from '@/components'
import apiClient from '@/apis/apiClient'

const getUserInfo = async () => {
  const response = await apiClient.get(`/user`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsImlkIjo0LCJzdWIiOiJzdHJpbmdAbmF2ZXIuY29tIiwiZXhwIjoxNzE2MDY0MDI0fQ.0d630JtWlVMhTwwHrMaBwYyzG2Pd8MTzHMpYSB3oO8c`,
    },
  })

  return response.data.data
}

const getPostList = async (startPage) => {
  const response = await apiClient.get(`/post?page=${startPage}&size=5`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiVVNFUiIsImlkIjo0LCJzdWIiOiJzdHJpbmdAbmF2ZXIuY29tIiwiZXhwIjoxNzE2MDY0MDI0fQ.0d630JtWlVMhTwwHrMaBwYyzG2Pd8MTzHMpYSB3oO8c`,
    },
  })

  return response.data.data
}

const mockData = [
  {
    user_id: 'test',
    thumbnail: 'https://cdn.pixabay.com/photo/2023/12/23/17/06/ai-generated-8465994_1280.jpg',
    title: '피자드실 분~ 띱!',
    content: '다 식은 한 조각 남은 콤피네이션 피자드실 분 계신가요? 빨리 띱해주세요!',
    address: '서울특별시 강남구 역삼동 123-456',
    max_recruited_num: 2,
    create_date: '2024-05-18T00:17:58.881317',
    current_recruited_num: 1,
    distance: 311.25884976273,
    recruited: true,
    post_id: 1,
  },
  {
    user_id: 'test',
    thumbnail: 'https://cdn.hankyung.com/photo/202403/01.36167829.1.jpg',
    title: '짜장면드실 분~ 띱!',
    content: '탕수육도 ㄱ?',
    address: '서울특별시 강남구 역삼동 123-456',
    max_recruited_num: 6,
    create_date: '2024-05-18T00:17:58.881317',
    current_recruited_num: 2,
    distance: 311.25884976273,
    recruited: true,
    post_id: 2,
  },
  {
    user_id: 'test',
    thumbnail:
      'https://cdn.011st.com/11dims/resize/600x600/quality/75/11src/product/5580516695/B.jpg?695000000',
    title: '족발드실 분~ 띱!',
    content: '족발 드실 분 계신가요? 빨리 띱해주세요!',
    address: '서울특별시 강남구 역삼동 123-456',
    max_recruited_num: 3,
    create_date: '2024-05-18T00:17:58.881317',
    current_recruited_num: 1,
    distance: 311.25884976273,
    recruited: true,
    post_id: 3,
  },
  {
    user_id: 'test',
    thumbnail: 'https://cdn.hankyung.com/photo/202405/02.35672098.1.jpg',
    title: '치킨드실 분~ 띱!',
    content: '교촌 치킨 드실 분 계신가요? 빨리 띱해주세요!',
    address: '서울특별시 강남구 역삼동 123-456',
    max_recruited_num: 12,
    create_date: '2024-05-18T00:17:58.881317',
    current_recruited_num: 10,
    distance: 311.25884976273,
    recruited: true,
    post_id: 4,
  },
  {
    user_id: 'test',
    thumbnail: 'https://cdn.pixabay.com/photo/2023/04/08/06/45/popcorn-7908760_1280.jpg',
    title: '팝콘드실 분~ 띱!',
    content: '영화 보면서 팝콘 드실 분 계신가요? 빨리 띱해주세요!',
    address: '서울특별시 강남구 역삼동 123-456',
    max_recruited_num: 23,
    create_date: '2024-05-18T00:17:58.881317',
    current_recruited_num: 10,
    distance: 311.25884976273,
    recruited: true,
    post_id: 5,
  },
]

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

const MainPage = () => {
  const endRef = useRef(null)
  // const [data, setData] = useState(mockData)
  const [user, setUser] = useState(null)
  const [postList, setPostList] = useState([])
  const [startPage, setStartPage] = useState(1)

  const fetchData = async () => {
    // setData((prevData) => prevData.concat(mockData))
    console.log('?')
    await getPostList(startPage).then((data) => {
      setPostList((prev) => [...prev, ...data.post_list])
      setStartPage((prevPage) => prevPage + 1)
    })
  }

  const handleInfiniteScroll = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        fetchData()
        setStartPage((prevPage) => prevPage + 1)
      }
    })
  }, [])

  useEffect(() => {
    getUserInfo().then(async (data) => {
      setUser(data)
      // getPostList(startPage).then((data) => {
      //   setPostList(data.post_list)
      //   setStartPage(startPage + 1)
      //   console.log(data.post_list)
      // })
      if (postList.length === 0) {
        await fetchData()
      }
    })
  }, [])

  console.log(postList)

  useEffect(() => {
    if (endRef.current) {
      const observer = new IntersectionObserver(handleInfiniteScroll, {
        threshold: 0.3,
      })
      observer.observe(endRef.current)

      return () => observer.disconnect()
    }
  }, [handleInfiniteScroll])

  return (
    <div className="w-full h-full flex flex-col items-center justify-start relative">
      {user ? (
        <>
          <div className="flex justify-between w-full items-end bg-[#FFEDD5]/[.8] pb-4 pt-8 px-6">
            <LogoIcon className="w-[4.375rem]" />
            <div className="flex items-center gap-1">
              <p className="text-sm">{user.address}</p>
              <DropDownIcon className="w-4 h-4 cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col relative h-full w-full items-center gap-6 py-8 overflow-y-scroll px-6">
            {postList &&
              postList.map((item, index) => (
                <div
                  key={index}
                  className="w-full shrink-0 flex flex-col items-center bg-[#FFF7ED] rounded-xl shadow-md overflow-hidden"
                >
                  <img
                    src={item.thumbnail_image}
                    alt="thumbnail"
                    className="w-full aspect-video object-cover"
                  />
                  <div className="flex flex-col w-full h-full justify-center px-5 py-4 gap-1">
                    <p className="text-2xl">{item.title}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1 items-center text-primary font-light">
                        <MarkIcon className="w-4 h-4" />
                        <p>{Math.floor(item.distance)} m</p>
                        <p>•</p>
                        <p>{formatDate(item.create_date)}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <UsersIcon className="w-6 h-6" />
                        <p className="text-gray-400 text-sm font-light">{`${item.current_recruited_num}/${item.max_recruited_num}`}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 py-6 truncate">{item.content}</p>
                    {!item.recruited ? (
                      <button className="flex text-white justify-center items-center py-3 gap-2 w-full bg-primary rounded-xl">
                        <p className="text-[#fff] font-light">지금 당장</p>
                        <LogoSmallIcon className="w-10" />
                        <p className="text-[#fff] font-light">하기</p>
                      </button>
                    ) : (
                      <button className="flex border border-primary justify-center items-center py-3 gap-2 w-full bg-[#FFF] rounded-xl">
                        <p className="text-gray-400 font-light">아쉽지만</p>
                        <LogoSmallIcon className="w-10 fill-primary" />
                        <p className="text-gray-400 font-light">취소하기</p>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            <div ref={endRef} className="w-full h-4">
              dasf
            </div>
            {/* <div className="fixed bottom-[7rem] w-full px-6">
              <div className="w-full flex rounded-xl border-2 border-primary overflow-hidden">
                <div className="flex flex-col gap-1.5 px-4 py-2.5 bg-[#FFF] items-center w-full">
                  <div className="flex gap-1.5 items-center">
                    <img src={user.profileImage} alt="image" className="w-8 h-8 rounded-md" />
                    <p className="text-2xl text-primary font-semibold">{`반가워요, ${user.nickname}님!`}</p>
                  </div>
                  <p className="text-sm text-gray-400">즐거운 나눔의 기쁨을 경험해보세요😁</p>
                </div>
                <button className="flex flex-col justify-center items-center px-4 bg-primary">
                  <LogoIcon className="w-25 fill-[#FFF]" />
                  <p className="text-[#fff] text-xs whitespace-nowrap">게시글 쓰러가기</p>
                </button>
              </div>
            </div> */}
          </div>
          <MenuBar step={1} />
          {/* <div className="w-full flex gap-16 px-10 py-4 bg-[#FFF7ED]">
            <i className="flex flex-col shrink-0 items-center">
              <HomeIcon className="w-8 h-8 fill-primary" />
              <p>main</p>
            </i>
            <i className="flex flex-col shrink-0 items-center">
              <MarkIcon className="w-8 h-8 fill-[#D6D6D6]" />
              <p>map</p>
            </i>
            <i className="flex flex-col shrink-0 items-center">
              <PencilIcon className="w-8 h-8" />
              <p>post</p>
            </i>
            <i className="flex flex-col shrink-0 items-center">
              <SmileIcon className="w-8 h-8" />
              <p>my page</p>
            </i>
          </div> */}
        </>
      ) : (
        <div>loading...</div>
      )}
    </div>
  )
}

export default MainPage

// const { kakao } = window
// const [address, setAddress] = useState('')

// useEffect(() => {
//   const getCurrentPosition = () => {
//     return new Promise((resolve, reject) => {
//       navigator.geolocation.getCurrentPosition(resolve, reject)
//     })
//   }

//   getCurrentPosition().then((position) => {
//     const lat = position.coords.latitude
//     const lng = position.coords.longitude
//     const geocoder = new kakao.maps.services.Geocoder()

//     geocoder.coord2Address(lng, lat, (result, status) => {
//       if (status === kakao.maps.services.Status.OK) {
//         setAddress(result[0].address.address_name)
//       }
//     })
//   })
// }, [kakao])
