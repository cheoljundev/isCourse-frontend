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
        <SwiperSlide><img src="https://via.placeholder.com/1000"/></SwiperSlide>
        <SwiperSlide><img src="https://via.placeholder.com/1000"/></SwiperSlide>
        <SwiperSlide><img src="https://via.placeholder.com/1000"/></SwiperSlide>
      </Swiper>
      <small className="text-lg mb-2">Station</small>
      <h2 className="text-xl mb-4 font-bold">Name</h2>
      <div className="flex justify-between items-center">
        <h3 className="text-lg">title</h3>
        <div className="flex flex-col items-end">
          <del className="text-gray-400">00,000</del>
          <div className="flex items-center gap-x-2">
            <strong className="text-lg font-semibold text-blue-600">00%</strong>
            <div className="text-2xl font-bold">00,000</div>
          </div>
        </div>
      </div>
      <p className="m-6 text-lg text-center">description</p>
      <div className="flex justify-between mb-8 items-center">
        <h4>예약/문의하기</h4>
        <a href="tel:0200000000" className="rounded-2xl py-1 px-4 border border-stone-950 border-solid">02-0000-0000</a>
      </div>
      <h4 className="mb-4">영업정보</h4>
      <div className="flex gap-x-6 mb-2">
        <h5 className="flex-shrink-0">시간</h5>
        <div className="text-sm">수요일, 목요일 18:00 ~ 02:00 / 금요일, 토요일, 일요일 18:00 ~ 04:00</div>
      </div>
      <div className="flex gap-x-6 mb-2">
        <h5 className="flex-shrink-0">휴무</h5>
        <div className="text-sm">월요일, 화요일</div>
      </div>
      <div className="flex gap-x-6 mb-2">
        <h5 className="flex-shrink-0">주차</h5>
        <div className="text-sm">불가능</div>
      </div>
    </div>
  )
}