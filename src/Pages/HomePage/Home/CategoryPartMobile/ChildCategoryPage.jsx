import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ChildCategoryPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const children = location.state?.children || [];
  const [selectedChild, setSelectedChild] = useState(children[0]);

  const [allProducts, setAllProducts] = useState([]);
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [expanded, setExpanded] = useState(false);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://dailyshopping-backend.onrender.com/api/products");
        setAllProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Filter and shuffle products for selected child category
  useEffect(() => {
    if (!selectedChild || allProducts.length === 0) return;
    const filtered = allProducts.filter(
      (p) => p.childcategoryName === selectedChild.name
    );

    const shuffleArray = (arr) => {
      let array = [...arr];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    setShuffledProducts(shuffleArray(filtered));
  }, [selectedChild, allProducts]);

 
  

  

  const toggleSeeProducts = () => {
    if (expanded) {
      setVisibleCount(6);
    } else {
      setVisibleCount(Math.min(visibleCount + 5, shuffledProducts.length));
    }
    setExpanded(!expanded);
  };

  return (
    <div className="p-4  md:mb-32">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-green-600 font-semibold mb-4 flex items-center"
      >
        ← Back
      </button>

      {/* Page Title */}
      <h2 className="font-semibold text-gray-800 mb-3 text-lg border-b border-gray-200 pb-1">
        {name}
      </h2>

      {/* Scrollable Top Bar */}
      <div className="flex overflow-x-auto space-x-4 pb-3 mb-3 scrollbar-hide">
        {children.map((child, index) => (
          <button
            key={index}
            onClick={() => setSelectedChild(child)}
            className={`flex flex-col items-center min-w-[70px] rounded-lg p-2 transition-all duration-300 ${
              selectedChild?.name === child.name
                ? "bg-green-50 border border-green-400"
                : "bg-white border border-gray-200"
            }`}
          >
            <img
              src={child.image}
              alt={child.name}
              className="w-10 h-10 object-contain mb-1"
            />
            <p className="text-[11px] font-medium text-gray-700 text-center">
              {child.name}
            </p>
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="overflow-hidden w-full -mt-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {shuffledProducts.slice(0, visibleCount).map((product) => {
            return (
               <Link
                   to={`/productdetails/microsoft-xbox-wireless-controller-electric-volt`}
                   key={`${product._id}`} // ensure unique key
                   className="group overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col bg-white rounded-xl"
                 >
                   {/* Image + Discount Badge */}
                   <div className="relative w-full h-44 overflow-hidden rounded-t-xl">
                     <img
                       src={product.images?.[0]}
                       alt={product.title}
                       className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                     />
                     <div className="absolute top-2 left-2 bg-red-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                       {product.discount || 35}%
                     </div>
                   </div>
             
                   {/* Product Info */}
                   <div className="p-2 flex-grow flex flex-col justify-between">
                     <p className="text-sm font-semibold text-gray-800 truncate">{product.title}</p>
             
                     <div className="flex items-center gap-2 my-1">
                       <span className="text-red-600 font-bold text-base">৳{product.ProductPrice}</span>
                       <span className="line-through text-gray-400 text-xs">৳{product.oldPrice}</span>
                       <span className="text-red-500 text-xs">-{product.discount}%</span>
                     </div>
             
                     {/* Rating + Sold */}
                     <div className="flex items-center justify-between text-[11px] text-gray-500">
                       <div className="flex items-center gap-1">
                         <svg viewBox="0 0 24 24" className="w-4 h-4 fill-yellow-400">
                           <path d="M12 2l2.9 6.6L22 9.2l-5 4.9L18.3 22 12 18.3 5.7 22 7 14.1 2 9.2l7.1-.6L12 2z" />
                         </svg>
                         <span className="text-gray-700 text-sm">4.9</span>
                         <span className="text-sm ms-2 font-medium">1k+ sold</span>
                       </div>
                     </div>
             
                     {/* Location */}
                     <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium mt-1">
                       <img
                         className="h-4 w-4"
                         src="https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/img/official_store/badge_os.png~tplv-zr7vqa5nfb-image.image"
                         alt="Official Store"
                       />
                       <span>Apple Official Store</span>
                     </div>
                   </div>
                 </Link>
            );
          })}
        </div>
      </div>

      {/* Show More / Hide Button */}
      {visibleCount < shuffledProducts.length || expanded ? (
        <div className="flex justify-center mt-6">
          <button
            onClick={toggleSeeProducts}
            className="bg-gradient-to-r from-[#8CD005] to-[#19745B] text-white font-semibold px-6 py-2 rounded shadow hover:opacity-90 transition"
          >
            {expanded ? "Hide Products" : "See Products"}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ChildCategoryPage;
