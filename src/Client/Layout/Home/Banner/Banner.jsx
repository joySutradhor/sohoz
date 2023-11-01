// import  { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import "./Banner.css"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Banner() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* <SwiperSlide><img src="https://i.ibb.co/9V3CXx9/b-min.jpg" alt="" /></SwiperSlide> */}
        <SwiperSlide><img src="https://i.ibb.co/wc3Qwxr/banner.webp" alt="" /></SwiperSlide>
      </Swiper>
    </>
  );
}