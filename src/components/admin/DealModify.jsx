import PlaceItemSkeleton from "../course/PlaceItemSkeleton.jsx";
import {X} from "react-bootstrap-icons";
import PlaceItem from "../course/PlaceItem.jsx";

export default function DealModify() {
  return (
    <div className="pb-12">
      <section className="px-4">
        <h2 className="mb-2 font-bold text-lg">딜 수정하기</h2>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">딜 정보</h3>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">딜 제목</span>
              </div>
              <input type="text" placeholder="딜 제목 입력" className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">딜 지역</span>
              </div>
              <input type="text" placeholder="딜 지역 입력" className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">딜 상품명</span>
              </div>
              <input type="text" placeholder="딜 상품명 입력" className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">딜 연락처</span>
              </div>
              <input type="tel" placeholder="딜 연락처 입력" className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">딜 이미지</span>
              </div>
              <input type="file" className="file-input w-full max-w-xs mb-2" multiple="true"/>
              <div className="flex flex-wrap gap-2">
                <img className="rounded-lg" src="https://picsum.photos/50" alt=""/>
                <img className="rounded-lg" src="https://picsum.photos/50" alt=""/>
                <img className="rounded-lg" src="https://picsum.photos/50" alt=""/>
                <img className="rounded-lg" src="https://picsum.photos/50" alt=""/>
              </div>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">시간</span>
              </div>
              <input type="text" placeholder="영업 요일 및 시간 입력" className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">휴무</span>
              </div>
              <input type="text" placeholder="휴무 요일 입력" className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">주차 여부</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-2" defaultValue="가능">
                <option value="true">가능</option>
                <option value="false">불가능</option>
              </select>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">가격</span>
              </div>
              <input type="number" placeholder="금액입력" className="input input-bordered w-full max-w-xs"/>
            </label>
          </div>
        </div>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">딜 소개</h3>
            <p className="text-red-500">최소 50자 이상 작성</p>
            <textarea className="textarea textarea-sm textarea-bordered" name="" id="" cols="30" rows="4"
                      minLength="50"></textarea>
          </div>
        </div>
      </section>
      <div className="join w-full fixed bottom-0">
        <button className="btn join-item flex-1">취소</button>
        <button className="btn btn-primary join-item flex-1">수정</button>
      </div>
    </div>
  )
}