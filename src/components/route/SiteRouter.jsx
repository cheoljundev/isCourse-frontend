import {BrowserRouter, Route, Routes} from "react-router-dom";
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
import {useEffect, useRef, useState} from "react";
import AdminLayout from "../layout/AdminLayout.jsx";
import DealManage from "../admin/DealManage.jsx";
import DealAdd from "../admin/DealAdd.jsx";
import DealSalesManage from "../admin/DealSalesManage.jsx";
import MemberManage from "../admin/MemberManage.jsx";
import PlaceBring from "../admin/PlaceBring.jsx";
import PlaceManage from "../admin/PlaceManage.jsx";
import CourseAdd from "../admin/CourseAdd.jsx";
import CourseManage from "../admin/CourseManage.jsx";
import MyPage from "../user/MyPage.jsx";
import EditUserInfo from "../user/EditUserInfo.jsx";
import CourseSavedList from "../user/CourseSavedList.jsx";
import CourseSharedList from "../user/CourseSharedList.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import {AuthProvider} from "../../store/AuthContext.jsx";
import DealDetail from "../deal/DealDetail.jsx";
import ManagerRoute from "./ManagerRoute.jsx";
import AdminRoute from "./AdminRoute.jsx";
import {ModalProvider} from "../../store/ModalContext.jsx";

export default function SiteRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <Routes>
            {/*MainRoute*/}
            <Route path="/" element={<MainLayout/>}>
              <Route path="" element={<Home/>}/>
              <Route path="signup">
                <Route path="terms" element={<SignupTerms/>}/>
                <Route path="forms" element={<SignupForm/>}/>
                <Route path="complete" element={<SignupComplete/>}/>
              </Route>
              <Route path="user-course">
                <Route path="list" element={<UserCourseList/>}/>
                <Route path="detail/:id" element={<UserCourseDetail/>}/>
              </Route>
              <Route path="recommend-course" element={<PrivateRoute/>}>
                <Route path="list" element={<RecommendCourseList/>}/>
                <Route path="detail/:id" element={<RecommendCourseDetail/>}/>
              </Route>
              <Route path="course-share" element={<CourseShare/>}/>
              <Route path="mypage" element={<PrivateRoute/>}>
                <Route path="" element={<MyPage/>}/>
                <Route path="edit-info" element={<EditUserInfo/>}/>
                <Route path="saved-course" element={<CourseSavedList/>}/>
                <Route path="share-course" element={<CourseSharedList/>}/>
              </Route>
              <Route path="deal/:id" element={<DealDetail/>}/>
            </Route>

            {/*AdminRoute*/}
            <Route path="/admin" element={<ManagerRoute/>}>
              <Route path="" element={<DealManage/>}/>
              <Route path="course">
                <Route path="place">
                  <Route path="bring" element={<PlaceBring/>}/>
                  <Route path="manage" element={<PlaceManage/>}/>
                </Route>
                <Route path="add" element={<CourseAdd/>}/>
                <Route path="manage" element={<CourseManage/>}/>
              </Route>
              <Route path="member" element={<AdminRoute/>}>
                <Route path="" element={<MemberManage/>}/>
              </Route>
              <Route path="deal">
                <Route path="add" element={<DealAdd/>}/>
                <Route path="manage" element={<DealManage/>}/>
                <Route path="sales-manage" element={<DealSalesManage/>}/>
              </Route>
            </Route>
          </Routes>
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}