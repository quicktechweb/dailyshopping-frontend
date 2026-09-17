import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function PopularCategory() {
  // 🔹 Category — এখন backend থেকে আসবে
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [section, setSection] = useState(null);
  const [loadingSection, setLoadingSection] = useState(true);

  // 🔹 Section fetch
  useEffect(() => {
    const fetchSection = async () => {
      try {
        const res = await axios.get(`https://dailyshopping-backend.onrender.com/api/popular/section`);
        setSection(res.data.section || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingSection(false);
      }
    };
    fetchSection();
  }, []);

  // 🔹 Category fetch
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `https://dailyshopping-backend.onrender.com/api/products/all-categories-list`
        );
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  /* Mobile auto scroll */
  const mobileRef = useRef(null);
  useEffect(() => {
    const container = mobileRef.current;
    if (!container || !categories.length) return;

    let scrollAmount = 0;
    let rafId;
    const speed = 0.4;

    const autoScroll = () => {
      scrollAmount += speed;
      container.scrollLeft = scrollAmount;
      if (scrollAmount >= container.scrollWidth / 2) scrollAmount = 0;
      rafId = requestAnimationFrame(autoScroll);
    };
    rafId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(rafId);
  }, [categories]);

  /* Desktop auto scroll */
  const containerRef = useRef(null);
  const scrollRef = useRef(0);
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !categories.length) return;

    let animationFrameId;
    const speed = 0.5;

    const step = () => {
      if (!container) return;
      scrollRef.current += speed;
      if (scrollRef.current > container.scrollWidth - container.clientWidth) {
        scrollRef.current = 0;
      }
      container.scrollLeft = scrollRef.current;
      animationFrameId = requestAnimationFrame(step);
    };
    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [categories]);

  return (
    <div className="max-w-[1220px] mx-auto bg-white rounded-xl shadow-md p-4 md:p-6 md:mb-7 mb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-4">
        <h2 className="text-lg md:text-2xl font-bold md:block hidden">
          {section?.sectionTitle || "Popular Category"}
        </h2>

        <div className="md:flex-1 md:flex md:justify-center md:ms-32 ms-0 md:block hidden">
          <span className="font-bold md:text-xl mr-1">Download</span>
          <Link
            to={section?.downloadHeadingLink || "/"}
            className="text-green-600 font-medium text-xl"
          >
            {section?.downloadHeadingText || "Daily Shopping App"}
          </Link>
        </div>
      </div>

      {/* Main Content — Dynamic */}
      {loadingSection ? (
        <div className="flex flex-col md:flex-row gap-4 -mt-10 md:mt-0">
          <div className="md:w-1/2 h-[180px] rounded-lg bg-gray-100 animate-pulse md:block hidden" />
          <div className="w-full md:w-[560px] h-[180px] rounded-xl bg-gray-100 animate-pulse hidden md:block" />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4 -mt-10 md:mt-0">
          {/* Left Banner */}
          {section?.bannerImage && (
            <div className="md:w-1/2 rounded-lg overflow-hidden md:block hidden">
              <Link to={section.bannerLink || "/"}>
                <img
                  src={section.bannerImage}
                  alt="Promo"
                  className="w-full h-auto md:h-[180px] object-cover"
                />
              </Link>
            </div>
          )}

          {/* Download Card */}
          <div className="flex flex-col w-full md:w-[560px] md:h-[180px] bg-white shadow-lg rounded-xl p-4 hidden md:block">
            <div className="flex gap-3">
              {section?.qrImage && (
                <div className="w-[120px] md:w-[180px] flex items-center justify-center">
                  <img src={section.qrImage} alt="QR" className="w-28 md:w-40" />
                </div>
              )}

              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-800 mt-5">
                    {section?.downloadTitle}
                  </p>
                  <p className="text-xs text-gray-500">{section?.downloadSubtitle}</p>
                </div>

                <div className="flex gap-2 mt-2">
                  {section?.appStoreImage && (
                    <a href={section.appStoreLink || "#"} target="_blank" rel="noreferrer">
                      <img
                        src={section.appStoreImage}
                        alt="App Store"
                        className="h-10 md:h-12"
                      />
                    </a>
                  )}
                  {section?.playStoreImage && (
                    <a href={section.playStoreLink || "#"} target="_blank" rel="noreferrer">
                      <img
                        src={section.playStoreImage}
                        alt="Google Play"
                        className="h-10 md:h-12"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= CATEGORY SECTION — Dynamic ================= */}

     {loadingCategories ? (
  <div className="mt-4 flex gap-2 overflow-hidden">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="w-12 h-12 rounded-full bg-gray-100 animate-pulse shrink-0" />
    ))}
  </div>
) : (
  <>
    {/* MOBILE */}
    <h3 className="mt-3 text-md font-bold block md:hidden">All Category</h3>
    <div className="md:hidden bg-white py-3">
      <div ref={mobileRef} className="flex gap-2 px-2 overflow-x-auto scrollbar-hide">
        {categories.map((item, i) => (
          <Link
            key={i}
            to={`/category/${encodeURIComponent(item.categoryName)}`}
            className="flex flex-col items-center min-w-[20%] text-center shrink-0"
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <img
                src={item.categoryImg}
                alt={item.categoryName}
                className="w-7 h-7 object-contain"
              />
            </div>
            <span className="mt-1 text-[11px] leading-snug text-gray-700 break-words text-center">
              {item.categoryName.split(" & ").map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </span>
          </Link>
        ))}
      </div>
    </div>

    {/* DESKTOP */}
    <h3 className="mt-3 text-xl font-bold hidden md:block">All Category</h3>
    <div
      ref={containerRef}
      className="hidden md:flex gap-3 mt-3 overflow-x-auto scrollbar-hide"
    >
      {categories.map((item, i) => (
        <Link
          key={i}
          to={`/category/${encodeURIComponent(item.categoryName)}`}
          className="flex items-center gap-2 border rounded-full px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer flex-shrink-0"
        >
          <img
            src={item.categoryImg}
            alt={item.categoryName}
            className="w-5 h-5 rounded-full"
          />
          <span>{item.categoryName}</span>
        </Link>
      ))}
    </div>
  </>
)}
    </div>
  );
}