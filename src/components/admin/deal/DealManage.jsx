import DealItem from "./DealItem.jsx";
import DealItemSkeleton from "./DealItemSkeleton.jsx";
import {useEffect, useState} from "react";
import ky from "ky";
import useField from "../../../hooks/useField.js";
import {useNavigate} from "react-router-dom";
import Pagination from "../../util/Pagination.jsx";
export default function DealManage() {
  const navigate = useNavigate();
  const initFieldsState = {
    name: '',
    minPrice: '',
    maxPrice: '',
  };
  const {fields, handleFieldChange} = useField(initFieldsState);
  const {name, minPrice, maxPrice} = fields;
  const [loading, setLoading] = useState(true);
  const [deals, setDeals] = useState([]);
  const [page , setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);

  function handleSearchDeals() {
    getDeals();
  }

  function getDeals(page = 0) {
    ky.get(`http://localhost:8080/api/manager/deal?size=6&page=${page}&name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }

      })
      .json()
      .then(data => {
        setPage(page);
        setDeals(data.content);
        setIsFirst(data.first);
        setIsLast(data.last);
        setTotalPages(data.totalPages); // 총 페이지 수
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      })
  }

  function handleShowDetail(id) {
    navigate(`/admin/deal/manage/${id}`);
  }

  useEffect(() => {
    getDeals(page);
  }, [page]);

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
              <input type="text" name="name" value={name} onChange={handleFieldChange} placeholder="딜 제목 입력" className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">가격</span>
              </div>
              <div className="flex gap-x-1 items-center">
                <input type="number" name="minPrice" value={minPrice} onChange={handleFieldChange} placeholder="최소 가격" className="input input-bordered w-full max-w-xs"/>
                <span>~</span>
                <input type="number" name="maxPrice" value={maxPrice} onChange={handleFieldChange} placeholder="최대 가격" className="input input-bordered w-full max-w-xs"/>
              </div>
            </label>
            <button className="btn btn-primary join-item flex-1" onClick={handleSearchDeals}>장소 검색하기</button>
          </div>
        </div>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">검색 결과</h3>
            <div className="form-control w-full mb-4">
              <div className="card shadow-xl bg-gray-50 w-full">
                <div className="card-body">
                  {loading && <DealItemSkeleton/>}
                  {deals.map(deal => <DealItem key={deal.id} deal={deal} onClick={handleShowDetail}/>)}
                </div>
              </div>
              <Pagination page={page} setPage={setPage} totalPages={totalPages} isFirst={isFirst} isLast={isLast}/>
            </div>
          </div>
        </div>
      </section>
    </div>
)
}

