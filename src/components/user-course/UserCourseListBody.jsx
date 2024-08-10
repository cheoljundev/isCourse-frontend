export default function UserCourseListBodySkeleton() {
  return (
    <>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 mb-4">
        <li>
          <a className="flex flex-col">
            <img className="rounded-xl w-full mb-2" src="https://picsum.photos/250" alt="코스 이미지"/>
            <div className="mb-2 font-bold text-lg">코스이름</div>
            <div className="flex gap-2">
              <span className="text-sm">부천역</span>
              <span className="text-sm">1시간 20분</span>
            </div>
          </a>
        </li>
        <li>
          <a className="flex flex-col">
            <img className="rounded-xl w-full mb-2" src="https://picsum.photos/250" alt="코스 이미지"/>
            <div className="mb-2 font-bold text-lg">코스이름</div>
            <div className="flex gap-2">
              <span className="text-sm">부천역</span>
              <span className="text-sm">1시간 20분</span>
            </div>
          </a>
        </li>
        <li>
          <a className="flex flex-col">
            <img className="rounded-xl w-full mb-2" src="https://picsum.photos/250" alt="코스 이미지"/>
            <div className="mb-2 font-bold text-lg">코스이름</div>
            <div className="flex gap-2">
              <span className="text-sm">부천역</span>
              <span className="text-sm">1시간 20분</span>
            </div>
          </a>
        </li>
        <li>
          <a className="flex flex-col">
            <img className="rounded-xl w-full mb-2" src="https://picsum.photos/250" alt="코스 이미지"/>
            <div className="mb-2 font-bold text-lg">코스이름</div>
            <div className="flex gap-2">
              <span className="text-sm">부천역</span>
              <span className="text-sm">1시간 20분</span>
            </div>
          </a>
        </li>
        <li>
          <a className="flex flex-col">
            <img className="rounded-xl w-full mb-2" src="https://picsum.photos/250" alt="코스 이미지"/>
            <div className="mb-2 font-bold text-lg">코스이름</div>
            <div className="flex gap-2">
              <span className="text-sm">부천역</span>
              <span className="text-sm">1시간 20분</span>
            </div>
          </a>
        </li>
        <li>
          <a className="flex flex-col">
            <img className="rounded-xl w-full mb-2" src="https://picsum.photos/250" alt="코스 이미지"/>
            <div className="mb-2 font-bold text-lg">코스이름</div>
            <div className="flex gap-2">
              <span className="text-sm">부천역</span>
              <span className="text-sm">1시간 20분</span>
            </div>
          </a>
        </li>
      </ul>
      <button className="btn btn-sm btn-primary block ml-auto">코스 공유</button>
      <div className="join m-4 mx-auto flex justify-center">
        <button className="join-item btn btn-disabled">«</button>
        <button className="join-item btn">1</button>
        <button className="join-item btn btn-disabled">...</button>
        <button className="join-item btn">100</button>
        <button className="join-item btn">»</button>
      </div>
    </>
  )
}