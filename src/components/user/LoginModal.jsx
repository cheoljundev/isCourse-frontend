import {forwardRef, useEffect, useRef, useState} from 'react';
import {createPortal} from "react-dom";
import {useNavigate} from "react-router-dom";
import ky from "ky";
import Alert from "../util/Alert.jsx";
import {signin} from "../redux/modules/auth.js";
import {useDispatch, useSelector} from "react-redux";
import {setIsShowLoginModal} from "../redux/modules/modal.js";
const LoginModal = forwardRef(function LoginModal() {
  const modal = useRef();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const isShowLoginModal = useSelector(state => state.modalReducer.isShowLoginModal);

  useEffect(() => {
    if (isShowLoginModal) {
      modal.current.showModal();
    }
  }, [isShowLoginModal]);

  function handleSignup() {
    modal.current.close();
    navigate("/signup/terms");
  }

  function handleSignin() {
    ky.post("http://localhost:8080/api/signin", {
      json: {username: id, password}
    })
      .text()
      .then((token) => {
        dispatch(signin(token));
        modal.current.close();
      })
      .catch((error) => {
        console.error("Failed to signin", error);
        setError(true);
      });
  }

  function handleId(e) {
    setId(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleClose() {
    setId("");
    setPassword("");
    setError(false);
    dispatch(setIsShowLoginModal(false));
  }

  return createPortal(
    <dialog ref={modal} className="modal" onClose={handleClose}>
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">로그인</h3>
        <p className="py-4">아이디와 비밀번호를 입력해 로그인해주세요.</p>
        {error && <Alert message="아이디 또는 비밀번호가 일치하지 않습니다." type="error"/>}
        <div className="mb-4">
          <label className="input border-solid input-bordered flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"/>
            </svg>
            <input type="text" value={id} className="grow" placeholder="Id" onChange={(e)=>handleId(e)}/>
          </label>
          <label className="input border-solid input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"/>
            </svg>
            <input type="password" value={password} className="grow" placeholder="Password" onChange={(e) => handlePassword(e)}/>
          </label>
        </div>
        <div className="flex flex-col gap-y-3 items-center">
          <button className="btn btn-wide btn-primary" onClick={handleSignin}>로그인</button>
          <button className="btn btn-wide btn-outline" onClick={handleSignup}>회원가입</button>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default LoginModal;