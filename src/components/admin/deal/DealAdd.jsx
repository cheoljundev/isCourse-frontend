import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ky from "ky";
import {useDispatch} from "react-redux";
import {setMessage} from "../../redux/modules/modal.js";
import useField from "../../../hooks/useField.js";

export default function DealAdd() {
  const initFieldsState = {
    name: '',
    station: '',
    address1: '',
    address2: '',
    product: '',
    contact: '',
    opening: '',
    closing: '',
    parking: true,
    introduce: '',
  }

  const [fields, handleFieldChange] = useField(initFieldsState);

  const {
    name,
    station,
    address1,
    address2,
    product,
    contact,
    opening,
    closing,
    parking,
    introduce
  } = fields;

  const [price, setPrice] = useState(0);
  const [beforePrice, setBeforePrice] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);

  function handleImageChange(event) {
    const files = Array.from(event.target.files);
    const imagesArray = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
      });
    });

    Promise.all(imagesArray).then((images) => setSelectedImages(images));
    setImages(files);

  }

  function handleBeforePrice(event) {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    setBeforePrice(Number(numericValue));
  }

  const formattedBeforePrice = beforePrice ? Number(beforePrice).toLocaleString() : "";

  function handlePrice(event) {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    setPrice(Number(numericValue));
  }

  useEffect(() => {
    if (price > beforePrice) {
      dispatch(setMessage({
        message: "가격은 정가보다 높을 수 없습니다.",
        error: true,
        isShow: true,
      }));
      setPrice(Number(0));
    }
  }, [price]);

  const formattedPrice = price ? price.toLocaleString() : "";

  function handleAddDeal() {


    const validFields = name !== '' &&
      station !== '' &&
      address1 !== '' &&
      address2 !== '' &&
      product !== '' &&
      contact !== '' &&
      opening !== '' &&
      closing !== '' &&
      beforePrice > 0 &&
      price > 0 &&
      introduce.length >= 50 &&
      images.length > 0;

    const validIntroduce = introduce.length >= 50;

    if (!validIntroduce) {
      dispatch(setMessage({
        message: `소개는 최소 50자 이상 입력해주세요. 현재 글자 수 : ${introduce.length}`,
        error: true,
        isShow: true,
      }));
      return;
    }

    const validImages = images.length > 0;

    if (!validImages) {
      dispatch(setMessage({
        message: "이미지를 1개 이상 등록해주세요.",
        error: true,
        isShow: true,
      }));
      return;
    }

    if (!validFields) {
      dispatch(setMessage({
        message: "모든 항목을 입력해주세요.",
        error: true,
        isShow: true,
      }));
      return;
    }

    const formData = new FormData();

    images.forEach((image) => {
      formData.append('files', image);  // 'files'는 스웨거 스키마에 명시된 이름과 일치해야 합니다.
    });

    const data = {
      station,
      name,
      product,
      description: introduce,
      beforePrice,
      price,
      opening,
      closing,
      address1,
      address2,
      contact,
      parking,
    };

    formData.append('data', new Blob([JSON.stringify(data)], { type: 'application/json' }));


    ky.post('http://localhost:8080/api/manager/deal', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    })
      .json()
      .then(() => {
      navigate('/admin/deal/manage');
    })
      .catch((error) => {
        console.error(error);
        dispatch(setMessage({
          message: "딜 등록에 실패했습니다.",
          error: true,
          isShow: true,
        }));
      });
  }
  return (
    <div className="pb-12">
      <section className="px-4">
        <h2 className="mb-2 font-bold text-lg">딜 등록하기</h2>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">딜 정보</h3>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">딜 제목</span>
              </div>
              <input type="text" placeholder="딜 제목 입력" name="name" value={name} onChange={handleFieldChange} className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">딜 지역</span>
              </div>
              <input type="text" placeholder="딜 지역 입력" name="station" value={station} onChange={handleFieldChange} className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">주소지</span>
              </div>
              <input type="text" placeholder="주소지 입력" name="address1" value={address1} onChange={handleFieldChange} className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">주소지 상세</span>
              </div>
              <input type="text" placeholder="주소지 상세 입력" name="address2" value={address2} onChange={handleFieldChange} className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">딜 상품명</span>
              </div>
              <input type="text" placeholder="딜 상품명 입력" name="product" value={product} onChange={handleFieldChange} className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">딜 연락처</span>
              </div>
              <input type="tel" placeholder="딜 연락처 입력" name="contact" value={contact} onChange={handleFieldChange} className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">딜 이미지</span>
              </div>
              <input type="file" className="file-input w-full max-w-xs mb-2" multiple={true} onChange={handleImageChange}/>
              <div className="flex flex-wrap gap-2">
                {
                  selectedImages.map((image, index) => (
                    <img key={index} className="rounded-lg w-10 h-10 object-cover" src={image} alt=""/>
                  ))
                }
              </div>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">시간</span>
              </div>
              <input type="text" placeholder="영업 요일 및 시간 입력" name="opening" value={opening} onChange={handleFieldChange} className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">휴무</span>
              </div>
              <input type="text" placeholder="휴무 요일 입력" name="closing" value={closing} onChange={handleFieldChange} className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">주차 여부</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-2" name="parking" defaultValue={parking} onChange={handleFieldChange}>
                <option name="parking" value="true">가능</option>
                <option name="parking" value="false">불가능</option>
              </select>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">정가</span>
              </div>
              <input type="text" placeholder="금액입력" value={formattedBeforePrice} onInput={handleBeforePrice} className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">가격</span>
              </div>
              <input type="text" placeholder="금액입력" value={formattedPrice} onInput={handlePrice} className="input input-bordered w-full max-w-xs"/>
            </label>
          </div>
        </div>
        <div className="card bg-base-100 w-full shadow-xl mb-6">
          <div className="card-body">
            <h3 className="card-title">딜 소개</h3>
            <p className="text-red-500">최소 50자 이상 작성</p>
            <textarea className="textarea textarea-sm textarea-bordered" name="introduce" value={introduce} onChange={handleFieldChange} cols="30" rows="4"
                      minLength="50"></textarea>
          </div>
        </div>
      </section>
      <div className="join w-full fixed bottom-0">
        <Link to="/admin/deal/manage" className="btn join-item flex-1">취소</Link>
        <button className="btn btn-primary join-item flex-1" onClick={handleAddDeal}>등록</button>
      </div>
    </div>
  )
}