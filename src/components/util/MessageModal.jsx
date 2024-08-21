import {forwardRef, useImperativeHandle, useRef} from 'react';
import {createPortal} from "react-dom";
const MessageModal = forwardRef(function MessageModal({message}, ref) {
  const modal = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        modal.current.showModal();
      }
    }
  });

  return createPortal(
    <dialog ref={modal} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {
            message.error ? "오류" : message.title
          }
        </h3>
        <p className="py-4">{message.message}</p>
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

export default MessageModal;