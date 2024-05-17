import { HomeIcon, MarkIcon, PencilIcon, SmileIcon } from '@/assets/Icons'
import { useNavigate } from 'react-router-dom'

const MenuBar = (step) => {
  const navigate = useNavigate()

  return (
    <div className="w-full flex gap-16 px-10 py-4 bg-[#FFF7ED]">
      <i className="flex flex-col shrink-0 items-center" onClick={() => navigate('/')}>
        <HomeIcon className={`w-8 h-8 ${step.step === 1 ? 'fill-primary' : 'fill-[#D6D6D6]'}`} />
        <p>main</p>
      </i>
      <i className="flex flex-col shrink-0 items-center" onClick={() => navigate('/map')}>
        <MarkIcon className={`w-8 h-8 ${step.step === 2 ? 'fill-primary' : 'fill-[#D6D6D6]'}`} />
        <p>map</p>
      </i>
      <i className="flex flex-col shrink-0 items-center" onClick={() => navigate('/posting')}>
        <PencilIcon className={`w-8 h-8 ${step.step === 3 ? 'fill-primary' : 'fill-[#D6D6D6]'}`} />
        <p>post</p>
      </i>
      <i className="flex flex-col shrink-0 items-center" onClick={() => navigate('/mypage')}>
        <SmileIcon className={`w-8 h-8 ${step.step === 4 ? 'fill-primary' : 'fill-[#D6D6D6]'}`} />
        <p>my page</p>
      </i>
    </div>
  )
}

export default MenuBar
