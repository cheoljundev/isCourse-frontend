export default function MyPage() {
  return (
    <section className="px-4">
      <h2 className="mb-2 font-bold text-lg">마이페이지</h2>
      <div className="join join-vertical w-full">
        <button className="btn join-item">기본 정보 수정</button>
        <button className="btn join-item">가본 코스 확인</button>
        <button className="btn join-item">공유 코스 확인</button>
        <button className="btn join-item">로그아웃</button>
        <button className="btn join-item">관리자</button>
      </div>
    </section>
  )
}