"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomeCategoryBanner = () => {
  const [banners, setBanners] = useState({ backgroundData: [], data: [] });
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // mobile carousel index
  const [loading, setLoading] = useState(true);

  const API_URL = "https://serverluckyshop.luckyshop.com.bd/api/categorybanner";

  // ✅ Fetch banners
  const fetchBanners = async () => {
    try {
      const res = await axios.get(API_URL);
      const bannerObj = Array.isArray(res.data) ? res.data[0] : res.data;

      setBanners({
        backgroundData: bannerObj?.backgroundData || [],
        data: bannerObj?.data || [],
      });
    } catch (err) {
      console.error("Failed to fetch banners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Background carousel
  useEffect(() => {
    if (!banners.backgroundData.length) return;
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % (banners.backgroundData?.length || 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [banners]);

  // ✅ Mobile card auto-slide
  useEffect(() => {
    if (!isMobile || !banners.data.length) return;

    const allProducts = [];
    banners.data.forEach((banner) => {
      banner.cardsData.forEach((card) => {
        card.items.forEach((item) => allProducts.push(item));
      });
    });

    const productsByCategory = {};
    allProducts.forEach((product) => {
      const cat = product.category || "Others";
      if (!productsByCategory[cat]) productsByCategory[cat] = [];
      productsByCategory[cat].push(product);
    });

    const categoryCards = Object.keys(productsByCategory)
      .slice(0, 4)
      .map((cat) => ({
        category: cat,
        items: productsByCategory[cat].slice(0, 4),
      }));

    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % categoryCards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile, banners]);

  // ---------- Skeleton Loader ----------
  if (loading) {
    return (
      <div className="relative w-full overflow-hidden flex justify-center">
        <div className="w-full max-w-[1380px] px-4 sm:px-6 md:px-10 lg:px-20">
          {/* Background skeleton */}
          <div className="w-full h-[300px] sm:h-[550px] md:h-[600px] lg:h-[400px] rounded-md bg-gray-200 animate-pulse mb-8"></div>

          {/* Cards skeleton */}
          <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-4"}`}>
            {Array(isMobile ? 1 : 4)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="bg-gray-200 p-4 rounded-lg shadow animate-pulse h-[350px]"
                ></div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  if (!banners.data.length)
    return <div className="p-8 text-center">No banners available</div>;

  // ✅ Prepare products/cards for both mobile and desktop
  const allProducts = [];
  banners.data.forEach((banner) => {
    banner.cardsData.forEach((card) => {
      card.items.forEach((item) => allProducts.push(item));
    });
  });

  const productsByCategory = {};
  allProducts.forEach((product) => {
    const cat = product.category || "Others";
    if (!productsByCategory[cat]) productsByCategory[cat] = [];
    productsByCategory[cat].push(product);
  });

  const categoryCards = Object.keys(productsByCategory)
    .slice(0, 4)
    .map((cat) => ({
      category: cat,
      items: productsByCategory[cat].slice(0, 4),
    }));

  return (
    <div className="relative w-full overflow-hidden flex justify-center bg-white">
      <div className="w-full max-w-[1380px] px-4 sm:px-6 md:px-10 lg:px-20 relative">
        {/* Background Carousel */}
        <div className="relative w-full h-[300px] sm:h-[550px] md:h-[600px] lg:h-[400px] rounded-md overflow-hidden">
          {(banners.backgroundData || []).map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === currentBgIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        </div>

        {/* Cards */}
        <div className="relative z-10 -mt-[7rem] sm:-mt-[8rem] md:-mt-[10rem] lg:-mt-[12rem] px-2 sm:px-4 md:px-8">
          <div className={`grid gap-4 ${isMobile ? "grid-cols-1" : "grid-cols-4"}`}>
            {isMobile
              ? [categoryCards[currentCardIndex]].map((card, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-lg shadow-lg h-[350px] flex flex-col justify-between transition-transform duration-700 ease-in-out"
                  >
                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">{card.category}</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {card.items.map((item, i) => (
                          <Link
                            key={i}
                            to={`/category/${item.category || ""}/${item.subCategory || ""}`}
                            className="text-center"
                          >
                            <img
                              src={item.img}
                              alt={item.title}
                              className="w-full h-24 object-cover rounded"
                            />
                            <p className="text-sm text-left mt-1 text-gray-700">{item.title}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <p className="text-blue-600 mt-3 text-sm cursor-pointer hover:underline">
                      See all
                    </p>
                  </div>
                ))
              : categoryCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-4 rounded-lg shadow-lg h-[365px] flex flex-col justify-between transition-transform duration-700 ease-in-out"
                  >
                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">{card.category}</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {card.items.map((item, i) => (
                          <Link
                            key={i}
                            to={`/category/${item.category || ""}/${item.subCategory || ""}`}
                            className="text-center"
                          >
                            <img
                              src={item.img}
                              alt={item.title}
                              className="w-full h-24 object-cover rounded"
                            />
                            <p className="text-sm text-left mt-1 text-gray-700">{item.title}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <p className="text-blue-600 mt-2 text-sm cursor-pointer hover:underline">
                      See all
                    </p>
                  </div>
                ))}
          </div>
        </div>
        <div className="h-[7rem] sm:h-[8rem] md:h-[1rem] lg:h-[1rem]"></div>
      </div>
    </div>
  );
};

export default HomeCategoryBanner;
