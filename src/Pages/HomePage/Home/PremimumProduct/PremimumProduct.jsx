import { useState, useEffect,  useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
// import CouponModal from "./CouponModal/CouponModal";
import axios from "axios";
import Skeleton from "../../../Shared/Skeleton/Skeleton";

const PremimumProduct = () => {
  const [products, setProducts] = useState([]);
  const [couponData, setCouponData] = useState([]);
  const [itemsPerView, setItemsPerView] = useState(6);
  // const [cart, setCart] = useContext(CartContext);
  // const [couponOpen, setCouponOpen] = useState(false);
  // const [selectedProduct, setSelectedProduct] = useState(null);
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);


  // 🔹 Fetch topselling products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://serverluckyshop.luckyshop.com.bd/api/products");
        const premium = res.data.filter((p) => p.type === "premium");
        setProducts(premium);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 🔹 Fetch coupons
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

  // 🔹 Helper: get latest round for a product
  const getLatestRound = (productId) => {
    const productCoupons = couponData.filter((c) => c.productId === productId);
    if (!productCoupons.length) return 1;
    return Math.max(...productCoupons.map((c) => c.round || 1));
  };

  // 🔹 Helper: calculate sold / remaining
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


  // const handleAddToCart = (product) => {
  //   const exists = cart.find((pd) => pd._id === product._id);
  //   let newCart = [];

  //   if (exists) {
  //     const rest = cart.filter((pd) => pd._id !== product._id);
  //     newCart = [...rest, { ...exists, quantity: exists.quantity + 1 }];
  //   } else {
  //     newCart = [...cart, { ...product, quantity: 1 }];
  //   }

  //   localStorage.setItem("productCart", JSON.stringify(newCart));
  //   setCart(newCart);
  //   Swal.fire("✅ Product added!");
  // };

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerView(2);
      else if (width < 1024) setItemsPerView(4);
      else setItemsPerView(6);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 8000);
    return () => clearInterval(interval);
  }, [itemsPerView, products]);

  const nextSlide = () =>
    setIndex((prev) => (prev + 1) % products.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + products.length) % products.length);

  const visibleProducts = Array.from({ length: itemsPerView }, (_, i) => {
    if (products.length === 0) return null;
    return products[(index + i) % products.length];
  }).filter(Boolean);

  const skeletons = Array.from({ length: itemsPerView }, (_, i) => (
        <Skeleton
          key={i}
          className="w-1/2 sm:w-1/2 md:w-1/4 lg:w-1/6"
        />
      ));

          const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "-and-")         
    .replace(/[\s\W-]+/g, "-"); 

  return (
    <div className="bg-white py-3 px-4 max-w-[1280px] md:max-w-[1380px] sm:max-w-[95%] mx-auto lg:px-20 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-left text-md sm:text-xl md:text-xl font-bold leading-snug">
          PREMIUM PRODUCTS FROM WORLDWIDE STORES IN{" "}
          <span className="text-[#19745B] ">Bangladesh</span>
        </h2>
        <Link to="/allpremiumproduct">
          <button className="bg-gradient-to-r from-[#8CD005] to-[#19745B] text-white text-sm font-semibold px-4 py-2 rounded shadow hover:opacity-90 transition">
            View All
          </button>
        </Link>
      </div>

      <div className="relative flex items-center">
        <button
          onClick={prevSlide}
          className="absolute -left-4 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100"
        >
          <MdChevronLeft className="text-2xl text-gray-700" />
        </button>

        <div className="overflow-hidden w-full">
          <div
            ref={containerRef}
            className="items-start gap-1 ms-2 me-2 mb-4 flex transition-transform duration-700 ease-in-out"
          >
            {loading
              ? skeletons
              :visibleProducts.map((product) => {
              const { sold, totalcupon, remaining } = getStats(product);

              return (
                <Link
                to={`/productdetails/${slugify(product.title)}`}
                  key={product._id}
                  className="flex-shrink-0 px-1 group rounded-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col mt-3 w-1/2 sm:w-1/2 md:w-1/4 lg:w-1/6"
                >
                  <div className="relative w-full h-44 bg-white overflow-hidden">
                    <img
                      src={product.images?.[0] || product.categoryImg}
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

                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className="h-1 rounded-full bg-[#19745B] transition-all duration-500"
                        style={{ width: totalcupon > 0 ? `${(sold / totalcupon) * 100}%` : "0%" }}
                      />
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

                    {/* <div className="overflow-hidden max-h-0 mb-2 group-hover:max-h-28 transition-all duration-500 px-2 flex flex-col gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedProduct(product);
                          setCouponOpen(true);
                        }}
                        className="w-full bg-[#19745B] text-white text-xs font-semibold py-2 rounded shadow hover:opacity-90 transition"
                      >
                        Buy Coupon
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                        className="w-full bg-[#19745B] text-white text-xs font-semibold py-2 rounded shadow hover:opacity-90 transition"
                      >
                        Add to Cart
                      </button>
                    </div> */}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute -right-4 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100"
        >
          <MdChevronRight className="text-2xl text-gray-700" />
        </button>
      </div>

      {/* <CouponModal
        open={couponOpen}
        product={selectedProduct}
        onClose={() => setCouponOpen(false)}
        onSuccess={(purchase) => console.log("✅ Coupon saved:", purchase)}
      /> */}
    </div>
  );
};

export default PremimumProduct;

 