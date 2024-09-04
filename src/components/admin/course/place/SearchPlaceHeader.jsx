import useField from "../../../../hooks/useField.js";
import useOption from "../../../../hooks/useOption.js";
import {useEffect} from "react";

export default function SearchPlaceHeader({onSearch}) {
  const initFieldsState = {
    placeType: '0000',
    largeCategory: '0000',
    middleCategory: '0000',
    tag: '0000',
    state: '0000',
    city: '0000',
  }

  const initOptionsState = {
    placeTypeOptions: [],
    largeCategoryOptions: [],
    middleCategoryOptions: [],
    tagOptions: [],
    stateOptions: [],
    cityOptions: [],
  }

  const {fields, handleFieldChange, resetArrayFields} = useField(initFieldsState);

  const {
    placeType,
    largeCategory,
    middleCategory,
    tag,
    state,
    city,
  } = fields;

  const {options, setOption} = useOption(initOptionsState);

  const {
    placeTypeOptions,
    largeCategoryOptions,
    middleCategoryOptions,
    tagOptions,
    stateOptions,
    cityOptions,
  } = options;

  useEffect(() => {
    setOption('placeTypeOptions');
    setOption('stateOptions');


  }, []);

  useEffect(() => {
    resetArrayFields(['largeCategory', 'middleCategory', 'tag']);
    setOption('largeCategoryOptions', placeType);
  }, [placeType]);

  useEffect(() => {
    resetArrayFields(['middleCategory', 'tag']);
    setOption('middleCategoryOptions', largeCategory);
  }, [largeCategory]);

  useEffect(() => {
    resetArrayFields(['tag']);
    setOption('tagOptions', middleCategory);
  }, [middleCategory]);

  useEffect(() => {
    resetArrayFields(['city']);
    setOption('cityOptions', state);
  }, [state]);

  return (
    <div className="card bg-base-100 w-full shadow-xl mb-6">
      <div className="card-body">
        <h3 className="card-title">검색 조건</h3>
        <label className="form-control w-full max-w-xs mb-2">
          <div className="label">
            <span className="label-text font-semibold">장소 타입</span>
          </div>
          <select className="select select-bordered w-full max-w-xs mb-2" name="placeType" value={placeType}
                  onChange={handleFieldChange}>
            <option value="0000" disabled>장소 타입 선택</option>
            {
              placeTypeOptions.map((option) => (
                <option key={option.code} value={option.code}>{option.name}</option>
              ))
            }
          </select>
        </label>
        <label className="form-control w-full max-w-xs mb-2">
          <div className="label">
            <span className="label-text font-semibold">대분류</span>
          </div>
          <select className="select select-bordered w-full max-w-xs mb-2" name="largeCategory" value={largeCategory}
                  onChange={handleFieldChange}>
            <option value="0000" disabled>대분류 선택</option>
            {
              largeCategoryOptions.map((option) => (
                <option key={option.code} value={option.code}>{option.name}</option>
              ))
            }
          </select>
        </label>
        <label className="form-control w-full max-w-xs mb-2">
          <div className="label">
            <span className="label-text font-semibold">중분류</span>
          </div>
          <select className="select select-bordered w-full max-w-xs mb-2" name="middleCategory" value={middleCategory}
                  onChange={handleFieldChange}>
            <option value="0000" disabled>중분류 선택</option>
            {
              middleCategoryOptions.map((option) => (
                <option key={option.code} value={option.code}>{option.name}</option>
              ))
            }
          </select>
        </label>
        <label className="form-control w-full max-w-xs mb-2">
          <div className="label">
            <span className="label-text font-semibold">소분류</span>
          </div>
          <select className="select select-bordered w-full max-w-xs mb-2" name="tag" value={tag}
                  onChange={handleFieldChange}>
            <option value="0000" disabled>소분류 선택</option>
            {
              tagOptions.map((option) => (
                <option key={option.code} value={option.code}>{option.name}</option>
              ))
            }
          </select>
        </label>
        <label className="form-control w-full max-w-xs mb-2">
          <div className="label">
            <span className="label-text font-semibold">광역시/도</span>
          </div>
          <select className="select select-bordered w-full max-w-xs mb-2" name="state" value={state}
                  onChange={handleFieldChange}>
            <option value="0000" disabled>광역시/도 선택</option>
            {
              stateOptions.map((option) => (
                <option key={option.code} value={option.code}>{option.name}</option>
              ))
            }
          </select>
        </label>
        <label className="form-control w-full max-w-xs mb-2">
          <div className="label">
            <span className="label-text font-semibold">시/군/구</span>
          </div>
          <select className="select select-bordered w-full max-w-xs mb-2" name="city" value={city}
                  onChange={handleFieldChange}>
            <option value="0000" disabled>시/군/구 선택</option>
            {
              cityOptions.map((option) => (
                <option key={option.code} value={option.code}>{option.name}</option>
              ))
            }
          </select>
        </label>
        <button className="btn btn-primary join-item flex-1" onClick={() => onSearch(0, placeType, largeCategory, middleCategory, tag, state, city)}>장소 검색하기</button>
      </div>
    </div>
  )
}