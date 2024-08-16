import {useAuth} from "../../store/AuthContext.jsx";
import {Navigate, Outlet} from "react-router-dom";
import {useEffect} from "react";

export default function PrivateRoute({setIsShowModal}) {
  const { isSignedIn } = useAuth(); // 로그인 상태 가져오기

  // 로그인 상태에 따라 리디렉션 처리
  useEffect(() => {
    if (!isSignedIn) {
      setIsShowModal(true); // 모달 열기
    }
  }, [isSignedIn, setIsShowModal]);

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  // 로그인 상태인 경우 자식 컴포넌트를 렌더링
  return <Outlet />;
}