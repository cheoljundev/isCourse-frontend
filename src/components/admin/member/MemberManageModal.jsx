import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {createPortal} from "react-dom";
import ky from "ky";

const MemberManageModal = forwardRef(function MemberManageModal({member, searchMember}, ref) {
  const modal = useRef();
  const initRole = () => {
    if (member.roles.includes('ROLE_ADMIN')) {
      return 'ROLE_ADMIN';
    } else if (member.roles.includes('ROLE_MANAGER')) {
      return 'ROLE_MANAGER';
    }
    return 'ROLE_USER';
  };

  const [role, setRole] = useState(initRole() || '');

  useImperativeHandle(ref, () => {
    return {
      open() {
        setRole(initRole());
        modal.current.showModal();
      }
    }
  });

  function handleChangeRole(e) {
    setRole(e.target.value);
    ky.patch(`http://localhost:8080/api/admin/member/${member.id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"  // Content-Type을 명시적으로 설정
      },
      body: JSON.stringify({
        memberRoleType: e.target.value
      })})
      .json()
      .catch(err => console.error(err));
  }

  function handleDeleteMember() {
    ky.delete(`http://localhost:8080/api/admin/member/${member.id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      }
    })
      .json()
      .then(()=>{
        modal.current.close(); // 삭제 후 모달창 닫기
        searchMember(0); // 삭제 후 멤버 목록 갱신
      })
      .catch(err => console.error(err));

  }

  return createPortal(
    <dialog ref={modal} id="my_modal_5" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">상세보기</h3>
        <p className="font-semibold">닉네임</p>
        <p className="">{member.nickname}</p>
        <p className="font-semibold">성별</p>
        <p className="">{member.genderType == 'MALE' ? '남자' : '여자'}</p>
        <p className="font-semibold">권한</p>
        <select className="select select-bordered w-full max-w-xs mb-2" value={role} onChange={handleChangeRole}>
          <option disabled>권한 선택</option>
          <option value="ROLE_USER">유저</option>
          <option value="ROLE_MANAGER">매니저</option>
          <option value="ROLE_ADMIN">관리자</option>
        </select>
        <div className="modal-action">
          <form method="dialog" className="flex gap-x-2">
            <button className="btn">닫기</button>
            <button type="button" className="btn btn-error" onClick={handleDeleteMember}>회원삭제</button>
          </form>
        </div>
      </div>
    </dialog>
    ,
    document.getElementById("modal")
  );
});

export default MemberManageModal;