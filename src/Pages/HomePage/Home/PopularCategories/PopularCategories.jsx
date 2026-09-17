import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ Import Link

const BASE_URL = "http://localhost:5000/api/popularcategory";

const PopularCategories = () => {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // ✅ Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(BASE_URL);
      if (res.data.length > 0) setCategories(res.data[0].categories);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Auto scroll
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let animationFrame;

    const step = () => {
      if (!isDragging && scrollContainer) {
        scrollContainer.scrollLeft += 0.5; // speed
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(step);
    };

    step();
    return () => cancelAnimationFrame(animationFrame);
  }, [isDragging]);

  // ✅ Drag scroll handlers
  const onPointerDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX || e.touches[0].pageX);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    const walk = startX - x;
    scrollRef.current.scrollLeft = scrollLeft + walk;
  };

  const onPointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full py-6 flex justify-center">
      <div className="w-full max-w-[1380px] px-4 sm:px-6 md:px-10 lg:px-20">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          Popular Categories
        </h2>

        <div
          className="relative w-full overflow-hidden cursor-grab"
          ref={scrollRef}
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
        >
          <div className="flex space-x-2 min-w-max">
            {[...categories, ...categories].map((cat, index) => (
              <Link
                key={index}
                to={`/category/${encodeURIComponent(cat.name)}`} // ✅ Link to category page
                className="flex flex-col items-center justify-center min-w-[90px] md:min-w-[120px] bg-white shadow-sm rounded-xl py-4 hover:scale-105 transition-transform duration-300"
              >
                {cat.icon && (
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    className="w-12 h-12 md:w-16 md:h-16 mb-2 object-contain"
                  />
                )}
                <p className="text-xs md:text-sm text-gray-700 text-center">
                  {cat.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
