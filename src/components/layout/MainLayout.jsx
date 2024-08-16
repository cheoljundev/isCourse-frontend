import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import {Outlet} from "react-router-dom";
import LoginModal from "../user/LoginModal.jsx";
import {useEffect} from "react";

export default function MainLayout({isShowModal, modal}) {
  useEffect(() => {
    if (isShowModal) {
      modal.current.open();
    }
  }, [isShowModal]);
  return (
    <>
      <LoginModal ref={modal}/>
      <Header modal={modal}/>
      <Outlet/>
      <Footer modal={modal}/>
    </>
  )
}