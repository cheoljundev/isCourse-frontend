import {useAuth} from "../../store/AuthContext.jsx";
import {Navigate, Outlet} from "react-router-dom";
import {useEffect} from "react";
import AdminHeader from "../admin/AdminHeader.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";
import {useModal} from "../../store/ModalContext.jsx";

export default function ManagerRoute() {
  const { isManager, signout } = useAuth(); // 로그인 상태 가져오기
  const { setIsShowLoginModal } = useModal(); // 모달 상태 가져오기

  // 로그인 상태에 따라 리디렉션 처리
  useEffect(() => {
    if (!isManager) {
      signout();
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