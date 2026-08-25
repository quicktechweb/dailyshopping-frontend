import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function PopularCategory() {
  const categories = [
    { name: "Kategori", img: "https://luckyshop.com.bd/demo/1763027822586_nocturnal-vapor-special-edition-01-500x500.webp" },
    { name: "Handphone & Tablet", img: "https://luckyshop.com.bd/demo/1768130995804_Phone_3.jpeg" },
    { name: "Top-Up & Tagihan", img: "https://luckyshop.com.bd/demo/1763031343097_0679530_helmet_600-removebg-preview.png" },
    { name: "Elektronik", img: "https://luckyshop.com.bd/demo/1768405677025_Coffee_Maker.jpg" },
    { name: "Perawatan Hewan", img: "https://luckyshop.com.bd/demo/1768409720118_City-Gold-G-scaled.jpg" },
    { name: "Keuangan", img: "https://luckyshop.com.bd/demo/1763034805014_Okavango-231.jpg" },
    { name: "Komputer & Laptop", img: "https://luckyshop.com.bd/demo/1763033346400_mens-watches2-removebg-preview.png" },
    { name: "Top-Up & Tagihan", img: "https://luckyshop.com.bd/demo/1763034781860_Borges-208_.png" },
    { name: "Elektronik", img: "https://luckyshop.com.bd/demo/1763032870455_0704465_vision-30-liter-rice-cooker-rel-50-05-stainless-steel-single-pot-regular-red-removebg-preview.png" },
    { name: "Perawatan Hewan", img: "https://luckyshop.com.bd/demo/1763030591702_0332253_saudi-xpress-diesel-engine-oil-sae-20w-50-api-cf4-15-ltr.jpeg" },
    { name: "Keuangan", img: "https://luckyshop.com.bd/demo/1763030682010_1309226_tubeless-balanced-bike-for-kids-12-inch-walking-balanced-bike-2-to-4-years-baby-baby-bike-green-red-.jpeg" },
    { name: "Komputer & Laptop", img: "https://luckyshop.com.bd/demo/1763027822586_nocturnal-vapor-special-edition-01-500x500.webp" },
  ];

  /* Mobile slider logic */
  /* ================= MOBILE AUTO SCROLL ================= */
const mobileRef = useRef(null);

useEffect(() => {
  const container = mobileRef.current;
  if (!container) return;

  let scrollAmount = 0;
  let rafId;

  const speed = 0.4; // 🔥 speed control (increase = faster)

  const autoScroll = () => {
    scrollAmount += speed;
    container.scrollLeft = scrollAmount;

    // 🔁 infinite loop
    if (scrollAmount >= container.scrollWidth / 2) {
      scrollAmount = 0;
    }

    rafId = requestAnimationFrame(autoScroll);
  };

  rafId = requestAnimationFrame(autoScroll);

  return () => cancelAnimationFrame(rafId);
}, []);



  const containerRef = useRef(null);
  const scrollRef = useRef(0); // current scroll position

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId;

    const speed = 0.5; // pixels per frame, adjust for smoothness

    const step = () => {
      if (!container) return;

      scrollRef.current += speed;

      // loop scroll when reaching the end
      if (scrollRef.current > container.scrollWidth - container.clientWidth) {
        scrollRef.current = 0;
      }

      container.scrollLeft = scrollRef.current;

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  
  return (
    <div className="max-w-[1220px] mx-auto bg-white rounded-xl shadow-md p-4 md:p-6 md:mb-7 mb-32">

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-4">
        <h2 className="text-lg md:text-2xl font-bold md:block hidden">
          Popular Category
        </h2>

        <div className="md:flex-1 md:flex md:justify-center md:ms-32 ms-0 md:block hidden">
          <span className="font-bold md:text-xl mr-1">
            Download
          </span>
          <a href="#" className="text-green-600 font-medium text-xl ">
            Daily Shopping App
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-4 -mt-10 md:mt-0">
        {/* Left Banner */}
        <div className="md:w-1/2 rounded-lg overflow-hidden md:block hidden">
          <img
            src="https://i.ibb.co.com/XrhZLR8J/Whats-App-Image-2026-01-15-at-3-11-51-PM-1.jpg"
            alt="Promo"
            className="w-full h-auto md:h-[180px] object-cover"
          />
        </div>

        {/* Download Card */}
        <div className="flex flex-col w-full md:w-[560px] md:h-[180px] bg-white shadow-lg rounded-xl p-4 hidden md:block">
          <div className="flex gap-3">
            <div className="w-[120px] md:w-[180px]  flex items-center justify-center">
              <img
                src="https://i.ibb.co.com/zhnzR7d4/Playstore-Lucky.png"
                alt="QR"
                className="w-28 md:w-40"
              />
            </div>

           <div className="flex flex-col gap-3">
  <div>
    <p className="text-sm font-semibold text-gray-800 mt-5">
      Download the Daily Shopping
    </p>
    <p className="text-xs text-gray-500">
      Scan the QR code to download
    </p>
  </div>

  <div className="flex gap-2 mt-2">
    <Link>
      <img
        src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
        alt="App Store"
        className="h-10 md:h-12"
      />
    </Link>
    <Link>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
        alt="Google Play"
        className="h-10 md:h-12"
      />
    </Link>
  </div>
</div>

          </div>
        </div>
      </div>

      {/* ================= CATEGORY SECTION ================= */}

      {/* MOBILE: Slider (3 items + arrows) */}
  {/* MOBILE: Auto running categories */}

{/* MOBILE AUTO RUNNING CATEGORY */}
       <h3 className="mt-3 text-md font-bold block md:hidden">All Category</h3>
<div className="md:hidden bg-white py-3">
  {/* Horizontal scroll container */}
  <div className="flex gap-2 px-2 overflow-x-auto scrollbar-hide">
    {categories.map((item, i) => (
      <div
        key={i}
        className="
          flex flex-col items-center
          min-w-[20%]  /* 5 items per row */
          text-center
          shrink-0
        "
      >
        {/* Icon */}
        <div
          className="
            w-12 h-12
            rounded-full
            bg-gray-100
            flex items-center justify-center
          "
        >
          <img
            src={item.img}
            alt={item.name}
            className="w-7 h-7 object-contain"
          />
        </div>

        {/* Text - split into 2 lines if needed */}
        <span className="mt-1 text-[11px] leading-snug text-gray-700 break-words text-center">
          {item.name.split(" & ").map((line, idx) => (
            <span key={idx} className="block">
              {line}
            </span>
          ))}
        </span>
      </div>
    ))}
  </div>
</div>







      {/* DESKTOP: Normal grid */}
       <h3 className="mt-3 text-xl font-bold hidden md:block">All Category</h3>
     
   <div
      ref={containerRef}
      className="hidden md:flex gap-3 mt-3 overflow-x-auto scrollbar-hide"
    >
      {categories.map((item, i) => (
        <div
          key={i}
          className="flex items-center  gap-2 border rounded-full px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer flex-shrink-0"
        >
          <img
            src={item.img}
            alt={item.name}
            className="w-5 h-5 rounded-full"
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
    </div>
  );
}
