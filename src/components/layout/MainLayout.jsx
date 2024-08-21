import Header from "../common/Header.jsx";
import Footer from "../common/Footer.jsx";
import {Outlet} from "react-router-dom";
import LoginModal from "../user/LoginModal.jsx";

export default function MainLayout() {
  return (
    <>
      <LoginModal/>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}