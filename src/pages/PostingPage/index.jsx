import { useState, useEffect, useContext } from 'react'
import TextArea from '../../components/customTextArea'
// import axios from 'axios'
import './index.css'
import {
  LogoSmallIcon,
} from '@/assets/Icons'
import { PrevIcon } from '../../assets/Icons'
import { UserContext } from '../../context/userContext'
import MenuBar from '../../components/MenuBar'
import MyPositionSetting from '../SingUpPage/components/MyPositionSetting'
import { POST } from '../../apis/endpoint'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Posting() {
  const number = [1, 2, 3, 4, 5, 6, 7, 8]
  const { user } = useContext(UserContext)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [minMember, setMinMember] = useState(0)
  const [maxMember, setMaxMember] = useState(0)
  const [place, setPlace] = useState(null)
  const [date, setDate] = useState()
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const fileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    if (selectedFiles.length > 5) {
      setFiles([])
      alert('5개 이하만 가능합니다')
      return;
    }
    setFiles(Array.from(e.target.files))
  }

  const submit = async (e) => {
    e.preventDefault()
    if (title.length === 0) {
      alert('제목을 입력해 주세요.')
      return
    }
    if (text.length === 0) {
      alert('내용을 입력해 주세요.')
      return
    }
    if (files.length === 0) {
      alert('파일을 1개 이상 5개 이하로 선택해주세요.')
      return
    }
    if (minMember === 0) {
      alert('나눔 인원을 선택해주세요.')
      return
    }
    if (!place) {
      alert('나눔 장소를 선택해주세요.')
      return
    }
    if (!date) {
      alert('나눔 일정을 적어주세요.')
      return
    }
    const formData = new FormData()
    formData.append('files', files)
    console.log(user.id)
    const post = {
      "user_id": user.id,
      "title": title,
      "content": text,
      "user_id": user.id,
      "latitude": place.x,
      "longitude": place.y,
      "address": place.address,
      "min_num": minMember,
      "max_num": maxMember,
      "share_time": date,
      "deadline": date
    }

    const body = { post: new Blob([post], { type: 'application/json' }), files: formData }

    formData.append('post', new Blob([JSON.stringify(post)], { type: 'application/json' })
    )

    console.log(body)
    try {
      await axios.post(`${POST}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
      alert('업로드가 완료되었습니다.')
      navigate('/')
    } catch (error) {
      console.log(error)
      alert('실패하였습니다. 다시 시도해주세요', error)
    }
  }

  useEffect(() => {
    if (files.length > 0) {
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews(newPreviews);

      // 메모리 누수를 방지하기 위해 URL 객체를 정리합니다.
      return () => newPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    }
  }, [files]);

  return (
    <div className="postingContainer">
      <div className="editorContainer">
        <div className="imageContainer">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontSize: '18px' }}>사진</div>
            <div style={{ fontSize: '13px', color: '#A3A3A3' }}>
              *첫번째로 선택한 이미지가 대표사진이 됩니다.
            </div>
          </div>
          <div className="previewContainer">
            <div className='imageSelectBtn preview'>
              <input
                type="file"
                multiple
                accept='image/*'
                onChange={fileChange}
                style={{ opacity: 0, position: 'absolute' }}
              />
              <div>
                {files.length} / 5
              </div>
            </div>
            {previews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`preview ${index}`}
                className='preview'
              />
            ))}
          </div>
        </div>
        <div className="inputSection">
          <div style={{ fontSize: '18px' }}>제목</div>
          <div className="inputContainer">
            <TextArea
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={(e) => {
                e.stopPropagation()
                setTitle(e.currentTarget.value)
              }}
            />
          </div>
        </div>
        <div className="imageContainer">
          <div style={{ fontSize: '18px' }}>모집인원</div>
          <div className="memberList">
            {number.map((n) => {
              return <button className='member'
                style={{
                  color: (n >= minMember && n <= maxMember) ? 'white' : '#a3a3a3', backgroundColor: (n >= minMember && n <= maxMember) ? '#ff9135' : 'white'
                }}
                onClick={() => {
                  if (minMember === 0) setMinMember(1)
                  if (n === minMember && n === maxMember) {
                    setMaxMember(0)
                    setMinMember(0)
                  }
                  else if (n === minMember) setMinMember(minMember + 1)
                  else if (n === maxMember) setMaxMember(maxMember - 1)
                  else if (n < maxMember) setMinMember(n)
                  else if (n > minMember) setMaxMember(n)
                }}>{n}</button>
            })}
          </div>
        </div>

        <div className="inputSection">
          <div style={{ fontSize: '18px' }}>띱! 나눔장소</div>
          <button type='button' className="inputContainer" onClick={() => {
            setShow(true)
          }}>
            <TextArea
              placeholder="나눔을 진행할 장소를 선택해주세요."
              disabled={true}
              value={place !== null ? place.address : null}
              onChange={(e) => {
                e.stopPropagation()
                setDate(e.currentTarget.value)
              }}
            />
          </button>
          {show && <div style={{ padding: '24px', borderRadius: '16px', overflow: 'hidden' }}>
            <MyPositionSetting onClick={(position, address) => {
              setPlace({ x: position.lat, y: position.lng, address: address })
              setShow(false)
            }} />
          </div>}
        </div>
        <div className="inputSection">
          <div style={{ fontSize: '18px' }}>띱! 나눔일정</div>
          <div className="inputContainer">
            <TextArea
              placeholder="나눔을 진행할 날짜와 시간을 적어주세요."
              value={date}
              onChange={(e) => {
                e.stopPropagation()
                setDate(e.currentTarget.value)
              }}
            />
          </div>
        </div>
        <div className="inputSection">
          <div style={{ fontSize: '18px' }}>자세한 설명</div>
          <div className="inputContainer" style={{ minHeight: '140px' }}>
            <TextArea
              placeholder="추가로 안내할 상세 내용이 있다면 입력해주세요."
              id="editorContents"
              value={text}
              onChange={(e) => {
                e.stopPropagation()
                setText(e.currentTarget.value)
              }}
            />
            <label htmlFor="editorContents" className="editorEmptySection" />
          </div>
        </div>

        <button type="submit" onClick={submit} className="flex text-white justify-center items-center py-3 gap-2 w-full bg-primary rounded-xl">
          <p className="text-[#fff] font-light">지금 당장</p>
          <LogoSmallIcon className="w-10" />
          <p className="text-[#fff] font-light">하기</p>
        </button>
      </div>
      <MenuBar step={3} />
    </div>
  )
}
