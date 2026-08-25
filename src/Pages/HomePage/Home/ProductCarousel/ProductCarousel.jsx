import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductCarousel() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  // ✅ Fetch carousel data from backend
  const fetchSlides = async () => {
    try {
      const res = await axios.get("https://serverluckyshop.luckyshop.com.bd/api/carousel");
      setSlides(res.data);
    } catch (error) {
      console.error("Failed to load carousel data:", error);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  // ✅ Auto slide every 8 seconds
  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % slides.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [slides]);

  if (slides.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-gray-500">
        Loading carousel...
      </div>
    );
  }

  return (
    <div className="relative w-full py-3 px-4 max-w-[1280px] md:max-w-[1380px] sm:max-w-[95%] mx-auto lg:px-20 rounded-2xl mt-5 overflow-hidden">
      <div className="relative h-64 sm:h-80 md:h-[20rem] lg:h-[22rem]">
        {slides.map((slide, i) => (
          <div
            key={slide._id}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100 z-10" : "opacity-0"
            }`}
          >
            <img
              src={slide.img1}
              alt={slide.title}
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-11/12 sm:w-3/4 md:w-1/2 p-4 sm:p-6 md:p-8 text-white rounded-lg">
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 drop-shadow-lg">
                {slide.title}
              </h2>
              {/* <button className="bg-gradient-to-r from-[#8CD005] to-[#19745B] text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300">
                {slide.buttonText} <span>&rarr;</span>
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {/* 🔘 Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all ${
              index === i ? "bg-yellow-400 scale-125" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
