import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LatestProduct = () => {
  const [visibleCount, setVisibleCount] = useState(12); // initial 12
  const [products, setProducts] = useState([]);
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [couponData, setCouponData] = useState([]);
  const [expanded, setExpanded] = useState(false);

  // 🔹 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://dailyshopping-backend.onrender.com/api/products");
        const fetched = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];
        setProducts(fetched);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  // 🔹 Shuffle products
  useEffect(() => {
    if (!products.length) return;

    const shuffleArray = (arr) => {
      let array = [...arr];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    setShuffledProducts(shuffleArray(products));
  }, [products]);

  // 🔹 Fetch coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get("https://dailyshopping-backend.onrender.com/api/coupons");
        if (res.data.success) setCouponData(res.data.coupons);
      } catch (err) {
        console.error("❌ Error fetching coupons:", err);
      }
    };
    fetchCoupons();
  }, []);

  // 🔹 Helper functions
  const getLatestRound = (productId) => {
    const productCoupons = couponData.filter((c) => c.productId === productId);
    if (!productCoupons.length) return 1;
    return Math.max(...productCoupons.map((c) => c.round || 1));
  };

  const getStats = (product) => {
  const totalcupon = product.totalcupon || 0;
  const latestRound = getLatestRound(product._id);

  // 🔹 sold quantity যোগ করে বের করা
  const sold = couponData
    .filter((c) => c.productId === product._id && c.round === latestRound)
    .reduce((sum, c) => sum + (c.quantity || 0), 0);

  const remaining = Math.max(totalcupon - sold, 0);

  return { sold, totalcupon, remaining };
};

  // 🔹 Show more products in increments of 12
  const handleSeeMore = () => {
    const nextCount = visibleCount + 12;
    setVisibleCount(nextCount > shuffledProducts.length ? shuffledProducts.length : nextCount);
    setExpanded(true);
  };

  // 🔹 Optional: Hide extra products
  const handleHide = () => {
    setVisibleCount(12);
    setExpanded(false);
  };

   const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "-and-")          // replace & with 'and'
    .replace(/[\s\W-]+/g, "-"); 

  return (
    <div className="bg-white py-3 px-4 max-w-[1280px] md:max-w-[1380px]  sm:max-w-[95%] mx-auto lg:px-20 relative">
     <div className="flex justify-between items-center mb-8">
  {/* Tabs */}
 <div className="relative ">
  <div className="flex items-center gap-3 rounded-full bg-gray-50/80 backdrop-blur-md p-2 ">
    {["For You", "Latest Products", "Top Products,", "Mall"].map((tab, index) => {
      const isActive = index === 1;

      return (
        <button
          key={tab}
          className={`relative px-6 py-2 text-xs md:text-base font-semibold rounded-full transition-all duration-300 ease-out
            ${
              isActive
                ? "text-white bg-gradient-to-r from-green-500 to-green-600 shadow-[0_6px_20px_rgba(34,197,94,0.45)] scale-[1.03]"
                : "text-gray-600 text-xs bg-white hover:bg-gray-100 hover:text-green-600 shadow-sm"
            }
          `}
        >
          {tab}

          {/* Active glow ring */}
          {isActive && (
            <span className="absolute inset-0 rounded-full ring-2 ring-green-400/40 animate-pulse"></span>
          )}
        </button>
      );
    })}
  </div>
</div>




  {/* Optional View All Button */}
  {/* <Link to="/alllatestproducts">
    <button className="hidden md:inline-block bg-gradient-to-r from-green-500 to-green-700 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-lg hover:scale-105 hover:opacity-95 transition transform">
      View All
    </button>
  </Link> */}
</div>


      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-10">
        {shuffledProducts.slice(0, visibleCount).map((product) => {
         
          return (
            <Link
              to={`/productdetails/${slugify(product.title)}`}
              key={product._id}
              className="group  overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col"
            >
           <div className="relative w-full h-40 bg-white overflow-hidden rounded-lg">
  
  {/* Discount Badge */}
  <div className="absolute w-10 h-8 top-2 left-1 z-20">
    <div className="relative bg-[#FF4D5A]  text-white font-extrabold -ms-4 text-sm px-5 py-1 rounded-r-full rounded-l-lg shadow-lg">
      {product.discount || 35}%
      <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#FF4D5A] rounded-full"></span>
    </div>
  </div>

  <img
    src={product.images?.[0]}
    alt={product.title}
    className="w-full h-full object-cover"
  />
</div>


              <div className="p-2 flex-grow">
                <div className="flex gap-1 mb-1 text-xs font-semibold">
                  {/* <span className="bg-yellow-300 text-black px-1 rounded">Choice</span>
                  <span className="bg-red-500 text-white px-1 rounded">Sale</span> */}
                </div>

                <p className="text-sm font-medium text-gray-700 truncate">{product.title}</p>

                <div className="flex items-center gap-2">
                   <p className="text-red-600 font-bold">   
                     <span className="price-container">
                        <span className="main-price">
                          <span className="symbol">৳</span>
                          <span className="quicktectaka">
                            {product.ProductPrice}
                          </span>
                        </span>
                      </span>
                      </p>
                    <p className="line-through text-gray-400 text-xs">
                      ৳{product.oldPrice}
                    </p>
                    <p className="text-red-500 text-xs">
                      -{product.discount}%
                    </p>
                  </div>

             {/* Rating + Sold */}
<div className="flex items-center justify-between mt-1 text-[11px] text-gray-500">
  <div className="flex items-center gap-[3px]">
    {/* Star Icon */}
    <svg
      viewBox="0 0 24 24"
      className="w-[16px] h-[16px] fill-yellow-400"
    >
      <path d="M12 2l2.9 6.6L22 9.2l-5 4.9L18.3 22 12 18.3 5.7 22 7 14.1 2 9.2l7.1-.6L12 2z" />
    </svg>

    <span className="text-gray-700 text-sm ">4.9</span> <span className="text-sm ms-3 font-medium">1rb+ terjual</span>
  </div>

  
</div>


{/* Location */}
<div className="flex items-center gap-[3px] text-[11px] text-gray-500 font-medium mt-[2px]">
  {/* Location Icon */}
  <img className="h-4 w-4" src="https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/img/official_store/badge_os.png~tplv-zr7vqa5nfb-image.image"/>

  <span>Kota Administrasi Jakarta</span>
</div>

             
              </div>
            </Link>
          );
        })}
      </div>

      {/* See More / Hide Button */}
      {/* {visibleCount < shuffledProducts.length ? (
        <div className="flex justify-center">
          <button
            onClick={handleSeeMore}
            className="bg-gradient-to-r from-[#8CD005] to-[#19745B] text-white font-semibold px-6 py-2 rounded shadow hover:opacity-90 transition"
          >
            See Products
          </button>
        </div>
      ) : expanded ? (
        <div className="flex justify-center">
          <button
            onClick={handleHide}
            className="bg-gray-400 text-white font-semibold px-6 py-2 rounded shadow hover:opacity-90 transition"
          >
            Hide Products
          </button>
        </div>
      ) : null} */}
    </div>
  );
};

