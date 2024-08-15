import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import {Outlet} from "react-router-dom";
import LoginModal from "../user/LoginModal.jsx";

export default function MainLayout({modal}) {
  return (
    <>
      <LoginModal ref={modal}/>
      <Header modal={modal}/>
      <Outlet/>
      <Footer modal={modal}/>
    </>
  )
}