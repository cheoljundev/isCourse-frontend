import {useAuth} from "../../store/AuthContext.jsx";
import {useModal} from "../../store/ModalContext.jsx";

export default function CourseDetail({course}) {
  const {isSignedIn} = useAuth();
  const {courseConfirmModal, loginModal} = useModal();

  function handleLike() {
    if (!isSignedIn) {
      loginModal.current.open();
      return;
    }
    // 좋아요 기능
  }

  function handleCourseConfirm() {
    if (!isSignedIn) {
      loginModal.current.open();
      return;
    }
    courseConfirmModal.current.open();
  }

  return (
    <div className="pb-16">
      <header className="relative mb-4">
        <img className="object-cover w-full h-52 filter brightness-50" src="https://picsum.photos/1000" alt="코스 배경"/>
        <div className="absolute m-auto left-0 top-0 p-4 h-full w-full text-white">
          <small className="text-lg font-light">{course.state}</small>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">{course.name}</h2>
            <button className="btn btn-ghost btn-sm" onClick={handleLike}>좋아요 {course.likes}</button>
          </div>
          <small className="mb-4 block">{course.nickname}</small>
          <div className="flex gap-2 mb-4">
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
                    <img className="rounded-xl self-start flex-shrink-0" src={place.image}/>
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