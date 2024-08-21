import {Navigate, Outlet} from "react-router-dom";
import {useEffect} from "react";
import {useModal} from "../../store/ModalContext.jsx";
import {useSelector} from "react-redux";
import {signout} from "../redux/modules/auth.js";

export default function AdminRoute() {
  const isAdmin = useSelector(state => state.authReducer.isAdmin);
  const {setIsShowLoginModal} = useModal(); // 모달 상태 가져오기

  // 로그인 상태에 따라 리디렉션 처리
  useEffect(() => {
    if (!isAdmin) {
      signout();
      setIsShowLoginModal(true); // 모달 열기
    }
  }, []);

  if (!isAdmin) {
    return <Navigate to="/" replace/>;
  }

  // 로그인 상태인 경우 자식 컴포넌트를 렌더링
  return <Outlet/>;
}