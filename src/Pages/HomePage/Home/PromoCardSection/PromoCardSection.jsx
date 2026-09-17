"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaApple, FaGooglePlay, FaStar, FaTag, FaTruck } from "react-icons/fa";

const BASE_URL = "https://dailyshopping-backend.onrender.com/api/promocardsection";

const PromoCardSection = () => {
  const [promoData, setPromoData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch promo card data
  const fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL);
      setPromoData(res.data);
    } catch (err) {
      console.error("Failed to fetch promo data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-2 justify-center max-w-[1280px] mx-auto animate-pulse">
        <div className="md:w-[700px] md:h-[160px] w-[600px] h-[130px] rounded-xl bg-gray-200" />
        <div className="md:w-[560px] md:h-[160px] w-[260px] h-[130px] rounded-xl bg-gray-200" />
      </div>
    );
  }

  const leftCard = promoData?.promoCards.find((c) => c.position === "left");

  return (
    <div className="flex md:gap-4 gap-2 justify-center max-w-[1250px] mx-auto px-4 -mt-3">
      
      {/* Left: Popular Category */}
      <div className="flex flex-col w-[600px] md:w-[700px]">
        {/* Text */}
        <h2 className="text-left text-gray-800 font-semibold text-lg mb-1">
          Popular Category
        </h2>
        {/* Image */}
        <div className="h-[170px] overflow-hidden bg-gray-50 rounded-xl shadow-md flex items-center justify-center">
          {leftCard?.image && (
            <Link to={leftCard?.link} className="w-full h-full">
              <img
                src={leftCard.image}
                alt="Popular Category"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </Link>
          )}
        </div>
      </div>

      {/* Right: Download Our App */}
      <div className="flex flex-col w-[560px] h-[170px] bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Top Text */}
        <div className="px-4 pt-3">
          <h2 className="text-left text-gray-800 font-semibold text-sm">
            Download Our App
          </h2>
        </div>

        <div className="flex flex-1 px-4 py-2 gap-2">
          {/* Left: QR Code / Image */}
          <div className="w-[180px] h-full bg-gray-100 flex items-center justify-center rounded-lg">
            <img
              src="https://i.ibb.co/zhnzR7d4/Playstore-Lucky.png"
              alt="QR Code / Promo"
              className="h-[120px] object-contain"
            />
          </div>

          {/* Right: Gradient Promo + Store Buttons */}
          <div className="flex-1 flex flex-col justify-between">
            {/* Gradient Promo Box */}
            <div className="flex-1 bg-gradient-to-br from-orange-400 via-pink-500 to-pink-600 rounded-xl p-2 text-white relative flex flex-col justify-center">
              {/* Rating */}
              <div className="absolute top-1 left-1 flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-xs font-semibold">
                <FaStar className="text-yellow-300 text-xs" />
                <span>4.8 Rated</span>
              </div>

              <div className="text-center font-bold text-sm mb-1">
                Download App
              </div>

              {/* Features */}
              <div className="flex flex-col gap-1 items-center justify-center">
                <div className="flex items-center gap-2 bg-white/20 rounded-lg px-2 py-1 w-full justify-center text-xs">
                  <FaTruck className="text-sm" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-lg px-2 py-1 w-full justify-center text-xs">
                  <FaTag className="text-sm" />
                  <span>Limited Time</span>
                </div>
              </div>
            </div>

            {/* Store Buttons */}
            <div className="flex gap-2 mt-2">
              <button className="flex items-center gap-2 border rounded-lg px-2 py-1 text-xs font-medium w-full justify-center">
                <FaApple className="text-sm" />
                App Store
              </button>
              <button className="flex items-center gap-2 border rounded-lg px-2 py-1 text-xs font-medium w-full justify-center">
                <FaGooglePlay className="text-sm text-green-600" />
                Google Play
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PromoCardSection;
