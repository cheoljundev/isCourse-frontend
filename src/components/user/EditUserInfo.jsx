import {X} from "react-bootstrap-icons";

export default function EditUserInfo({info}) {
  return (
    <section className="px-4">
      <h2 className="text-xl font-semibold mb-4">기본정보수정</h2>
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
      <div className="mb-6">
        <div className="label">
          <span className="label-text font-semibold">관심사</span>
        </div>
        <select className="select select-bordered select-md w-full mb-4" name="interest">
          <option value="0000">관심사</option>
        </select>
        <div className="flex flex-wrap gap-2">
          <button className="badge active:scale-95 badge-ghost">
            <X className="text-lg"/>
            <span>관심사</span>
          </button>
          <button className="badge active:scale-95 badge-ghost">
            <X className="text-lg"/>
            <span>관심사</span>
          </button>
          <button className="badge active:scale-95 badge-ghost">
            <X className="text-lg"/>
            <span>관심사</span>
          </button>
        </div>
      </div>
      <button className="btn btn-wide btn-primary mx-auto block mb-2">수정완료</button>
      <button className="btn btn-error btn-wide btn-primary mx-auto block mb-4">탈퇴하기</button>
    </section>
  )
}