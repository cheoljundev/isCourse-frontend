import {forwardRef, useImperativeHandle, useRef} from "react";
import {createPortal} from "react-dom";

const DealSalesDetailModal = forwardRef(function DealSalesDetailModal({}, ref) {
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
        <p className="font-semibold">주문번호</p>
        <p className="">1</p>
        <p className="font-semibold">딜 이름</p>
        <p className="">딜이름</p>
        <p className="font-semibold">구매자명</p>
        <p className="">구매자명</p>
        <p className="font-semibold">구매자 아이디</p>
        <p className="">구매자 아이디</p>
        <p className="font-semibold">구매금액</p>
        <p className="">0,000</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-x-2">
            <button className="btn">닫기</button>
            <button type="button" className="btn btn-error">환불</button>
          </form>
        </div>
      </div>
    </dialog>
    ,
    document.getElementById("modal")
  );
});

export default DealSalesDetailModal;