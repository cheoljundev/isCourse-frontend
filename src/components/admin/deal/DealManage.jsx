import {X} from "react-bootstrap-icons";
import PlaceItem from "../../course/PlaceItem.jsx";
import CourseItem from "../course/CourseItem.jsx";
import DealItem from "./DealItem.jsx";

export default function DealManage() {
  return (
    <div className="pb-12">
      <section className="px-4">
        <h2 className="mb-2 font-bold text-lg">딜 관리하기</h2>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">검색 조건</h3>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">딜 제목</span>
              </div>
              <input type="text" placeholder="딜 제목 입력" className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">가격</span>
              </div>
              <div className="flex gap-x-1 items-center">
                <input type="number" placeholder="최소 가격" className="input input-bordered w-full max-w-xs"/>
                <span>~</span>
                <input type="number" placeholder="최대 가격" className="input input-bordered w-full max-w-xs"/>
              </div>
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
                  <DealItem/>
                  <DealItem/>
                  <DealItem/>
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