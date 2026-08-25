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
          "https://serverluckyshop.luckyshop.com.bd/api/products"
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
          <div className="flex ms-3 md:ms-7 items-center gap-2 sm:gap-4  h-10 sm:h-10 font-semibold overflow-x-auto whitespace-nowrap scrollbar-hide">
            <button className="relative text-green-600 text-md sm:text-sm shrink-0">
              For Daily
              <span className="absolute -bottom-[6px] sm:-bottom-[8px] left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-green-500" />
            </button>

            <div className="flex items-center h-6 sm:h-10 w-16 sm:w-24 shrink-0 ">
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
          className="group hover:shadow-lg  transition transform hover:-translate-y-1 flex flex-col bg-white rounded-xl"
        >
          {/* IMAGE */}
        <div className="relative w-full h-44  shadow-sm">
  <div className="w-full h-full overflow-hidden bg-gray-200">
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

            <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium mt-1 ">
              <img
                className="h-4 w-4 "
                src="https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/img/official_store/badge_os.png~tplv-zr7vqa5nfb-image.image"
                alt="Official Store"
              />
              <span>Apple Official Store</span>
            </div>
          </div>
        </Link>
      ))}
</div>
      </div>
    </>
  );
};

export default LatestProduct;
