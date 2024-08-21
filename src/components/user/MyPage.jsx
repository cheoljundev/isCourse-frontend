import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signout} from "../redux/modules/auth.js";

export default function MyPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isManager = useSelector(state => state.authReducer.isManager);
  function handleLogout() {
    dispatch(signout());
    navigate("/");
  }
  return (
    <section className="px-4">
      <h2 className="mb-2 font-bold text-lg">마이페이지</h2>
      <div className="join join-vertical w-full">
        <Link to="/mypage/edit-info" className="btn join-item">기본 정보 수정</Link>
        <Link to="/mypage/saved-course" className="btn join-item">가본 코스 확인</Link>
        <Link to="/mypage/share-course" className="btn join-item">공유 코스 확인</Link>
        <button onClick={handleLogout} className="btn join-item">로그아웃</button>
        {isManager && <Link to="/admin" className="btn join-item">관리자</Link>}
      </div>
    </section>
  )
}