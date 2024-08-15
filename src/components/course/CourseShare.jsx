import PlaceItem from "./PlaceItem.jsx";
import PlaceItemSkeleton from "./PlaceItemSkeleton.jsx";
import {X} from "react-bootstrap-icons";
import {Link, useNavigate} from "react-router-dom";

export default function CourseShare() {
  const navigate = useNavigate();
  function handleShareCourse() {
    navigate("/user-course/list");
  }

  return (
    <div className="pb-12">
      <section className="px-4">
        <h2 className="mb-2 font-bold text-lg">코스 공유하기</h2>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">코스 정보</h3>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">코스 제목</span>
              </div>
              <input type="text" placeholder="코스 제목 입력" className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">코스 태그</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-2" defaultValue="태그 선택">
                <option disabled>태그 선택</option>
                <option value="tag1">태그1</option>
                <option value="tag2">태그2</option>
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
                <button className="badge active:scale-95 badge-ghost">
                  <X className="text-lg"/>
                  <span>관심사</span>
                </button>
              </div>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">코스 시간</span>
              </div>
              <div className="flex gap-x-2">
                <input type="number" placeholder="시간" className="input input-bordered w-16 max-w-xs"/>
                <input type="number" placeholder="분" className="input input-bordered w-16 max-w-xs"/>
              </div>
            </label>
          </div>
        </div>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">코스 소개</h3>
            <p className="text-red-500">최소 200자 이상 작성</p>
            <textarea className="textarea textarea-sm textarea-bordered" name="" id="" cols="30" rows="4"
                      maxLength="200"></textarea>
          </div>
        </div>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">코스 구성</h3>
            <p className="text-red-500">방문했던 장소만 목록에 나타납니다.</p>
            <label className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text font-semibold">장소 목록</span>
              </div>
              <div className="card shadow-xl bg-gray-50 w-full">
                <div className="card-body">
                  {/*<PlaceItemSkeleton />*/}
                  <PlaceItem type={"+"}/>
                  <PlaceItem type={"+"}/>
                  <PlaceItem type={"+"}/>
                </div>
              </div>
              <div className="join m-4 mx-auto flex justify-center">
                <button className="join-item btn btn-disabled">«</button>
                <button className="join-item btn">1</button>
                <button className="join-item btn btn-disabled">...</button>
                <button className="join-item btn">100</button>
                <button className="join-item btn">»</button>
              </div>
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-semibold">선택된 장소</span>
              </div>
              <div className="card shadow-xl bg-gray-50 w-full">
              <div className="card-body">
                  <PlaceItem type={"x"}/>
                </div>
              </div>
            </label>
          </div>
        </div>
      </section>
        <div className="join w-full fixed bottom-16 lg:bottom-0">
          <Link to="/user-course/list" className="btn join-item flex-1">취소</Link>
          <button onClick={handleShareCourse} className="btn btn-primary join-item flex-1">등록</button>
        </div>
    </div>
  )
}