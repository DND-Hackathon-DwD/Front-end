import { useState, useEffect } from 'react'
import TextArea from '../../components/customTextArea'
// import axios from 'axios'
import './index.css'
import {
  LogoSmallIcon,
} from '@/assets/Icons'
import { PrevIcon } from '../../assets/Icons'


export default function Posting() {
  const number = [1, 2, 3, 4, 5, 6, 7, 8]
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [minMember, setMinMember] = useState(0)
  const [maxMember, setMaxMember] = useState(0)
  const [place, setPlace] = useState(null)
  const [date, setDate] = useState()

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
    formData.append('title', title)
    formData.append('text', text)
    formData.append('file', file)
    // 다음 형식으로 보내야하나..?
    // "post": {
    //   "title": "string",
    //   "content": "string",
    //   "user_id": 0,
    //   "latitude": 0,
    //   "longitude": 0,
    //   "address": "string",
    //   "min_num": 0,
    //   "max_num": 0,
    //   "share_time": "2024-05-17T19:31:32.892Z",
    //   "deadline": "2024-05-17T19:31:32.892Z"
    // },
    // "files": [
    //   "string"
    // ]

    try {
      // await axios.post('/api/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // })
      alert('업로드가 완료되었습니다.')
    } catch (error) {
      alert('실패하였습니다. 다시 시도해주세요', error)
    }
  }

  useEffect(() => {
    console.log(files)
    if (files.length > 0) {
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews(newPreviews);

      // 메모리 누수를 방지하기 위해 URL 객체를 정리합니다.
      return () => newPreviews.forEach((preview) => URL.revokeObjectURL(preview));
    }
  }, [files]);

  return (
    <div className="postingContainer">
      <div className="header">
        <button type='button' onClick={() => { console.log('이전 페이지로 이동 넣어줘어') }} className="prevBtn">
          <PrevIcon />
        </button>
        <div className="headerTitle">글쓰기</div>
      </div>
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
            // 지도 선택 화면 보여주기
          }}>
            <TextArea
              placeholder="나눔을 진행할 장소를 선택해주세요."
              disabled={true}
              onChange={(e) => {
                e.stopPropagation()
                setDate(e.currentTarget.value)
              }}
            />
          </button>
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
    </div>
  )
}
