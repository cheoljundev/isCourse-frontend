import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ky from "ky";
import {useDispatch} from "react-redux";
import {setMessage} from "../../redux/modules/modal.js";
import useField from "../../../hooks/useField.js";

export default function DealManageDetail() {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedImages, setSelectedImages] = useState({
    files: [],
    urls: [],
  });

  const [loading, setLoading] = useState(true);

  let initFieldsState = {
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
    beforePrice: 0,
    price: 0,
  }

  const {fields, handleFieldChange, handleFieldNumber, setField, setFields} = useField(initFieldsState);

  useEffect(() => {
    ky.get(`http://localhost:8080/api/deal/${id}`)
      .json()
      .then(data => {
        setFields({
          name: data.name,
          station: data.station,
          address1: data.address1,
          address2: data.address2,
          product: data.product,
          contact: data.contact,
          opening: data.opening,
          closing: data.closing,
          parking: data.parking,
          beforePrice: Number(data.beforePrice.replace(/[^0-9]/g, '')),
          price: Number(data.price.replace(/[^0-9]/g, '')),
          introduce: data.description,
        });
        const imageUrls = data.images.map(image => `http://localhost:8080/image/deal/${image.storedFileName}`);
        addImagesFromUrls(imageUrls);
        setLoading(false);

      })
  }, []);


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
    introduce,
    beforePrice,
    price,
  } = fields;

  function getMimeTypeFromFilename(filename) {
    const extension = filename.split('.').pop().toLowerCase(); // 확장자를 소문자로 추출
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      case 'bmp':
        return 'image/bmp';
      case 'webp':
        return 'image/webp';
      default:
        return 'application/octet-stream'; // 기본값 (알 수 없는 경우)
    }
  }

  function urlToFile(url, filename) {
    const mimeType = getMimeTypeFromFilename(filename); // MIME 타입 추출
    return ky.get(url)
      .arrayBuffer()
      .then(buffer => new File([buffer], filename, { type: mimeType }));
  }

  async function addImagesFromUrls(urls) {
    const files = await Promise.all(
      urls.map(async (url) => {
        const filename = url.split('/').pop();  // URL에서 파일 이름 추출
        return urlToFile(url, filename);  // 각 URL을 File 객체로 변환
      })
    );

    setSelectedImages(state => {
      return {
        ...state,
        files: files,
        urls: urls,
      }
    });  // 기존 파일 배열에 새 파일들 추가
  }

  function handleImageChange(event) {
    const files = Array.from(event.target.files);
    const imagesArray = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
      });
    });

    Promise.all(imagesArray).then((images) => setSelectedImages(state => {
      return {
        ...state,
        files: files,
        urls: images,
      }}));
  }

  useEffect(() => {
    if (!loading && price > beforePrice) {
      console.log(price, beforePrice)
      dispatch(setMessage({
        message: "가격은 정가보다 높을 수 없습니다.",
        isError: true,
        isShow: true,
      }));
      setField("price", Number(0));
    }
  }, [price, beforePrice]);

  const formattedBeforePrice = beforePrice ? Number(beforePrice).toLocaleString() : "";
  const formattedPrice = price ? Number(price).toLocaleString() : "";

  function handlePatchDeal() {


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
      introduce !== '' &&
      selectedImages.files.length > 0;

    const validIntroduce = introduce?.length >= 50;

    if (!validIntroduce) {
      dispatch(setMessage({
        message: `소개는 최소 50자 이상 입력해주세요. 현재 글자 수 : ${introduce?.length ? introduce.length : 0}`,
        isError: true,
        isShow: true,
      }));
      return;
    }

    const validImages = selectedImages.files?.length > 0;

    if (!validImages) {
      dispatch(setMessage({
        message: "이미지를 1개 이상 등록해주세요.",
        isError: true,
        isShow: true,
      }));
      return;
    }

    if (!validFields) {
      dispatch(setMessage({
        message: "모든 항목을 입력해주세요.",
        isError: true,
        isShow: true,
      }));
      return;
    }

    const formData = new FormData();

    selectedImages.files.forEach((image) => {
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


    ky.patch(`http://localhost:8080/api/manager/deal/${id}`, {
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
          message: "딜 수정에 실패했습니다.",
          isError: true,
          isShow: true,
        }));
      });
  }

  function handleDeleteDeal() {
    ky.delete(`http://localhost:8080/api/manager/deal/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .json()
      .then(() => {
        navigate('/admin/deal/manage');
      })
      .catch((error) => {
        console.error(error);
        dispatch(setMessage({
          message: "딜 삭제에 실패했습니다.",
          isError: true,
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
                  selectedImages.urls.map((image, index) => (
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
              <input type="text" placeholder="금액입력" name="beforePrice" value={formattedBeforePrice} onInput={handleFieldNumber} className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">가격</span>
              </div>
              <input type="text" placeholder="금액입력" name="price" value={formattedPrice} onInput={handleFieldNumber} className="input input-bordered w-full max-w-xs"/>
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
        <button className="btn btn-error join-item flex-1" onClick={handleDeleteDeal}>삭제</button>
        <button className="btn btn-primary join-item flex-1" onClick={handlePatchDeal}>수정</button>
      </div>
    </div>
  )
}