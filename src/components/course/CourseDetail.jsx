import ky from "ky";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setIsShowLoginModal, setMessage} from "../redux/modules/modal.js";

export default function CourseDetail({course, id}) {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(state => state.authReducer.isSignedIn);
  const [likes , setLikes] = useState(course.likes);

  function handleLike() {
    if (!isSignedIn) {
      dispatch(setIsShowLoginModal(true));
      return;
    }
    ky.patch(`http://localhost:8080/api/course-like/${id}`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .json()
      .then(data => setLikes(data))
      .catch((error) => {
        console.error("Failed to like course", error);
      });
  }

  function handleCourseConfirm() {
    if (!isSignedIn) {
      dispatch(setIsShowLoginModal(true));
      return;
    }
    ky.post(`http://localhost:8080/api/select-course/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .json()
      .then(() => {
        dispatch(setMessage({
          title: '코스 가보기 완료',
          message: '마이페이지에서 확인하세요.',
          error: false,
          isShow: true,
        }))
      })
      .catch((error) => {
        if (error.response) {
          error.response.json().then(err => {
            console.error("Failed to select course", err);
            dispatch(setMessage({
              message: err.message,
              error: true,
              isShow: true,
            }));
          });
        } else {
          console.error("Failed to select course", error);

          dispatch(setMessage({
            message: '[알 수 없는 문제] 코스 선택에 실패했습니다.',
            error: true,
            isShow: true,
          }));
        }
      });
  }

  return (
    <div className="pb-16">
      <header className="relative mb-4">
        <img className="object-cover w-full filter brightness-50" src={course.image} alt="코스 배경"/>
        <div className="absolute m-auto left-0 top-0 p-4 h-full w-full text-white">
          <small className="text-lg font-light">{course.state}</small>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">{course.name}</h2>
            <button className="btn btn-ghost btn-sm" onClick={handleLike}>좋아요 {likes}</button>
          </div>
          <small className="mb-4 block">{course.nickname}</small>
          <div className="flex flex-wrap gap-2 mb-4">
            {
              course.tags.map((tag, index) => {
                return <span key={index} className="badge badge-outline border-solid">#{tag}</span>;
              })
            }
          </div>
          <time className="text-sm">{course.time}</time>
        </div>
      </header>
      <div className="px-4">
        {/*<div className="w-40">*/}
        {/*  <menu role="tablist" className="tabs tabs-boxed">*/}
        {/*    <button role="tab" className="btn btn-sm tab tab-active border-none">코스 소개</button>*/}
        {/*    <button role="tab" className="btn btn-sm tab border-none">코스</button>*/}
        {/*  </menu>*/}
        {/*</div>*/}
        <p className="my-6 text-lg">{course.introduce}</p>
        <div>
          <h3 className="text-xl font-bold mb-6">코스 상세보기</h3>
          <ul className="steps steps-vertical">
            {
              course.coursePlaces.map((place, index) => {
                return <li key={index} className="step">
                  <div className="flex gap-x-4 mb-4">
                    <img className="rounded-xl self-start flex-shrink-0 w-16 h-16" src={place.image}/>
                    <div className="flex flex-col justify-center w-64 text-left">
                      <small className="text-sm">{place.state}</small>
                      <h4 className="text-lg font-semibold">{place.name}</h4>
                    </div>
                  </div>
                </li>})
            }
          </ul>
        </div>
      </div>
      <button onClick={handleCourseConfirm} className="btn btn-primary w-full fixed bottom-16 lg:bottom-0 z-10">코스 가보기</button>
    </div>
  )
}