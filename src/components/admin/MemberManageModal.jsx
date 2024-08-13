import {forwardRef, useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom";

const MemberManageModal = forwardRef(function MemberManageModal({}, ref) {
  const modal = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        modal.current.showModal();
      }
    }
  });

  return createPortal(
    <dialog ref={modal} id="my_modal_5" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">상세보기</h3>
        <p className="font-semibold">닉네임</p>
        <p className="">닉네임</p>
        <p className="font-semibold">성별</p>
        <p className="">성별</p>
        <p className="font-semibold">권한</p>
        <select className="select select-bordered w-full max-w-xs mb-2" defaultValue="권한 선택">
          <option disabled>권한 선택</option>
          <option value="ROLE_USER">유저</option>
          <option value="ROLE_MANAGER">매니저</option>
          <option value="ROLE_ADMIN">관리자</option>
        </select>
        <div className="modal-action">
          <form method="dialog" className="flex gap-x-2">
            <button className="btn">닫기</button>
            <button type="button" className="btn btn-error">회원삭제</button>
          </form>
        </div>
      </div>
    </dialog>
    ,
    document.getElementById("modal")
  );
});

export default MemberManageModal;