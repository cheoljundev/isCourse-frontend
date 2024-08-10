import {BoxArrowInLeft, Crosshair2, GeoAltFill, HouseFill} from "react-bootstrap-icons";

export default function Footer({modal}) {
  return (
    <footer className="lg:hidden">
      <nav className="btm-nav z-10">
        <button className="active text-xl">
          <HouseFill/>
          <span className="text-sm">홈</span>
        </button>
        <button>
          <GeoAltFill/>
          <span className="text-sm">유저코스</span>
        </button>
        <button className="text-xl">
          <Crosshair2/>
          <span className="text-sm">내주변</span>
        </button>
        <button onClick={()=>modal.current.open()} className="text-xl">
          <BoxArrowInLeft/>
          <span className="text-sm">로그인</span>
        </button>
      </nav>
    </footer>
  );
}