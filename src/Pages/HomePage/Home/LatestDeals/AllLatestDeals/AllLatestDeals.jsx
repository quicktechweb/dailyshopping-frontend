
import {  useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ScrollToTop from "../../../ScrollToTop/ScrollToTop";

const AllLatestDeals = () => {
  const [products, setProducts] = useState([]);
  const [couponData, setCouponData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12); // initial products to show


  // Fetch top-selling products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://serverluckyshop.luckyshop.com.bd/api/products");
        const topselling = res.data.filter((p) => p.type === "deals");
        setProducts(topselling);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  // Fetch coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get("https://serverluckyshop.luckyshop.com.bd/api/coupons");
        if (res.data.success) setCouponData(res.data.coupons);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCoupons();
  }, []);

  // Helper: get latest round for a product
  const getLatestRound = (productId) => {
    const productCoupons = couponData.filter((c) => c.productId === productId);
    if (!productCoupons.length) return 1;
    return Math.max(...productCoupons.map((c) => c.round || 1));
  };

  // Helper: calculate sold / remaining
  const getStats = (product) => {
    const totalcupon = product.totalcupon || 0;
    const latestRound = getLatestRound(product._id);
    const sold = couponData.filter(
      (c) => c.productId === product._id && c.round === latestRound
    ).length;
    const remaining = Math.max(totalcupon - sold, 0);
    return { sold, totalcupon, remaining };
  };

  // Add product to cart


  // Shuffle products for display
  const shuffledProducts = [...products].sort(() => Math.random() - 0.5);

  // Toggle see more/less
  const toggleSeeProducts = () => {
    setExpanded(!expanded);
    setVisibleCount(expanded ? 12 : products.length);
  };

  return (
    <div className="bg-white py-3 px-4 max-w-[1280px] md:max-w-[1380px] sm:max-w-[95%] mx-auto lg:px-24 relative">
      <ScrollToTop />
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-left text-lg sm:text-xl md:text-2xl font-bold mt-10 leading-snug">
    Latest Deals
  </h2>
      </div>

      {/* Products Grid */}
      <div className="overflow-hidden w-full mt-5">
        <div className="grid grid-cols-2 mt-2 ms-2 me-2 md:grid-cols-6 gap-2 mb-10 items-start transition-transform duration-700 ease-in-out">
          {shuffledProducts.slice(0, visibleCount).map((product) => {
            const { sold, totalcupon, remaining } = getStats(product);
            return (
              <Link
                to={`/productdetails/${encodeURIComponent(product.title)}`}
                key={product._id}
                className="group rounded-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col"
              >
                <div className="relative w-full h-44 bg-white overflow-hidden">
                  <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-[#19745B] text-white font-semibold px-2 py-1 rounded-full shadow">
                    -{product.discount || 0}%
                  </div>
                </div>

                <div className="p-2 flex-grow">
                  <div className="flex gap-1 mb-1 text-xs font-semibold">
                    <span className="bg-yellow-300 text-black px-1 rounded">Choice</span>
                    <span className="bg-red-500 text-white px-1 rounded">Sale</span>
                  </div>

                  <p className="text-sm font-medium text-gray-700 truncate">{product.title}</p>

                  <div className="flex items-center gap-2">
                    <p className="text-red-600 font-bold">
                      <span className="price-container">
                        <span className="main-price">
                          <span className="symbol">৳</span>
                          <span className="quicktectaka">{product.ProductPrice}</span>
                        </span>
                      </span>
                    </p>
                    <p className="line-through text-gray-400 text-xs">৳{product.oldPrice}</p>
                    <p className="text-red-500 text-xs">-{product.discount}%</p>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                    <div
                      className="h-1 rounded-full bg-[#19745B] transition-all duration-500"
                      style={{ width: `${(sold / (totalcupon || 1)) * 100}%` }}
                    ></div>
                  </div>

                   <div className="mt-2 w-full flex justify-between items-center text-center gap-1">
                      <div className="flex flex-col items-center flex-1">
                        <span className="text-sm font-bold text-green-600">{product?.stats?.sold}</span>
                        <span className="text-[11px] text-gray-500">Sold</span>
                      </div>
                      <div className="w-px h-8 bg-gray-200"></div>
                      <div className="flex flex-col items-center flex-1">
                        <span className="text-sm font-bold text-yellow-600">{product?.stats?.totalcupon}</span>
                        <span className="text-[11px] text-gray-500">Coupon</span>
                      </div>
                      <div className="w-px h-8 bg-gray-200"></div>
                      <div className="flex flex-col items-center flex-1">
                        <span className="text-sm font-bold text-gray-800">{product?.stats?.remaining}</span>
                        <span className="text-[11px] text-gray-500">Remaining</span>
                      </div>
                    </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Toggle Button */}
      {visibleCount < products.length ? (
        <div className="flex justify-center">
          <button
            onClick={toggleSeeProducts}
            className="bg-gradient-to-r from-[#8CD005] to-[#19745B] text-white font-semibold px-6 py-2 rounded shadow hover:opacity-90 transition"
          >
            {expanded ? "Hide Products" : "See Products"}
          </button>
        </div>
      ) : (
        <div className="flex justify-center"></div>
      )}
    </div>
  );
};

export default AllLatestDeals;
