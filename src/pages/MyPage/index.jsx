import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { MyPositionSetting } from './components'
import { UserContext } from '../../context/userContext'
import { LogoIcon } from '../../assets/Icons'
import { MenuBar } from '@/components'
import review_white from '../../assets/imgs/review_white.png'
import review_orange from '../../assets/imgs/review_orange.png'
import review_mid from '../../assets/imgs/review_mid.png'

function MyPage() {
  const { user } = useContext(UserContext)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)

  console.log(user)

  const handleLogout = async () => {
    try {
      user.logout()
    } catch (error) {
      console.error(error)
    }
  }

  const handleLocalAuth = async () => {
    try {
      // 동네 인증 이동
      setStep(2)
    } catch (error) {
      setError('동네 인증 가져오는데 실패하였습니다.')
      console.error('동네 인증 가져오기 오류:', error)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-full w-full bg-white shadow-xl rounded-lg py-3">
      {step === 1 ? (
        <div>
          <div className="flex justify-center">
            <div className="z-0 absolute inline-flex h-[1040px] w-[1040px] rounded-full bg-primary opacity-10 translate-y-20"></div>
            <div className="z-10 absolute inline-flex h-[634px] w-[634px] rounded-full bg-primary opacity-30 translate-y-[15rem]"></div>
            <div className="z-20 absolute inline-flex h-[454px] w-[454px] rounded-full bg-primary opacity-30 translate-y-[24rem]"></div>
            <div className="z-30 absolute inline-flex h-[272px] w-[272px] rounded-full bg-primary opacity-30 translate-y-[30rem]"></div>
          </div>
          <div className="releative photo-wrapper p-2 top-2 z-50">
            <img
              className="w-[160px] h-[160px] rounded-xl mx-auto"
              src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"
              alt="profile"
            />
            <h3 className=" text-center text-2xl text-gray-900 mt-3 font-[HS-Regular] text-primary font-medium leading-8">
              {user.nickname}
            </h3>
            <div className="text-center text-[#000000] text-opacity-20 text-[11px] font-semibold">
              <p>{user.email}</p>
            </div>
          </div>
          <div className="p-2 ">
            <div className="flex flex-row items-center justify-center text-lg p-6 pl-2 pr-2 border border-primary text-primary text-center rounded-2xl z-[100] bg-[#ffffff] bg-opacity-50 my-3 mb-[27rem]  w-[382px] h-[31px]">
              <p className="text-sm">실천하신 나눔이 </p>{' '}
              <p className="flex flex-row items-center text-3xl p-2">
                <p className="font-[HS-Regular]">{user.sharePoint ? user.sharePoint : '0'}</p>
                <i className="flex justify-center items-center pl-3">
                  <LogoIcon className="h-24" />
                </i>
              </p>
              <p className="text-sm"> 모였어요💛</p>
            </div>

            <div className="">
              <i className="flex justify-center items-center pl-3">
                <LogoIcon className="absolute w-[192px] h-[98px] z-[100] -translate-y-[8rem] fill-[#ffffff]" />
              </i>

              <img className="absolute -translate-y-[26rem] z-[50]" src={review_white} alt="" />
              <img className="absolute -translate-y-[6rem] z-[50]" src={review_orange} alt="" />
              <img
                className="absolute translate-x-[14rem] -translate-y-[22rem] z-[50]"
                src={review_mid}
                alt=""
              />
            </div>
          </div>
          <MenuBar className="z-[100] mt-10" step={4} />
        </div>
      ) : (
        <MyPositionSetting setStep={setStep} />
      )}
    </div>
  )
}

export default MyPage