export default LatestProduct;











import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductSkeleton from "../../../Shared/ProductSkeleton/ProductSkeleton";

const LatestProduct = () => {
  const [products, setProducts] = useState([]);
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [visibleCount] = useState(12);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH PRODUCTS ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://dailyshopping-backend.onrender.com/api/products"
        );
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  /* ---------------- SHUFFLE ---------------- */
  useEffect(() => {
    if (!products.length) return;
    setShuffledProducts([...products].sort(() => Math.random() - 0.5));
    setLoading(false);
  }, [products]);

  return (
    <>
      {/* 🔹 TOKOPEDIA STYLE STICKY TABS */}
      <div
        className="
          sticky
          top-[50px] md:top-[114px]
          z-40
          bg-white
          mb-3
        "
      >
        <div className="max-w-[1300px] mx-auto px-2 sm:px-4">
          <div className="flex ms-3 md:ms-10 items-center gap-2 sm:gap-4  h-10 sm:h-10 font-semibold overflow-x-auto whitespace-nowrap scrollbar-hide">
            <button className="relative text-green-600 text-md sm:text-sm shrink-0">
              For Daily
              <span className="absolute -bottom-[6px] sm:-bottom-[8px] left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-green-500" />
            </button>

            <div className="flex items-center h-6 sm:h-10 w-16 sm:w-24 shrink-0">
              <img
                src="https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/img/ndZFpx/2025/9/15/f2b4d9cf-fbcd-4ac7-a205-5538a2e85c2b.png~tplv-zr7vqa5nfb-resize-jpeg:250:0.png"
                className="object-contain"
                alt=""
              />
            </div>

            <button className="text-gray-500 hover:text-gray-800 text-md sm:text-md shrink-0">
              Latest Product
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- PRODUCT GRID ---------------- */}
      <div className="bg-white py-3 px-4 max-w-[1280px] md:max-w-[1380px] sm:max-w-[95%] mx-auto lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-10">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : shuffledProducts.slice(0, visibleCount).map((product) => (
                <Link
                  to={`/productdetails/${product._id}`}
                  key={product._id}
                  className="group hover:shadow-lg shadow transition transform hover:-translate-y-1 flex flex-col bg-white rounded-xl"
                >
                  <div className="relative w-full h-44 rounded-t-xl overflow-hidden">
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-2 flex flex-col justify-between flex-grow">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {product.title}
                    </p>

                    <div className="flex items-center gap-2 my-1">
                      <span className="text-red-600 font-bold">
                        ৳{product.ProductPrice}
                      </span>
                      <span className="line-through text-gray-400 text-xs">
                        ৳{product.oldPrice}
                      </span>
                    </div>

                    <span className="text-xs text-gray-500">
                      ⭐ 4.9 · 1k+ sold
                    </span>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </>
  );
};

