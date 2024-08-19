import {BoxArrowInLeft, BoxArrowInRight, Crosshair2, GeoAltFill, HouseFill} from "react-bootstrap-icons";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../store/AuthContext.jsx";
import {useModal} from "../../store/ModalContext.jsx";

export default function Footer() {
  const navigate = useNavigate();
  const {isSignedIn, signout} = useAuth();
  const {loginModal} = useModal();
  function handleLoginForm() {
    loginModal.current.open();
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
    signout();
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