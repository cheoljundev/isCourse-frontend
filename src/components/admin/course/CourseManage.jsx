import {X} from "react-bootstrap-icons";
import CourseItem from "./CourseItem.jsx";
import {useEffect, useState} from "react";
import ky from "ky";
import useField from "../../../hooks/useField.js";
import Pagination from "../../util/Pagination.jsx";
import {useDispatch} from "react-redux";
import {setMessage} from "../../redux/modules/modal.js";
import PlaceItemSkeleton from "../../course/PlaceItemSkeleton.jsx";

export default function CourseManage() {
  const dispatch = useDispatch();
  const initFieldsState = {
    name: '',
    courseType: '',
  };

  const {fields, handleFieldChange} = useField(initFieldsState);
  const {
    name,
    courseType,
  } = fields;

  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [courses, setCourses] = useState([]);
  const [page , setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);


  function handleSelectTag(event) {
    const selectedValue = event.target.value;
    const tagArr = tags.find(tag => tag.code === selectedValue);
    if (selectedValue === "0000") return;
    setSelectedTags((prevSelectedTags)=>{
      return [...new Set([...prevSelectedTags, tagArr])];
    });
  }

  function handleRemoveTag(tag) {
    setSelectedTags((prevSelectedTags)=>{
      return prevSelectedTags.filter(selectedTag => selectedTag.code !== tag.code);
    });
  }

  useEffect(() => {
    ky.get("http://localhost:8080/api/tag")
      .json()
      .then(data =>
        setTags(data)
      )
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (page !== null){
      searchCourse(page);
    }
  }, [page]);

  function searchCourse(page = 0) {
    let url = `http://localhost:8080/api/manager/course?page=${page}&size=6`;
    if (name) {
      url += `&name=${name}`;
    }
    if (courseType) {
      url += `&courseType=${courseType}`;
    }
    if (selectedTags.length > 0) {
      url += `&tagCodeList=${selectedTags.map(tag => tag.code).join(",")}`;
    }

    ky.get(url,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }})
      .json()
      .then(data => {
        setCourses(data.content);
        setPage(data.number);
        setTotalPages(data.totalPages);
        setIsFirst(data.first);
        setIsLast(data.last);
        setLoading(false);
      })
      .catch(() => {
        dispatch(setMessage({
          message: "코스 검색에 실패했습니다.",
          isError: true,
          isShow: true,
        }));
        }
      )
  }

  function handleDeleteCourse(courseId) {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      ky.delete(`http://localhost:8080/api/manager/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        .then(() => {
          dispatch(setMessage({
            message: "코스가 삭제되었습니다.",
            isError: false,
            isShow: true,
          }));
          searchCourse(page);
        })
        .catch(() => {
          dispatch(setMessage({
            message: "코스 삭제에 실패했습니다.",
            isError: true,
            isShow: true,
          }));
        });
    }
  }

  return (
    <div className="pb-12">
      <section className="px-4">
        <h2 className="mb-2 font-bold text-lg">코스 관리하기</h2>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">검색 조건</h3>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">코스 제목</span>
              </div>
              <input name="name" value={name} onChange={handleFieldChange} type="text" placeholder="코스 제목 입력" className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">코스 태그</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-4" defaultValue="0000"
                      onChange={handleSelectTag}>
                <option disabled value="0000">태그 선택</option>
                {tags && tags.map((tag) => (
                  <option key={tag.code} value={tag.code}>{tag.name}</option>
                ))}
              </select>
              <div className="flex flex-wrap gap-2">
                {
                  selectedTags.map((tag) => (
                    <button onClick={() => handleRemoveTag(tag)} key={tag.code} className="badge badge-ghost">
                      <span>{tag.name}</span>
                      <X className="text-lg"/>
                    </button>
                  ))
                }
              </div>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">코스 종류</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-2" name="courseType" value={courseType} onChange={handleFieldChange} defaultValue="코스 종류">
                <option disabled>코스 종류</option>
                <option value="ROLE_ADMIN">관리자</option>
                <option value="ROLE_MANAGER">매니저</option>
                <option value="ROLE_USER">유저</option>
              </select>
            </label>
            <button className="btn btn-primary join-item flex-1" onClick={()=>searchCourse(0)}>코스 검색하기</button>
          </div>
        </div>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">검색 결과</h3>
            <div className="form-control w-full mb-4">
              <div className="card shadow-xl bg-gray-50 w-full">
                <div className="card-body">
                  {loading && <PlaceItemSkeleton/>}
                  {!loading && courses.map(course => (
                    <CourseItem key={course.id} course={course} onClick={handleDeleteCourse}/>
                  ))}
                </div>
              </div>
              <Pagination page={page} totalPages={totalPages} isFirst={isFirst} isLast={isLast} setPage={setPage}/>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}