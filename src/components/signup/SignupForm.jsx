export default function SignupForm() {
  return (
    <section className="px-4">
      <h2 className="text-xl font-semibold mb-4">회원가입</h2>
      <div className="mb-2">
        <div className="label">
          <span className="label-text font-semibold">아이디</span>
        </div>
        <div className="flex">
          <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs"/>
          <button className="btn btn-md ml-2">중복확인</button>
        </div>
      </div>
      <div className="mb-2">
        <div className="label">
          <span className="label-text font-semibold">비밀번호</span>
        </div>
        <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs"/>
      </div>
      <div className="mb-2">
        <div className="label">
          <span className="label-text font-semibold">비밀번호 재확인</span>
        </div>
        <input type="password" placeholder="Confirm Password" className="input input-bordered w-full max-w-xs"/>
      </div>
      <div className="mb-2">
        <div className="label">
          <span className="label-text font-semibold">닉네임</span>
        </div>
        <input type="text" placeholder="Nickname" className="input input-bordered w-full max-w-xs"/>
      </div>
      <div className="mb-2">
        <div className="label">
          <span className="label-text font-semibold">성별</span>
        </div>
        <div>
          <div className="flex">
            <label className="label cursor-pointer gap-x-2">
              <span className="label-text">남자</span>
              <input type="radio" name="gender" className="radio radio-primary"/>
            </label>
            <label className="label cursor-pointer gap-x-2">
              <span className="label-text">여자</span>
              <input type="radio" name="gender" className="radio radio-error"/>
            </label>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div className="label">
          <span className="label-text font-semibold">관심사</span>
        </div>
        <select className="select select-bordered select-md w-full mb-4" name="interest">
          <option value="0000">관심사</option>
        </select>
        <div className="flex flex-wrap gap-2">
          <div className="badge badge-outline border-solid">관심사</div>
          <div className="badge badge-outline border-solid">관심사</div>
          <div className="badge badge-outline border-solid">관심사</div>
          <div className="badge badge-outline border-solid">관심사</div>
          <div className="badge badge-outline border-solid">관심사</div>
          <div className="badge badge-outline border-solid">관심사</div>
          <div className="badge badge-outline border-solid">관심사</div>
          <div className="badge badge-outline border-solid">관심사</div>
          <div className="badge badge-outline border-solid">관심사</div>
          <div className="badge badge-outline border-solid">관심사</div>
        </div>
      </div>
      <button className="btn btn-wide btn-primary mx-auto block mb-4">회원가입</button>
    </section>
  )
}