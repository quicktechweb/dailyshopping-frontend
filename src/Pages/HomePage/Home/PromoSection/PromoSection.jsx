"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const PromoSection = () => {
  const [bannerImages, setBannerImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bannerlanding/banners`);
        setBannerImages(res.data.banners || []);
      } catch (err) {
        console.error("Failed to load banners", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center bg-white md:py-3 md:mb-5 py-2 mb-7 px-2 md:px-0 -mt-20 md:mt-0">
        <div className="w-[1200px] max-w-full h-[180px] md:h-[288px] bg-gray-100 animate-pulse rounded-xl" />
      </div>
    );
  }

  if (!bannerImages.length) return null;

  return (
    <div className="flex justify-center bg-white md:py-3 md:mb-5 py-2 mb-7 px-2 md:px-0 -mt-20 md:mt-0">
      <div className="w-[1200px] max-w-full relative">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          pagination={{ clickable: true }}
          navigation={{ nextEl: ".promo-next", prevEl: ".promo-prev" }}
          className="rounded-xl overflow-hidden"
        >
          {bannerImages.map((item, index) => (
            <SwiperSlide key={item._id || index}>
              <Link to={item.link || "/"}>
                <img
                  src={item.images?.[0]?.url}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-[180px] md:h-[288px] object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="promo-prev absolute top-1/2 -translate-y-1/2 md:-left-5 z-10 -left-2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg">
          <ChevronLeft size={28} />
        </button>
        <button className="promo-next absolute top-1/2 -translate-y-1/2 md:-right-5 -right-2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg">
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};

export default PromoSection;