export default LatestProduct;





import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductSkeleton from "../../../Shared/ProductSkeleton/ProductSkeleton";

const LatestProduct = () => {
  const [visibleCount, setVisibleCount] = useState(12); // initial 12
  const [products, setProducts] = useState([]);
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [couponData, setCouponData] = useState([]);
  const [expanded, setExpanded] = useState(false);

  // 🔹 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://dailyshopping-backend.onrender.com/api/products");
        const fetched = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];
        setProducts(fetched);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const [loading, setLoading] = useState(true);

// example
useEffect(() => {
  if (shuffledProducts.length > 0) {
    setLoading(false);
  }
}, [shuffledProducts]);


  // 🔹 Shuffle products
  useEffect(() => {
    if (!products.length) return;

    const shuffleArray = (arr) => {
      let array = [...arr];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    setShuffledProducts(shuffleArray(products));
  }, [products]);

  // 🔹 Fetch coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get("https://dailyshopping-backend.onrender.com/api/coupons");
        if (res.data.success) setCouponData(res.data.coupons);
      } catch (err) {
        console.error("❌ Error fetching coupons:", err);
      }
    };
    fetchCoupons();
  }, []);

  // 🔹 Helper functions
  const getLatestRound = (productId) => {
    const productCoupons = couponData.filter((c) => c.productId === productId);
    if (!productCoupons.length) return 1;
    return Math.max(...productCoupons.map((c) => c.round || 1));
  };

  const getStats = (product) => {
  const totalcupon = product.totalcupon || 0;
  const latestRound = getLatestRound(product._id);

  // 🔹 sold quantity যোগ করে বের করা
  const sold = couponData
    .filter((c) => c.productId === product._id && c.round === latestRound)
    .reduce((sum, c) => sum + (c.quantity || 0), 0);

  const remaining = Math.max(totalcupon - sold, 0);

  return { sold, totalcupon, remaining };
};

  // 🔹 Show more products in increments of 12
  const handleSeeMore = () => {
    const nextCount = visibleCount + 12;
    setVisibleCount(nextCount > shuffledProducts.length ? shuffledProducts.length : nextCount);
    setExpanded(true);
  };

  // 🔹 Optional: Hide extra products
  const handleHide = () => {
    setVisibleCount(12);
    setExpanded(false);
  };

 const productRef = useRef(null);
