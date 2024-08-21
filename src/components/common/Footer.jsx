import {BoxArrowInLeft, BoxArrowInRight, Crosshair2, GeoAltFill, HouseFill} from "react-bootstrap-icons";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signout} from "../redux/modules/auth.js";
import {setIsShowLoginModal} from "../redux/modules/modal.js";

export default function Footer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSignedIn = useSelector(state => state.authReducer.isSignedIn);
  function handleLoginForm() {
    dispatch(setIsShowLoginModal(true));
  }
  function handleToHome() {
    navigate("/");
  }
  function handleToUserCourse() {
    navigate("/user-course/list");
  }
  function handleToRecommendCourse() {
    navigate("/recommend-course/list");
  }
  function handleLogout() {
    dispatch(signout());
    navigate("/");
  }

  return (
    <footer className="lg:hidden">
      <nav className="btm-nav z-10">
        <button className="text-xl" onClick={handleToHome}>
          <HouseFill/>
          <span className="text-sm">홈</span>
        </button>
        <button className="text-xl" onClick={handleToUserCourse}>
          <GeoAltFill/>
          <span className="text-sm">유저코스</span>
        </button>
        <button className="text-xl" onClick={handleToRecommendCourse}>
          <Crosshair2/>
          <span className="text-sm">내주변</span>
        </button>
        {
          !isSignedIn && (
          <button onClick={handleLoginForm} className="text-xl">
            <BoxArrowInLeft/>
            <span className="text-sm">로그인</span>
          </button>
        )
        }
        {
          isSignedIn && (
            <button onClick={handleLogout} className="text-xl">
              <BoxArrowInRight/>
              <span className="text-sm">로그아웃</span>
            </button>
          )
        }
      </nav>
    </footer>
  );
}