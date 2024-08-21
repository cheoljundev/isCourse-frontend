import {Navigate} from "react-router-dom";
import {useEffect} from "react";
import AdminLayout from "../layout/AdminLayout.jsx";
import {useModal} from "../../store/ModalContext.jsx";
import {useDispatch, useSelector} from "react-redux";
import {signout} from "../redux/modules/auth.js";

export default function ManagerRoute() {
  const dispatch = useDispatch();
  const isManager = useSelector(state => state.authReducer.isManager);
  const { setIsShowLoginModal } = useModal(); // 모달 상태 가져오기

  // 로그인 상태에 따라 리디렉션 처리
  useEffect(() => {
    if (!isManager) {
      dispatch(signout());
      setIsShowLoginModal(true); // 모달 열기
    }
  }, []);

  if (!isManager) {
    return <Navigate to="/" replace />;
  }

  // 로그인 상태인 경우 자식 컴포넌트를 렌더링
  return <>
        <AdminLayout/>
    </>;
}