const [showTabs, setShowTabs] = useState(false);


 useEffect(() => {
  const navbarHeight = window.innerWidth >= 768 ? 104 : 47;

  const handleScroll = () => {
    if (!productRef.current) return;

    const rect = productRef.current.getBoundingClientRect();

    // 🔑 product section navbar এর নিচে আসলেই show
    if (rect.top <= navbarHeight) {
      setShowTabs(true);
    } else {
      setShowTabs(false);
    }
  };

  handleScroll(); // initial check
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

{loading && (
  <div className="w-full bg-white mb-3">
    <div className="max-w-[1300px] mx-auto px-2 sm:px-4">
      <div className="flex gap-3 h-8 sm:h-10 animate-pulse">
        <div className="w-16 h-4 bg-gray-200 rounded" />
        <div className="w-24 h-4 bg-gray-200 rounded" />
        <div className="w-20 h-4 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
)}

  return (
    <div  ref={productRef}
  className="bg-white py-3 px-4 max-w-[1280px] md:max-w-[1380px] sm:max-w-[95%] mx-auto lg:px-20 relative">
     <div className="flex justify-between items-center mb-8">
  {/* Tabs */}
  <>
      {/* 🔻 Trigger point */}
      <div  />

      {/* 🔹 Tabs */}
    <div
  className={`
    w-full bg-white transition-all duration-300
    ${showTabs
      ? "fixed top-[57px] md:top-[114px] left-0 z-40 opacity-100"
      : "opacity-0 pointer-events-none"
    }
  `}
>
  <div className="max-w-[1300px] mx-auto px-2 sm:px-4">
    <div
      className="
        flex ms-5 md:ms-10 items-center gap-2 sm:gap-4
        h-8 sm:h-10
        font-semibold
        flex-nowrap
        overflow-x-auto
        whitespace-nowrap
        scrollbar-hide
      "
    >
      {/* Active Tab */}
      <button className="relative text-green-600 font-semibold text-xs sm:text-sm shrink-0">
        For Daily
        <span className="absolute -bottom-[6px] sm:-bottom-[8px] left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-green-500" />
      </button>

      {/* Image Tab */}
      <div className="flex items-center h-6 sm:h-8 w-16 sm:w-24 shrink-0">
        <img
          src="https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/img/ndZFpx/2025/9/15/f2b4d9cf-fbcd-4ac7-a205-5538a2e85c2b.png~tplv-zr7vqa5nfb-resize-jpeg:250:0.png"
          className="object-contain"
        />
      </div>

      {/* Inactive Tab */}
      <button className="text-gray-500 hover:text-gray-800 text-xs sm:text-sm shrink-0">
        Latest Product
      </button>
    </div>
  </div>
</div>


      {/* 🔻 Space placeholder (layout jump fix) */}
      {/* {isSticky && <div className="h-14 sm:h-16" />} */}
    </>



  {/* Optional View All Button */}
  {/* <Link to="/alllatestproducts">
    <button className="hidden md:inline-block bg-gradient-to-r from-green-500 to-green-700 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-lg hover:scale-105 hover:opacity-95 transition transform">
      View All
    </button>
  </Link> */}

 
 
</div>

<>
      {/* 🔻 Trigger point */}
      <div />

      {/* 🔹 Tabs */}
      <div
  className={`
    w-full bg-white transition-all -mt-20 mb-3 duration-300
    
  `}
>
  <div className="max-w-[1300px] mx-auto px-2 sm:px-4">
    <div
      className="
        flex ms-5  md:-ms-4 items-center gap-2  sm:gap-4
        h-8 sm:h-10
        font-semibold
        flex-nowrap
        overflow-x-auto
        whitespace-nowrap
        scrollbar-hide
      "
    >
      {/* Active Tab */}
      <button className="relative text-green-600 font-semibold text-xs sm:text-sm shrink-0">
        For Daily
        <span className="absolute -bottom-[6px] sm:-bottom-[8px] left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-green-500" />
      </button>

      {/* Image Tab */}
      <div className="flex items-center h-6 sm:h-8 w-16 sm:w-24 shrink-0">
        <img
          src="https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/img/ndZFpx/2025/9/15/f2b4d9cf-fbcd-4ac7-a205-5538a2e85c2b.png~tplv-zr7vqa5nfb-resize-jpeg:250:0.png"
          className="object-contain"
        />
      </div>

      {/* Inactive Tab */}
      <button className="text-gray-500 hover:text-gray-800 text-xs sm:text-sm shrink-0">
        Latest Product
      </button>
    </div>
  </div>
</div>

      {/* 🔻 Space placeholder (layout jump fix) */}
     
    </>


      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-10 ">
  {loading
    ? Array.from({ length: 12 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))
    : [
        ...shuffledProducts.slice(0, visibleCount),
        ...shuffledProducts.slice(0, visibleCount),
      ].map((product, idx) => (
        <Link
          to={`/productdetails/microsoft-xbox-wireless-controller-electric-volt`}
          key={`${product._id}-${idx}`}
          className="group hover:shadow-lg shadow transition transform hover:-translate-y-1 flex flex-col bg-white rounded-xl"
        >
          {/* IMAGE */}
          <div className="relative w-full h-44 rounded-t-xl">
            <div className="w-full h-full overflow-hidden rounded-t-xl">
              <img
                src={product.images?.[0]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="discount-ribbon">
              <span>{product.discount || 78}%</span>
            </div>
          </div>

          {/* INFO */}
          <div className="p-2 flex-grow flex flex-col justify-between">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {product.title}
            </p>

            <div className="flex items-center gap-2 my-1">
              <span className="text-red-600 font-bold text-base">
                ৳{product.ProductPrice}
              </span>
              <span className="line-through text-gray-400 text-xs">
                ৳{product.oldPrice}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-500">
              <div className="flex items-center gap-1">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-yellow-400">
                  <path d="M12 2l2.9 6.6L22 9.2l-5 4.9L18.3 22 12 18.3 5.7 22 7 14.1 2 9.2l7.1-.6L12 2z" />
                </svg>
                <span className="text-gray-700 text-sm">4.9</span>
                <span className="text-sm ms-2 font-medium">1k+ sold</span>
              </div>
            </div>

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
      ))}
</div>



      {/* See More / Hide Button */}
      {/* {visibleCount < shuffledProducts.length ? (
        <div className="flex justify-center">
          <button
            onClick={handleSeeMore}
            className="bg-gradient-to-r from-[#8CD005] to-[#19745B] text-white font-semibold px-6 py-2 rounded shadow hover:opacity-90 transition"
          >
            See Products
          </button>
        </div>
      ) : expanded ? (
        <div className="flex justify-center">
          <button
            onClick={handleHide}
            className="bg-gray-400 text-white font-semibold px-6 py-2 rounded shadow hover:opacity-90 transition"
          >
            Hide Products
          </button>
        </div>
      ) : null} */}
    </div>
  );
};

export default LatestProduct;


