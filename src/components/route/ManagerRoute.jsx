import {Navigate} from "react-router-dom";
import {useEffect} from "react";
import AdminLayout from "../layout/AdminLayout.jsx";
import {useModal} from "../../store/ModalContext.jsx";
import {useDispatch, useSelector} from "react-redux";
import {signout} from "../redux/modules/auth.js";
import {setIsShowLoginModal} from "../redux/modules/modal.js";

export default function ManagerRoute() {
  const dispatch = useDispatch();
  const isManager = useSelector(state => state.authReducer.isManager);

  // 로그인 상태에 따라 리디렉션 처리
  useEffect(() => {
    if (!isManager) {
      dispatch(signout());
      dispatch(setIsShowLoginModal(true));
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