import logoImage from "../../assets/logo.png";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../store/AuthContext.jsx";
import {useModal} from "../../store/ModalContext.jsx";
export default function Header() {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { loginModal } = useModal();

  function handleLoginForm() {
    loginModal.current.open();
  }
  function handleToUserCourse() {
    navigate("/user-course/list");
  }
  function handleToRecommendCourse() {
    navigate("/recommend-course/list");
  }

  return (
    <header className="mb-4">
      <nav className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"/>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><button onClick={handleToUserCourse}>유저코스</button></li>
              <li><button onClick={handleToRecommendCourse}>내주변</button></li>
            </ul>
          </div>
          <Link to={"/"} className="btn btn-ghost text-xl"><img className="w-10" src={logoImage} alt="로고이미지"/> isCourse</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><button onClick={handleToUserCourse}>유저코스</button></li>
            <li><button onClick={handleToRecommendCourse}>내주변</button></li>
          </ul>
        </div>
        <div className="navbar-end">
          {isSignedIn && <Link to="/mypage" className="btn">마이페이지</Link>}
          {!isSignedIn && <a className="btn" onClick={handleLoginForm}>로그인</a>}
        </div>
      </nav>
    </header>
  );
}