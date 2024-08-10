import './App.css'
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import Home from "./components/home/Home.jsx";
import {useEffect, useRef} from "react";
import SignupTerms from "./components/signup/SignupTerms.jsx";
import SignupForm from "./components/signup/SignupForm.jsx";
import SignupComplete from "./components/signup/SignupComplete.jsx";
import DealDetail from "./components/deal/DealDetail.jsx";
import LoginModal from "./components/home/user/LoginModal.jsx";
import UserCourseList from "./components/user-course/UserCourseList.jsx";
import UserCourseDetail from "./components/user-course/UserCourseDetail.jsx";

function App() {
  const modal = useRef();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log("mapX: " + position.coords.latitude)
      console.log("mapY: " + position.coords.longitude)
    });
  }, []);
  return (
    <div className="pb-16 lg:pb-0">
      <LoginModal ref={modal}/>
      <Header modal={modal} />
      {/*<Home modal={modal}/>*/}
      {/*<SignupTerms/>*/}
      {/*<SignupForm/>*/}
      {/*<SignupComplete/>*/}
      {/*<DealDetail/>*/}
      <UserCourseList/>
      {/*<UserCourseDetail modal={modal}/>*/}
      <Footer modal={modal}/>
    </div>
  )
}

export default App
