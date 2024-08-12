import PlaceItemSkeleton from "../course/PlaceItemSkeleton.jsx";
import {X} from "react-bootstrap-icons";
import PlaceItem from "../course/PlaceItem.jsx";

export default function CourseModify() {
  return (
    <div className="pb-12">
      <section className="px-4">
        <h2 className="mb-2 font-bold text-lg">코스 수정하기</h2>
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
            <h3 className="card-title">검색 조건</h3>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">장소 타입</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-2" defaultValue="장소 타입 선택">
                <option disabled>장소 타입 선택</option>
                <option value="tag1">장소1</option>
                <option value="tag2">장소2</option>
              </select>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">대분류</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-2" defaultValue="대분류 선택">
                <option disabled>대분류 선택</option>
                <option value="tag1">대분류1</option>
                <option value="tag2">대분류2</option>
              </select>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">중분류</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-2" defaultValue="중분류 선택">
                <option disabled>중분류 선택</option>
                <option value="tag1">중분류1</option>
                <option value="tag2">중분류2</option>
              </select>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">소분류</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-2" defaultValue="소분류 선택">
                <option disabled>소분류 선택</option>
                <option value="tag1">소분류1</option>
                <option value="tag2">소분류2</option>
              </select>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">광역시/도</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-2" defaultValue="광역시/도 선택">
                <option disabled>광역시/도 선택</option>
                <option value="tag1">서울</option>
                <option value="tag2">인천</option>
              </select>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">시/군/구</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-2" defaultValue="시/군/구 선택">
                <option disabled>시/군/구 선택</option>
                <option value="tag1">부천시</option>
                <option value="tag2">소래포구</option>
              </select>
            </label>
            <button className="btn btn-primary join-item flex-1">장소 검색하기</button>
          </div>
        </div>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">코스 구성</h3>
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
      <div className="join w-full fixed bottom-0">
        <button className="btn join-item flex-1">취소</button>
        <button className="btn btn-primary join-item flex-1">수정</button>
      </div>
    </div>
  )
}