import { useState, useEffect, useContext, useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { CartContext } from "../../../Shared/Context/CartContext";
import Swal from "sweetalert2";
import CouponModal from "./CouponModal/CouponModal";

const products = [
  {
    id: 1,
    title: "24 Medium Square...",
    ProductPrice: 133,
    purchasePrice: 100,
    couponlimit: 5,
    oldPrice: 521,
    discount: "−74%",
    rating: 4.9,
    sold: "3000+ sold",
    shop: "Dollar Express",
    totalcupon: 100,
    remaining: 90,
    solds: 10,
    save: "Save $3.88",
    img: "https://luckyshop.com.bd/storage/media/1755612936_0720751_vivo-topping-whipping-cream-11-ltr.webp",
  },
  {
    id: 2,
    title: "Airs Pro Wireless...",
    ProductPrice: 99,
    purchasePrice: 50,
    oldPrice: 62,
    discount: "−89%",
    rating: 4.3,
    totalcupon: 200,
    couponlimit: 5,
    remaining: 10,
    solds: 190,
    sold: "10,000+ sold",
    shop: "Tech Store",
    save: "New shoppers save $8.63",
    img: "https://luckyshop.com.bd/storage/media/1755612794_0251747_kazi-farms-chicken-strips-250gm.jpeg",
  },
  {
    id: 3,
    title: "60D80D100D Thic...",
    ProductPrice: 226,
    purchasePrice: 150,
    oldPrice: 491,
    couponlimit: 5,
    discount: "−54%",
    rating: 4.9,
    totalcupon: 300,
    remaining: 80,
    solds: 220,
    sold: "2000+ sold",
    shop: "Beauty Hub",
    save: "Save $2.65",
    img: "https://luckyshop.com.bd/storage/media/1755612590_0720823_kelloggs-froot-loops-285gm.webp",
  },
  {
    id: 4,
    title: "Continuous Fire Pistol...",
    ProductPrice: 99,
    purchasePrice: 50,
    oldPrice: 105,
    couponlimit: 5,
    discount: "−90%",
    rating: 5.0,
    totalcupon: 500,
    remaining: 200,
    solds: 300,
    sold: "160 sold",
    shop: "Toys World",
    save: "New shoppers save $9.59",
    img: "https://luckyshop.com.bd/storage/media/1755612458_0732214_mr-noodles-magic-masala-28-pcs-box.webp",
  },
  {
    id: 5,
    title: "Women Short Smart Wallet",
    ProductPrice: 133,
    purchasePrice: 100,
    oldPrice: 539,
    couponlimit: 5,
    discount: "−75%",
    rating: 4.9,
    totalcupon: 100,
    remaining: 40,
    solds: 60,
    sold: "4000+ sold",
    shop: "Dollar Express",
    save: "Save $4.06",
    img: "https://luckyshop.com.bd/storage/media/1755610807_0320334_kidstar-baby-diaper-small-66pcs-3-8-kg.jpeg",
  },
  {
    id: 6,
    title: "Wireless Earbuds Pro",
    ProductPrice: 399,
    purchasePrice: 300,
    oldPrice: 125,
    couponlimit: 5,
    discount: "−68%",
    rating: 4.7,
    totalcupon: 600,
    remaining: 200,
    solds: 300,
    sold: "2500+ sold",
    shop: "Sound Hub",
    save: "Save $8.51",
    img: "https://luckyshop.com.bd/storage/media/1755612590_0720823_kelloggs-froot-loops-285gm.webp",
  },
];

const TopSelling = () => {
  const [itemsPerView, setItemsPerView] = useState(5);
  const [cart, setCart] = useContext(CartContext);
  const [couponOpen, setCouponOpen] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState(null);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  const handleAddToCart = (product) => {
    const exists = cart.find((pd) => pd.id === product.id);
    let newCart = [];

    if (exists) {
      const rest = cart.filter((pd) => pd.id !== product.id);
      const updatedProduct = { ...exists, quantity: exists.quantity + 1 };
      newCart = [...rest, updatedProduct];
    } else {
      const newProduct = { ...product, quantity: 1, purchasePrice: product.purchasePrice };
      newCart = [...cart, newProduct];
    }

    const localCart = newCart.map(({ purchasePrice, ...rest }) => rest);
    localStorage.setItem("productCart", JSON.stringify(localCart));
    setCart(newCart);
    Swal.fire("Success Product!");
  };

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerView(2);
      else if (width < 1024) setItemsPerView(4);
      else setItemsPerView(5);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Auto slide
 useEffect(() => {
     const interval = setInterval(() => nextSlide(), 8000);
     return () => clearInterval(interval);
   }, [itemsPerView]);
 
   const nextSlide = () =>
     setIndex((prev) => (prev + itemsPerView) % products.length);
   const prevSlide = () =>
     setIndex(
       (prev) => (prev - itemsPerView + products.length) % products.length
     );
 
   const visibleProducts = Array.from({ length: itemsPerView }, (_, i) => {
     return products[(index + i) % products.length];
   });
 


  return (
    <div className="bg-white py-3 px-4 max-w-[1280px] md:max-w-[1380px] sm:max-w-[95%] mx-auto lg:px-20 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Top Sellings</h2>
        <Link to="/alltopselling">
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
          <div ref={containerRef} className="items-start gap-1 ms-2 md:me-9 me-2 mb-4  flex transition-transform duration-700 ease-in-out">
            {visibleProducts.map((product) => (
                         <Link
                           to="/productdetails"
                           key={product.id}
                           className="w-1/2   sm:w-1/2 md:w-1/4 lg:w-1/5 flex-shrink-0 px-1 group  bg-white rounded-md overflow-hidden shadow-[0_2px_18px_rgba(0,0,0,0.15)] hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col mt-3"
                         >
                           {/* Product Image */}
                           {/* Product Image */}
                           <div className="relative h-32 w-full flex items-center justify-center bg-white">
                             <img
                               src={product.img}
                               alt={product.title}
                               className="max-h-full w-auto object-contain"
                             />
                             {/* <button className="absolute bottom-2 right-2 bg-gradient-to-r from-[#8CD005] to-[#19745B] p-2 rounded-full shadow hover:opacity-90">
                               <FiShoppingCart className="text-white" />
                             </button> */}
                           </div>
           
                           {/* Product Info */}
                           <div className="p-2 flex-grow">
                             <div className="flex gap-1 mb-1 text-xs font-semibold">
                               <span className="bg-yellow-300 text-black px-1 rounded">
                                 Choice
                               </span>
                               <span className="bg-red-500 text-white px-1 rounded">
                                 Sale
                               </span>
                             </div>
                             <p className="text-sm font-medium text-gray-700 truncate">
                               {product.title}
                             </p>
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
                               <p className="main-symbol line-through text-gray-400 text-xs">
                                 <span className="symbols">৳</span>
                                 <span className="quicktectakas">{product.oldPrice}</span>
                               </p>
           
                               <p className="text-red-500 text-xs">{product.discount}</p>
                             </div>
                             <div className="flex items-center text-xs text-gray-600 mt-1">
                               {/* Progress Bar */}
                               <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                                 <div
                                   className="h-1 rounded-full bg-[#19745B] transition-all duration-500"
                                   style={{
                                     width: `${
                                       (product.solds / product.totalcupon) * 100
                                     }%`,
                                   }}
                                 ></div>
                               </div>
                             </div>
                             <div className="bg-gray-50 rounded-lg p-1 shadow-[0_2px_18px_rgba(0,0,0,0.15)] mt-2 w-full">
                               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                 {/* Sold and Price - side by side on mobile */}
                                 <div className="flex w-full sm:w-2/3 justify-between mb-3 sm:mb-0">
                                   {/* Sold */}
                                   <div className="flex flex-col items-center w-1/2">
                                     <span className="text-xs font-bold text-green-600">
                                       {product.solds} / {product.totalcupon}
                                     </span>
                                     <span className="text-[10px] text-gray-500">
                                       Sold
                                     </span>
                                   </div>
           
                                   {/* Price */}
                                   <div className="flex flex-col items-center w-1/2">
                                     <span className="text-sm font-bold text-yellow-600 ">
                                       ৳500
                                     </span>
                                     <span className="text-[10px] text-gray-500 ">
                                       Coupon
                                     </span>
                                   </div>
                                 </div>
           
                                 {/* Remaining */}
                                 <div className="flex flex-col items-center w-full sm:w-1/3">
                                   <span className="text-xs font-bold text-gray-800">
                                     {product.remaining}
                                   </span>
                                   <span className="text-[10px] text-gray-500">
                                     Remaining
                                   </span>
                                 </div>
                               </div>
                             </div>
                           </div>
           
                           {/* Hidden Buttons */}
                           {/* -------- Hover Buttons -------- */}
                           <div className="overflow-hidden max-h-0 mb-2 group-hover:max-h-28 transition-all duration-500 px-2 flex flex-col gap-2">
                             <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedProduct(product); // 👈 set product
                      setCouponOpen(true); // 👈 open modal
                    }}
                    className="w-full bg-[#19745B] text-white text-xs font-semibold py-2 rounded shadow hover:opacity-90 transition"
                  >
                               Buy Coupon
                             </button>
                            <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation(); // ⛔ stop navigation
                      handleAddToCart(product);
                      console.log("Add to Cart:", product.id);
                    }}
                    className="w-full bg-[#19745B] text-white text-xs font-semibold py-2 rounded shadow hover:opacity-90 transition"
                  >
                               Add to Cart
                             </button>
                           </div>
                         </Link>
                       ))}
          </div>
        </div>

        <button
         onClick={nextSlide}
          className="absolute -right-4 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100"
        >
          <MdChevronRight className="text-2xl text-gray-700" />
        </button>
      </div>

       <CouponModal
              open={couponOpen}
              product={selectedProduct}
              onClose={() => setCouponOpen(false)}
              onSuccess={(purchase) => {
                console.log("✅ Coupon saved to DB:", purchase);
              }}
            />
    </div>
  );
};

export default TopSelling;
