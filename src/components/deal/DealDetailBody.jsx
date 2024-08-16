import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";

export default function DealDetailBody({deal}) {
  return (
    <div>
      <Swiper
        className="mb-4"
        modules={[Navigation]}
        navigation
        slidesPerView={1}
      >
        {
          deal.images.map((image) => (
            <SwiperSlide key={image.id}>
              <img className="rounded-xl" src={`http://localhost:8080/image/deal/${image.storedFileName}`}/>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <small className="text-lg mb-2">{deal.station}</small>
      <h2 className="text-xl mb-4 font-bold">{deal.name}</h2>
      <div className="flex justify-between items-center">
        <h3 className="text-lg">{deal.product}</h3>
        <div className="flex flex-col items-end">
          <del className="text-gray-400">{deal.beforePrice}</del>
          <div className="flex items-center gap-x-2">
            <strong className="text-lg font-semibold text-blue-600">{deal.discountRate}%</strong>
            <div className="text-2xl font-bold">{deal.price}</div>
          </div>
        </div>
      </div>
      <p className="m-6 text-lg text-center">{deal.description}</p>
      <div className="flex justify-between mb-8 items-center">
        <h4>예약/문의하기</h4>
        <a href={`tel:${deal.contact}`} className="rounded-2xl py-1 px-4 border border-stone-950 border-solid">${deal.contact}</a>
      </div>
      <h4 className="mb-4">영업정보</h4>
      <div className="flex gap-x-6 mb-2">
        <h5 className="flex-shrink-0">시간</h5>
        <div className="text-sm">{deal.opening}</div>
      </div>
      <div className="flex gap-x-6 mb-2">
        <h5 className="flex-shrink-0">휴무</h5>
        <div className="text-sm">{deal.closing}</div>
      </div>
      <div className="flex gap-x-6 mb-2">
        <h5 className="flex-shrink-0">주차</h5>
        <div className="text-sm">
          {deal.parking ? "가능" : "불가능"}
        </div>
      </div>
    </div>
  )
}