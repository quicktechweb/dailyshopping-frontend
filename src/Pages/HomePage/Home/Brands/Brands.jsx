import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // 👈 React Router Link

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(7);

  // Fetch brands from API
  const fetchBrands = async () => {
    try {
      const res = await axios.get("https://dailyshopping-backend.onrender.com/api/brands");
      const data = res.data.map((b, i) => ({
        id: b._id || i,
        name: b.brandName || "Unknown",
        img: b.brandImg || "",
        category: b.category || "all", // 👈 save category for routing
      }));
      setBrands(data);
    } catch (err) {
      console.error("Error fetching brands:", err);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerView(5);
      else if (width < 1024) setItemsPerView(6);
      else setItemsPerView(7);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        brands.length === 0 ? 0 : (prevIndex + 1) % brands.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [brands]);

  // Get visible brands with wrapping
  const visibleBrands =
    brands.length > 0
      ? [
          ...brands.slice(currentIndex, currentIndex + itemsPerView),
          ...brands.slice(
            0,
            Math.max(0, currentIndex + itemsPerView - brands.length)
          ),
        ]
      : [];

  return (
    <div className="py-3 md:py-0 px-4 max-w-[1280px] md:max-w-[1380px] sm:max-w-[95%] mb-16 mx-auto lg:px-20">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Hottest Brands</h2>

      <div className="flex gap-4 justify-between items-center overflow-hidden">
        {visibleBrands.map((brand, index) => (
          <Link
            key={brand.id}
            to={`/brand/${encodeURIComponent(brand.name)}`} // 👈 navigate to category
            className={`flex flex-col items-center justify-center transition-transform duration-500 
              ${
                index === Math.floor(itemsPerView / 2)
                  ? "scale-110 rounded-xl"
                  : ""
              } 
              w-1/5 sm:w-1/6 lg:w-1/7 p-1`}
          >
            <img
              src={brand.img}
              alt={brand.name}
              className={`object-contain ${
                index === Math.floor(itemsPerView / 2) ? "h-20" : "h-16"
              } sm:h-20 lg:h-20`}
            />
            {/* <p className="text-sm mt-1 font-medium text-gray-700">
              {brand.name}
            </p> */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Brands;
