import {forwardRef, useImperativeHandle, useRef} from 'react';
import {createPortal} from "react-dom";
const CourseConfirmModal = forwardRef(function CourseConfirmModal({}, ref) {
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
        <h3 className="font-bold text-lg">코스 가보기 완료</h3>
        <p className="py-4">마이페이지에서 확인 가능합니다.</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">닫기</button>
          </form>
        </div>
      </div>
    </dialog>
    ,
    document.getElementById("modal")
  );
});

export default CourseConfirmModal;