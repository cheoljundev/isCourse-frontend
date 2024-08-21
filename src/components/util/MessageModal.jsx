import {forwardRef, useEffect, useRef} from 'react';
import {createPortal} from "react-dom";
import {useSelector} from "react-redux";
const MessageModal = forwardRef(function MessageModal() {
  const modal = useRef();
  const message = useSelector(state => state.modalReducer.message);

  useEffect(() => {
    if (message.isShow) {
      modal.current.showModal();
    }
  }, [message]);

  return createPortal(
    <dialog ref={modal} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {
            message.isError ? "오류" : message.title
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