export default function CourseDetail({modal}) {
  return (
    <div className="pb-16">
      <header className="relative mb-4">
        <img className="object-cover w-full h-52 filter brightness-50" src="https://picsum.photos/1000" alt="코스 배경"/>
        <div className="absolute m-auto left-0 top-0 p-4 h-full w-full text-white">
          <small className="text-lg font-light">Station</small>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">Name</h2>
            <button className="btn btn-ghost btn-sm">좋아요 10</button>
          </div>
          <small className="mb-4 block">Nickname</small>
          <div className="flex gap-2 mb-4">
            <span className="badge badge-outline border-solid">#공예</span>
            <span className="badge badge-outline border-solid">#식사</span>
          </div>
          <time className="text-sm">1시간 20분</time>
        </div>
      </header>
      <div className="px-4">
        <div className="w-40">
          <menu role="tablist" className="tabs tabs-boxed">
            <button role="tab" className="btn btn-sm tab tab-active border-none">코스 소개</button>
            <button role="tab" className="btn btn-sm tab border-none">코스</button>
          </menu>
        </div>
        <p className="my-6 text-lg">description</p>
        <div>
          <h3 className="text-xl font-bold mb-6">코스 상세보기</h3>
          <ul className="steps steps-vertical">
            <li className="step">
              <div className="flex gap-x-4 mb-4">
                <img className="rounded-xl self-start flex-shrink-0" src="https://picsum.photos/100"/>
                <div className="flex flex-col justify-center w-64 text-left">
                  <small className="text-sm">station</small>
                  <h4 className="text-lg font-semibold">Name</h4>
                  <p className="">description</p>
                  <time className="text-sm text-gray-500">1시간 20분</time>
                </div>
              </div>
            </li>
            <li className="step">
              <div className="flex gap-x-4 mb-4">
                <img className="rounded-xl self-start flex-shrink-0" src="https://picsum.photos/100"/>
                <div className="flex flex-col justify-center w-64 text-left">
                  <small className="text-sm">station</small>
                  <h4 className="text-lg font-semibold">Name</h4>
                  <p className="">description</p>
                  <time className="text-sm text-gray-500">1시간 20분</time>
                </div>
              </div>
            </li>
            <li className="step">
              <div className="flex gap-x-4 mb-4">
                <img className="rounded-xl self-start flex-shrink-0" src="https://picsum.photos/100"/>
                <div className="flex flex-col justify-center w-64 text-left">
                  <small className="text-sm">station</small>
                  <h4 className="text-lg font-semibold">Name</h4>
                  <p className="">description</p>
                  <time className="text-sm text-gray-500">1시간 20분</time>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <button onClick={() => modal.current.open()} className="btn btn-primary w-full fixed bottom-16 lg:bottom-0 z-10">코스 가보기</button>
    </div>
  )
}