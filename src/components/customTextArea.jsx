/* eslint-disable react/prop-types */
import { useRef } from 'react'
import '../index.css'

const TextArea = ({
  placeholder,
  id,
  value,
  onChange,
  style,
  defaultValue,
}) => {
  const textareaRef = useRef(null)

  const changeTitleHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  return (
    <textarea
      ref={textareaRef}
      onChange={(e) => {
        onChange(e)
        changeTitleHeight()
      }}
      rows={1}
      id={id}
      placeholder={placeholder}
      style={{ ...style }}
      value={value}
      defaultValue={defaultValue}
    />
  )
}

export default TextArea
