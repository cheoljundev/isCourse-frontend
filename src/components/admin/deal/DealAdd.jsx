import PlaceItemSkeleton from "../../course/PlaceItemSkeleton.jsx";
import {X} from "react-bootstrap-icons";
import PlaceItem from "../../course/PlaceItem.jsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useModal} from "../../../store/ModalContext.jsx";
import ky from "ky";

export default function DealAdd() {
  const [name , setName] = useState('');
  const [station, setStation] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [product, setProduct] = useState('');
  const [contact, setContact] = useState('');
  const [opening, setOpening] = useState('');
  const [closing, setClosing] = useState('');
  const [parking, setParking] = useState(true);
  const [beforePrice, setBeforePrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [introduce, setIntroduce] = useState('');
  const {messageModal, setMessage} = useModal();

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

  function handleName(event) {
    setName(event.target.value);
  }

  function handleStation(event) {
    setStation(event.target.value);
  }

  function handleAddress1(event) {
    setAddress1(event.target.value);
  }

  function handleAddress2(event) {
    setAddress2(event.target.value);
  }

  function handleProduct(event) {
    setProduct(event.target.value);
  }

  function handleContact(event) {
    setContact(event.target.value);
  }

  function handleOpening(event) {
    setOpening(event.target.value);
  }

  function handleClosing(event) {
    setClosing(event.target.value);
  }

  function handleParking(event) {
    setParking(event.target.value);
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
      setMessage((prevMessage) => ({
        ...prevMessage,
        message: "가격은 정가보다 높을 수 없습니다.",
        error: true,
      }))
      messageModal.current.open();
      setPrice(Number(0));
    }
  }, [price]);

  const formattedPrice = price ? price.toLocaleString() : "";

  function handleIntroduce(event) {
    setIntroduce(event.target.value);
  }

  function handleAddDeal() {

    if (
      name === '' ||
      station === '' ||
      address1 === '' ||
      address2 === '' ||
      product === '' ||
      contact === '' ||
      opening === '' ||
      closing === '' ||
      beforePrice === 0 ||
      price === 0 ||
      introduce === '' ||
      images.length === 0
    ) {
      setMessage((prevMessage) => ({
        ...prevMessage,
        message: "모든 항목을 입력해주세요.",
        error: true,
      }))
      messageModal.current.open();
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
        setMessage((prevMessage) => ({
          ...prevMessage,
          message: "딜이 등록되었습니다.",
          error: false,
        }))
        messageModal.current.open();
    })
      .catch((error) => {
        console.error(error);
        setMessage((prevMessage) => ({
          ...prevMessage,
          message: "딜 등록에 실패했습니다.",
          error: true,
        }))
        messageModal.current.open();
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
              <input type="text" placeholder="딜 제목 입력" value={name} onChange={handleName} className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">딜 지역</span>
              </div>
              <input type="text" placeholder="딜 지역 입력" value={station} onChange={handleStation} className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">주소지</span>
              </div>
              <input type="text" placeholder="주소지 입력" value={address1} onChange={handleAddress1} className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">주소지 상세</span>
              </div>
              <input type="text" placeholder="주소지 상세 입력" value={address2} onChange={handleAddress2} className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">딜 상품명</span>
              </div>
              <input type="text" placeholder="딜 상품명 입력" value={product} onChange={handleProduct} className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">딜 연락처</span>
              </div>
              <input type="tel" placeholder="딜 연락처 입력" value={contact} onChange={handleContact} className="input input-bordered w-full max-w-xs"/>
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
              <input type="text" placeholder="영업 요일 및 시간 입력" value={opening} onChange={handleOpening} className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">휴무</span>
              </div>
              <input type="text" placeholder="휴무 요일 입력" value={closing} onChange={handleClosing} className="input input-bordered w-full max-w-xs"/>
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text font-semibold">주차 여부</span>
              </div>
              <select className="select select-bordered w-full max-w-xs mb-2" defaultValue="true" onChange={handleParking}>
                <option value="true">가능</option>
                <option value="false">불가능</option>
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
            <textarea className="textarea textarea-sm textarea-bordered" value={introduce} onChange={handleIntroduce} cols="30" rows="4"
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