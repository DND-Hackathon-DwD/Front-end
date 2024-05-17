import { useState } from 'react'
import TextArea from '../../components/customTextArea'

export default function Posting() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  return (
    <div>
      <TextArea
        placeholder="제목"
        value={title}
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
  )
}
