import logoImage from "../../assets/logo.png";
export default function Header({modal}) {
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
              <li><a>유저코스</a></li>
              <li><a>내주변</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl"><img className="w-10" src={logoImage} alt="로고이미지"/> isCourse</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>유저코스</a></li>
            <li><a>내주변</a></li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn" onClick={ () => modal.current.open() }>로그인</a>
        </div>
      </nav>
    </header>
  );
}