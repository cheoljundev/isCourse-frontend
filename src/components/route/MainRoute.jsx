import {Route, Routes} from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";
import Home from "../home/Home.jsx";
import SignupTerms from "../user/SignupTerms.jsx";
import SignupForm from "../user/SignupForm.jsx";
import SignupComplete from "../user/SignupComplete.jsx";
import UserCourseList from "../user-course/UserCourseList.jsx";
import UserCourseDetail from "../user-course/UserCourseDetail.jsx";
import RecommendCourseList from "../recommend-course/RecommendCourseList.jsx";
import RecommendCourseDetail from "../recommend-course/RecommendCourseDetail.jsx";
import CourseShare from "../course/CourseShare.jsx";
import {useRef} from "react";

export default function MainRoute() {
  const loginModalRef = useRef();

  return (
    <Routes>
      <Route element={<MainLayout modal={loginModalRef}/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup">
          <Route path="terms" element={<SignupTerms/>}/>
          <Route path="forms" element={<SignupForm/>}/>
          <Route path="complete" element={<SignupComplete/>}/>
        </Route>
        <Route path="/user-course">
          <Route path="list" element={<UserCourseList/>}/>
          <Route path="detail/:id" element={<UserCourseDetail/>}/>
        </Route>
        <Route path="/recommend-course">
          <Route path="list" element={<RecommendCourseList/>}/>
          <Route path="detail/:id" element={<RecommendCourseDetail/>}/>
        </Route>
        <Route path="/course-share" element={<CourseShare/>}/>
      </Route>
    </Routes>
  )
}