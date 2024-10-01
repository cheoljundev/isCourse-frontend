import DealSalesItem from "./DealSalesItem.jsx";
import {useRef} from "react";
import DealSalesDetailModal from "./DealSalesDetailModal.jsx";
export default function DealSalesManage() {
  const modal = useRef();

  return (
    <>
      <div className="pb-12">
        <section className="px-4">
          <h2 className="mb-2 font-bold text-lg">딜 판매관리</h2>
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
                  <span className="label-text font-semibold">구매자 닉네임</span>
                </div>
                <input type="text" placeholder="닉네임 입력" className="input input-bordered w-full max-w-xs"/>
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
                    <DealSalesItem modal={modal}/>
                    <DealSalesItem modal={modal}/>
                    <DealSalesItem modal={modal}/>
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
      <DealSalesDetailModal ref={modal}/>
    </>
)
}