const SignUpPage = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <form className="w-4/5 h-full flex flex-col justify-center items-center gap-6">
        <div className="py-4 px-2 flex flex-col w-full gap-1">
          <h1 className="text-2xl font-bold">회원가입</h1>
          <p className="text-lg font-semibold">
            회원이 되어 다양한 해택을 누려보세요!
          </p>
        </div>
        <div className="flex flex-col w-full">
          <label className="flex gap-3 items-end text-red-500 pl-2">
            <p className="text-lg font-bold text-gray-600">아이디</p>
            <p>ㅇㅇ</p>
          </label>
          <div className="w-full border border-black rounded-md">
            <input
              type="text"
              placeholder="아이디 입력 (6~20자)"
              className="w-full rounded-md px-3 py-2 placeholder:text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label className="flex gap-3 items-end text-red-500 pl-2">
            <p className="text-lg font-bold text-gray-600">비밀번호</p>
            <p>아</p>
          </label>
          <div className="w-full border border-black rounded-md">
            <input
              type="text"
              placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
              className="w-full rounded-md px-3 py-2 placeholder:text-sm"
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label className="flex gap-3 items-end text-red-500 pl-2">
            <p className="text-lg font-bold text-gray-600">닉네임</p>
            <p>ㅇㅇ</p>
          </label>
          <div className="w-full border border-black rounded-md">
            <input
              type="text"
              placeholder="닉네임을 입력해주세요"
              className="w-full rounded-md px-3 py-2 placeholder:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUpPage
