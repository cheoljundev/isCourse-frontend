import {Navigate, Outlet} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {signout} from "../redux/modules/auth.js";
import {setIsShowLoginModal} from "../redux/modules/modal.js";

export default function AdminRoute() {
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.authReducer.isAdmin);


  // 로그인 상태에 따라 리디렉션 처리
  useEffect(() => {
    if (!isAdmin) {
      signout();
      dispatch(setIsShowLoginModal(true));
    }
  }, []);

  if (!isAdmin) {
    return <Navigate to="/" replace/>;
  }

  // 로그인 상태인 경우 자식 컴포넌트를 렌더링
  return <Outlet/>;
}