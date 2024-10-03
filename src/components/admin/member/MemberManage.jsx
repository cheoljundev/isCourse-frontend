import MemberItem from "./MemberItem.jsx";
import MemberManageModal from "./MemberManageModal.jsx";
import {useEffect, useRef, useState} from "react";
import useField from "../../../hooks/useField.js";
import PlaceItemSkeleton from "../../course/PlaceItemSkeleton.jsx";
import ky from "ky";
import {setMessage} from "../../redux/modules/modal.js";
import {useDispatch} from "react-redux";
import Pagination from "../../util/Pagination.jsx";

export default function MemberManage() {
  const dispatch = useDispatch();
  const initFieldsState = {
    nickname : '',
    genderType : '',
    role : '',
  }

  const {fields, handleFieldChange} = useField(initFieldsState);

  const {
    nickname,
    genderType,
  } = fields;

  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [page , setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [selectedMember, setSelectedMember] = useState({
    id: '',
    nickname: '',
    roles: '',
  });

  useEffect(() => {
    if (page !== null){
      searchMember(page);
    }
  }, [page]);

  function searchMember(page) {
    setLoading(true);
    let url = `http://localhost:8080/api/admin/member?page=${page}&size=6`;
    if (nickname) {
      url += `&nickname=${nickname}`;
    }
    if (genderType) {
      url += `&genderType=${genderType}`;
    }

    ky.get(url,
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      .json()
      .then(data => {
        setMembers(data.content);
        setPage(data.number);
        setTotalPages(data.totalPages);
        setIsFirst(data.first);
        setIsLast(data.last);
      })
      .catch(() => {
        dispatch(setMessage({
          message: "멤버 검색에 실패했습니다.",
          isError: true,
          isShow: true,
        }));
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleEditMember(memberId) {
    setSelectedMember({
      id: '',
      nickname: '',
      roles: [],
    }); // 우선 빈 값으로 초기화해서 변화를 강제
    setTimeout(() => {
      setSelectedMember(members.find(member => member.id === memberId));
    }, 0);
    // setSelectMember 이후에 modal.current.open()을 호출해야 함
  }

  useEffect(() => {
    if (selectedMember.id){
      modal.current.open();
    }
  }, [selectedMember]);

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
                <input type="text" placeholder="닉네임 입력" name="nickname" value={nickname} onChange={handleFieldChange} className="input input-bordered w-full max-w-xs"/>
              </label>
              <label className="form-control w-full max-w-xs mb-2">
                <div className="label">
                  <span className="label-text font-semibold">성별</span>
                </div>
                <select className="select select-bordered w-full max-w-xs mb-2" defaultValue="코스 종류" name="genderType" value={genderType} onChange={handleFieldChange}>
                  <option disabled>성별</option>
                  <option value="MALE">남성</option>
                  <option value="FEMALE">여성</option>
                </select>
              </label>
              <button className="btn btn-primary join-item flex-1" onClick={()=>searchMember(0)}>회원 검색하기</button>
            </div>
          </div>
          <div className="card bg-base-100 w-full shadow-xl mb-6">
            <div className="card-body">
              <h3 className="card-title">검색 결과</h3>
              <div className="form-control w-full mb-4">
                <div className="card shadow-xl bg-gray-50 w-full">
                  <div className="card-body">
                    {loading && <PlaceItemSkeleton/>}
                    {!loading && members.map(member => (
                      <MemberItem key={member.id} member={member} modal={modal} onclick={handleEditMember}/>
                    ))}
                  </div>
                </div>
                <Pagination page={page} totalPages={totalPages} isFirst={isFirst} isLast={isLast} setPage={setPage}/>
              </div>
            </div>
          </div>
        </section>
      </div>
      <MemberManageModal ref={modal} member={selectedMember} searchMember={searchMember}/>
    </>
  )
}