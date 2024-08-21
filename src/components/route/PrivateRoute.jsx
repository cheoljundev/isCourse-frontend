import {Navigate, Outlet} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setIsShowLoginModal} from "../redux/modules/modal.js";

export default function PrivateRoute() {
  const isSignedIn = useSelector(state => state.authReducer.isSignedIn);
  const dispatch = useDispatch();

  // 로그인 상태에 따라 리디렉션 처리
  useEffect(() => {
    if (!isSignedIn) {
      dispatch(setIsShowLoginModal(true));
    }
  }, []);

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  // 로그인 상태인 경우 자식 컴포넌트를 렌더링
  return <Outlet />;
}