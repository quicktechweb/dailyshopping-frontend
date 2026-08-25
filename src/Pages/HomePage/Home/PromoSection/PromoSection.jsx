"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const PromoSection = () => {
  const bannerImages = [
    {
      image: "https://i.ibb.co.com/ksNpYWrx/Image-111.jpg",
      link: "/",
    },
    {
      image: "https://i.ibb.co.com/PGy326fJ/new-banner-3.jpg",
      link: "/",
    },
    {
      image: "https://i.ibb.co.com/XrhZLR8J/Whats-App-Image-2026-01-15-at-3-11-51-PM-1.jpg",
      link: "/",
    },
  ];

  return (
    <div className="flex justify-center bg-white md:py-3 md:mb-5 py-2 mb-7 px-2 md:px-0 -mt-20 md:mt-0">
      <div className="w-[1200px] max-w-full relative">
        {/* 🔹 Swiper */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".promo-next",
            prevEl: ".promo-prev",
          }}
          className="rounded-xl overflow-hidden"
        >
          {bannerImages.map((item, index) => (
            <SwiperSlide key={index}>
              <Link to={item.link}>
                <img
                  src={item.image}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-[180px] md:h-[288px] object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 🔹 Left Arrow */}
        <button className="promo-prev absolute top-1/2 -translate-y-1/2 md:-left-5 z-10 -left-2  bg-white/80 hover:bg-white p-2 rounded-full shadow-lg">
          <ChevronLeft size={28} />
        </button>

        {/* 🔹 Right Arrow */}
        <button className="promo-next absolute top-1/2 -translate-y-1/2 md:-right-5 -right-2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg">
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};

export default PromoSection;
