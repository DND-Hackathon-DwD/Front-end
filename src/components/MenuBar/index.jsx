import { HomeIcon, MarkIcon, PencilIcon, SmileIcon, LogoIcon } from '@/assets/Icons'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const MenuBar = (step) => {
  const navigate = useNavigate()
  const [isAnimating, setIsAnimating] = useState(false)

  const handleButtonClick = (url) => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
      ;(() => navigate(url))()
    }, 2000)
  }

  return (
    <div
      className="w-full flex px-10 py-4 bg-[#FFF7ED]"
      style={{ justifyContent: 'space-between' }}
    >
      <i className="flex flex-col shrink-0 items-center" onClick={() => handleButtonClick('/')}>
        <HomeIcon className={`w-8 h-8 ${step.step === 1 ? 'fill-primary' : 'fill-[#D6D6D6]'}`} />
        <p>main</p>
      </i>
      <i className="flex flex-col shrink-0 items-center" onClick={() => handleButtonClick('/map')}>
        <MarkIcon className={`w-8 h-8 ${step.step === 2 ? 'fill-primary' : 'fill-[#D6D6D6]'}`} />
        <p>map</p>
      </i>
      <i
        className="flex flex-col shrink-0 items-center"
        onClick={() => handleButtonClick('/posting')}
      >
        <PencilIcon className={`w-8 h-8 ${step.step === 3 ? 'fill-primary' : 'fill-[#D6D6D6]'}`} />
        <p>post</p>
      </i>
      <i
        className="flex flex-col shrink-0 items-center"
        onClick={() => handleButtonClick('/mypage')}
      >
        <SmileIcon className={`w-8 h-8 ${step.step === 4 ? 'fill-primary' : 'fill-[#D6D6D6]'}`} />
        <p>my page</p>
      </i>
      {isAnimating && (
        <div
          className={`${
            isAnimating
              ? 'animate-backgroundFadeIn z-50 fixed inset-0 flex justify-center items-center'
              : 'animate-backgroundFadeOut'
          }`}
        >
          <div className="absolute inset-0 flex justify-center items-center">
            <LogoIcon
              className={`animate-rotate w-48 h-48 fill-[#FFFF] ${
                isAnimating ? '' : 'animate-fadeOut'
              }`}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuBar
