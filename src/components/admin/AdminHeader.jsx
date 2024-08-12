import logoImage from "../../assets/logo.png";
import {GearFill} from "react-bootstrap-icons";

export default function AdminHeader() {
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
              <li>
                <details>
                  <summary>코스 관리</summary>
                  <ul className="p-2">
                    <li><a>장소 가져오기</a></li>
                    <li><a>장소 관리하기</a></li>
                    <li><a>코스 등록하기</a></li>
                    <li><a>코스 관리하기</a></li>
                  </ul>
                </details>
              </li>
              <li><a>회원 관리</a></li>
              <li>
                <details>
                  <summary>딜 관리</summary>
                  <ul className="p-2">
                    <li><a>딜 등록하기</a></li>
                    <li><a>딜 관리하기</a></li>
                    <li><a>딜 판매관리</a></li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl"><img className="w-10" src={logoImage} alt="로고이미지"/> isCourse
            Admin <GearFill/></a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className="z-10">
              <details>
                <summary>코스 관리</summary>
                <ul className="p-2">
                  <li><a className="text-nowrap">장소 가져오기</a></li>
                  <li><a className="text-nowrap">장소 관리하기</a></li>
                  <li><a className="text-nowrap">코스 등록하기</a></li>
                  <li><a className="text-nowrap">코스 관리하기</a></li>
                </ul>
              </details>
            </li>
            <li className="z-10"><a>회원관리</a></li>
            <li className="z-10">
              <details>
                <summary>딜관리</summary>
                <ul className="p-2">
                  <li><a className="text-nowrap">딜 등록하기</a></li>
                  <li><a className="text-nowrap">딜 관리하기</a></li>
                  <li><a className="text-nowrap">딜 판매관리</a></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}