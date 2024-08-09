import UserCourseSectionItemSkeleton from "./UserCourseSectionItemSkeleton.jsx";
import UserCourseSectionItem from "./UserCourseSectionItem.jsx";
export default function UserCourseSection() {
  return (
    <section>
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">유저 추천 코스</h2>
        <a href="">더보기</a>
      </header>
      <UserCourseSectionItemSkeleton/>
    </section>
  );
}