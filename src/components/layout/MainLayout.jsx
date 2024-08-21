import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import {Outlet} from "react-router-dom";
import LoginModal from "../user/LoginModal.jsx";
import {useEffect} from "react";
import {useModal} from "../../store/ModalContext.jsx";
import MessageModal from "../util/MessageModal.jsx";

export default function MainLayout() {
  const { loginModal, isShowLoginModal, setIsShowLoginModal} = useModal();
  useEffect(() => {
    if (isShowLoginModal) {
      loginModal.current.open();
      setIsShowLoginModal(false);
    }
  }, [isShowLoginModal]);
  return (
    <>
      <LoginModal ref={loginModal}/>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}