import { useState } from 'react'
import TextArea from '../../components/customTextArea'
// import axios from 'axios'
import './index.css'

export default function Posting() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [file, setFile] = useState(null)

  const fileChange = (e) => {
    setFile(e.target.files[0])
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

    const formData = new FormData()
    formData.append('title', title)
    formData.append('text', text)
    formData.append('file', file)

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

  return (
    <div className="postingContainer">
      <div className="editorContainer">
        <TextArea
          placeholder="제목"
          value={title}
          style={{ fontSize: '18px' }}
          onChange={(e) => {
            e.stopPropagation()
            setTitle(e.currentTarget.value)
          }}
        />
        <TextArea
          placeholder="나만의 글쓰기를 시작해보세요."
          id="editorContents"
          value={text}
          onChange={(e) => {
            e.stopPropagation()
            setText(e.currentTarget.value)
          }}
        />
        <label htmlFor="editorContents" className="editorEmptySection" />
      </div>
      <input type="file" onChange={fileChange} />
      <button type="submit" className="postingSubmitBtn" onClick={submit}>
        submit
      </button>
    </div>
  )
}
