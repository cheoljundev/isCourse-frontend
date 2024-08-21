import {X} from "react-bootstrap-icons";
import PlaceItem from "../../course/PlaceItem.jsx";
import CourseItem from "../course/CourseItem.jsx";
import DealItem from "../deal/DealItem.jsx";
import MemberItem from "./MemberItem.jsx";
import MemberManageModal from "./MemberManageModal.jsx";
import {useRef} from "react";

export default function MemberManage() {
  const modal = useRef();
  return (
    <>
      <div className="pb-12">
        <section className="px-4">
          <h2 className="mb-2 font-bold text-lg">회원 관리하기</h2>
          <div className="card bg-base-100 w-full shadow-xl mb-6">
            <div className="card-body">
              <h3 className="card-title">검색 조건</h3>
              <label className="form-control w-full max-w-xs mb-2">
                <div className="label">
                  <span className="label-text font-semibold">닉네임</span>
                </div>
                <input type="text" placeholder="닉네임 입력" className="input input-bordered w-full max-w-xs"/>
              </label>
              <label className="form-control w-full max-w-xs mb-2">
                <div className="label">
                  <span className="label-text font-semibold">성별</span>
                </div>
                <select className="select select-bordered w-full max-w-xs mb-2" defaultValue="코스 종류">
                  <option disabled>성별</option>
                  <option value="MALE">남성</option>
                  <option value="FEMALE">여성</option>
                </select>
              </label>
              <button className="btn btn-primary join-item flex-1">회원 검색하기</button>
            </div>
          </div>
          <div className="card bg-base-100 w-full shadow-xl mb-6">
            <div className="card-body">
              <h3 className="card-title">검색 결과</h3>
              <label className="form-control w-full mb-4">
                <div className="card shadow-xl bg-gray-50 w-full">
                  <div className="card-body">
                    {/*<PlaceItemSkeleton />*/}
                    <MemberItem modal={modal}/>
                    <MemberItem modal={modal}/>
                    <MemberItem modal={modal}/>
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
      </div>
      <MemberManageModal ref={modal}/>
    </>
  )
}