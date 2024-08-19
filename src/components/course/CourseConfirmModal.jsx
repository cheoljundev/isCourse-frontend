import {forwardRef, useImperativeHandle, useRef} from 'react';
import {createPortal} from "react-dom";
const CourseConfirmModal = forwardRef(function CourseConfirmModal({error}, ref) {
  const modal = useRef();

  let title = "코스 가보기 완료";
  let message = "마이페이지에서 확인하세요.";

  if (error.status) {
    title = "에러";
    message = error.message;
  }

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
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
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