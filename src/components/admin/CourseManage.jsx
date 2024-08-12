import {X} from "react-bootstrap-icons";
import PlaceItem from "../course/PlaceItem.jsx";
import CourseItem from "./CourseItem.jsx";

export default function CourseManage() {
  return (
    <div className="pb-12">
      <section className="px-4">
        <h2 className="mb-2 font-bold text-lg">코스 관리하기</h2>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">검색 조건</h3>
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
                <span className="label-text font-semibold">코스 종류</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-2" defaultValue="코스 종류">
                <option disabled>코스 종류</option>
                <option value="ROLE_ADMIN">관리자</option>
                <option value="ROLE_USER">유저</option>
              </select>
            </label>
            <button className="btn btn-primary join-item flex-1">장소 검색하기</button>
          </div>
        </div>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">검색 결과</h3>
            <label className="form-control w-full mb-4">
              <div className="card shadow-xl bg-gray-50 w-full">
                <div className="card-body">
                  {/*<PlaceItemSkeleton />*/}
                  <CourseItem/>
                  <CourseItem/>
                  <CourseItem/>
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
          </div>
        </div>
      </section>
      <div className="join w-full fixed bottom-0">
        <button className="btn join-item flex-1">수정</button>
        <button className="btn btn-error join-item flex-1">삭제</button>
      </div>
    </div>
  )
}