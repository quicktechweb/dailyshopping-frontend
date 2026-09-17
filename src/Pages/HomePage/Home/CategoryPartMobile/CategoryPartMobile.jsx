import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../../ScrollToTop/ScrollToTop";
import '@flaticon/flaticon-uicons/css/regular/rounded.css';


const CategoryPartMobile = () => {
  const navigate = useNavigate();

  // ✅ Flaticon class map
  const iconMap = {
    electronics: "fi fi-rr-bolt",
    watches: "fi fi-rr-clock",
    "home & living": "fi fi-rr-home",
     "microwave oven": "fi fi-rr-oven",
    "rice cooker": "fi fi-rr-pot",
    "toys & games": "fi fi-rr-gamepad",
    "baby & kids": "fi fi-rr-baby-carriage",
    "stationery & office supplies": "fi fi-rr-pencil",
    "kitchen & dining": "fi fi-rr-utensils",
    fashion: "fi fi-rr-shopping-bag",
    "health & beauty": "fi fi-rr-heart",
    "home & lifestyle": "fi fi-rr-house-chimney",
    default: "fi fi-rr-apps"
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/products"
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Build category structure
  useEffect(() => {
    const catMap = {};
    products.forEach((product) => {
      if (!product.categoryName) return;

      if (!catMap[product.categoryName]) {
        catMap[product.categoryName] = {
          name: product.categoryName,
          image: product.categoryImg || "",
          sub: [],
        };
      }

      if (product.subcategoryName) {
        let subcat = catMap[product.categoryName].sub.find(
          (s) => s.title === product.subcategoryName
        );

        if (!subcat) {
          subcat = {
            title: product.subcategoryName,
            image: product.subcategoryImg || "",
            children: [],
          };
          catMap[product.categoryName].sub.push(subcat);
        }

        if (product.childcategoryName) {
          const exists = subcat.children.find(
            (c) => c.name === product.childcategoryName
          );

          if (!exists) {
            subcat.children.push({
              name: product.childcategoryName,
              image:
                product.childcategoryImg ||
                product.images?.[0] ||
                "",
            });
          }
        }
      }
    });

    setCategories(Object.values(catMap));
  }, [products]);

  const handleSubClick = (subcategory) => {
    navigate(`/subcategory/${subcategory.title}`, {
      state: { children: subcategory.children },
    });
  };

  return (
    <div className="flex h-screen bg-gray-50 md:hidden md:mt-28 -mt-32">
      <ScrollToTop />

      {/* Left Sidebar */}
      <div className="w-28 bg-gray-100 border-gray-200 overflow-y-auto hide-scrollbar mb-10">
        <div className="py-2 flex flex-col">
          {categories.slice(0, 9).map((cat, index) => {
            const iconClass =
              iconMap[cat.name?.toLowerCase()] || iconMap.default;

            return (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`flex flex-col items-center justify-center px-2 py-3 cursor-pointer transition-all  duration-200 ${
                  activeIndex === index
                    ? "bg-white text-green-500 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {/* Flaticon Icon */}
                <div className="w-8 h-8 mb-1 flex items-center justify-center text-xl">
                  <i className={iconClass}></i>
                </div>

                <span className="text-xs text-center w-full line-clamp-2 -mt-2">
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Subcategories */}
      <div className="flex-1 p-3 overflow-y-auto">
        <h2 className="text-md font-semibold mt-5 mb-3 text-gray-700">
          {categories[activeIndex]?.name || "Select a category"}
        </h2>

        <div className="grid grid-cols-3 gap-3">
          {categories[activeIndex]?.sub.map((sub, i) => (
            <div
              key={i}
              onClick={() => handleSubClick(sub)}
              className="flex flex-col items-center p-4 cursor-pointer hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <div className="w-16 h-16 mb-2 overflow-hidden border border-gray-200 shadow-inner">
                <img
                  src={sub.image || ""}
                  alt={sub.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-[10px] text-gray-800 font-semibold text-center line-clamp-2 leading-tight break-words">
                {sub.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPartMobile;
