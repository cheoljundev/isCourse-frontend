import './App.css'
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import Home from "./components/home/Home.jsx";
import {useEffect, useRef} from "react";
import SignupTerms from "./components/user/SignupTerms.jsx";
import SignupForm from "./components/user/SignupForm.jsx";
import SignupComplete from "./components/user/SignupComplete.jsx";
import DealDetail from "./components/deal/DealDetail.jsx";
import LoginModal from "./components/user/LoginModal.jsx";
import UserCourseList from "./components/user-course/UserCourseList.jsx";
import UserCourseDetail from "./components/user-course/UserCourseDetail.jsx";
import RecommendCourseList from "./components/recommend-course/RecommendCourseList.jsx";
import RecommendCourseDetail from "./components/recommend-course/RecommendCourseDetail.jsx";
import CourseShare from "./components/course/CourseShare.jsx";
import MyPage from "./components/user/MyPage.jsx";
import EditUserInfo from "./components/user/EditUserInfo.jsx";
import CourseSavedList from "./components/user/CourseSavedList.jsx";

function App() {
  const loginModalRef = useRef();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log("mapX: " + position.coords.latitude)
      console.log("mapY: " + position.coords.longitude)
    });
  }, []);
  return (
    <div className="pb-16 lg:pb-0">
      <LoginModal ref={loginModalRef}/>
      <Header modal={loginModalRef} />
      {/*<Home modal={modal}/>*/}
      {/*<SignupTerms/>*/}
      {/*<SignupForm/>*/}
      {/*<SignupComplete/>*/}
      {/*<DealDetail/>*/}
      {/*<UserCourseList/>*/}
      {/*<UserCourseDetail/>*/}
      {/*<RecommendCourseList/>*/}
      {/*<RecommendCourseDetail/>*/}
      {/*<CourseShare/>*/}
      {/*<MyPage/>*/}
      {/*<EditUserInfo/>*/}
      <CourseSavedList />
      <Footer modal={loginModalRef}/>
    </div>
  )
}

export default App
