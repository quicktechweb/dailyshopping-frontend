import { useContext, useEffect, useMemo, useState } from "react";
import { ShoppingCart, Minus, Plus, Star,   ChevronRight, ChevronLeft,X, CheckCircle, ShieldCheck, BadgePercent  } from "lucide-react";
import ScrollToTop from "../../ScrollToTop/ScrollToTop";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { CartContext } from "../../../Shared/Context/CartContext";
import CouponModal from "../../Home/TopSelling/CouponModal/CouponModal";
import useAuth from "../../../Hooks/useAuth";
import ReactPixel from "react-facebook-pixel";
import { FiMessageCircle, FiMinus, FiMoreVertical, FiPlus, FiShare2 } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import ChatWidget from "../../../Shared/Chat/ChatWidget";


export default function ProductDetailsPage() {
  const [qty, setQty] = useState(1);
   const [isExpanded, setIsExpanded] = useState(false);
   
   const [selectedProduct, setSelectedProduct] = useState(null);
     const [couponOpen, setCouponOpen] = useState(false);
     const [stats, setStats] = useState({ sold: 0, totalcupon: 0, remaining: 0 });
  const [progress, setProgress] = useState(0);
    const [activeTab, setActiveTab] = useState("detail");
 


  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  



  const [itemsPerView, setItemsPerView] = useState(2);
    const [openModal, setOpenModal] = useState(false);
      const [cart, setCart] = useContext(CartContext);
    

     const [indexs, setIndexs] = useState(0);
     const [showSizes, setShowSizes] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
    const navigate = useNavigate();
    const [chatOpen, setChatOpen] = useState(false);

    const [deliveryCity, setDeliveryCity] = useState("dhaka"); // পরে user address থেকে set করবে

const shippingFee = deliveryCity.toLowerCase().includes("dhaka") ? 100 : 150;


   // ✅ Toggle selection
  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [size]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [color]
    );
  };

  // ✅ Add to Cart Handler
  const handleAddToCart = (product) => {

  // ⭐ Size optional
  const selectedSize = selectedSizes[0] || null;

  // ⭐ Color optional
  const selectedColor = selectedColors[0] || null;

  // Check if same product + same size + same color already exists
  const exists = cart.find(
    (pd) =>
      pd._id === product._id &&
      pd.selectedSize === selectedSize &&
      pd.selectedColor === selectedColor
  );

  let newCart = [];

  if (exists) {
    const rest = cart.filter(
      (pd) =>
        !(
          pd._id === product._id &&
          pd.selectedSize === selectedSize &&
          pd.selectedColor === selectedColor
        )
    );
    newCart = [...rest, { ...exists, quantity: exists.quantity + qty }];
  } else {
    newCart = [
      ...cart,
      {
        ...product,
        quantity: qty,
        selectedSize,  // ⭐ optional
        selectedColor, // ⭐ optional
      },
    ];
  }

  // Save updated cart
  localStorage.setItem("productCart", JSON.stringify(newCart));
  setCart(newCart);

  // Facebook Pixel
  ReactPixel.track("AddToCart", {
    content_name: product.title,
    content_ids: [product._id],
    value: product.ProductPrice,
    currency: "BDT",
    selectedSize,
    selectedColor,
    quantity: qty,
  });

  Swal.fire({
  icon: 'success',
  title: ' Product added to cart!',
  text: `Product has been added successfully.`,
  timer: 2500,
  showConfirmButton: false,
  position: 'top-end',
  toast: true,
});

  return true;
};


  

  const [showColors, setShowColors] = useState(false);
     const visibleCount = 6;
  const [startIndex, setStartIndex] = useState(0);
   const [counts, setCounts] = useState(6); 
  const [expandedvalue, setExpandedvalue] = useState(false); // toggle state

  //  const [cart, setCart] = useContext(CartContext);
   const [shuffledProducts, setShuffledProducts] = useState([]);
  const [couponData, setCouponData] = useState([]);


  useEffect(() => {
      const shuffleArray = (arr) => {
        let array = [...arr];
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };
  
      setShuffledProducts(shuffleArray(products));
    }, []); // only on mount
    
     
    // const toggleSeeProducts = () => {
    //   if (expandedvalue) {
    //     setCounts(counts - 10);
    //   } else {
    //     setCounts(Math.min(counts + 10, shuffledProducts.length));
    //   }
    //   setExpandedvalue(!expandedvalue);
    // };
  
    // const showMore = () => {
    //   setCounts(shuffledProducts.length);
    // };

  // const prevSlides = () => {
  //   if (startIndex > 0) {
  //     setStartIndex((prev) => prev - 1); // ১টা করে পেছনে যাবে
  //   }
  // };

  // const nextSlides = () => {
  //   if (startIndex < thumbs.length - visibleCount) {
  //     setStartIndex((prev) => prev + 1); // ১টা করে সামনে যাবে
  //   }
  // };

  // const visibleThumbs = thumbs.slice(startIndex, startIndex + visibleCount);

 


  // const nextImage = () => setIndexs((prev) => (prev + 1) % images.length);
  // const prevImage = () =>
  //   setIndexs((prev) => (prev - 1 + images.length) % images.length);


   // Detect screen width and adjust items per view
    useEffect(() => {
      const updateItemsPerView = () => {
        if (window.innerWidth < 768) {
          setItemsPerView(2); // Mobile/Tablet
        } else {
          setItemsPerView(5); // Desktop
        }
      };
      updateItemsPerView();
      window.addEventListener("resize", updateItemsPerView);
      return () => window.removeEventListener("resize", updateItemsPerView);
    }, []);
  
   
   // Define prices and discounts
 

 

  const {user}=useAuth()
  console.log(user?.userId)
    const [loved, setLoved] = useState(false);
  const [loading, setLoading] = useState(false);

  // safe user fields
  const name = user?.displayName || "";
 const email = user?.email || "";
const phone = user?.phoneNumber || user?.phone || "";

 const handleWishlist = async () => {
  if (!user) {
    return Swal.fire({
      icon: "info",
      title: "Please sign in",
      text: "You need to sign in to add items to your wishlist.",
      confirmButtonText: "Sign in",
    });
  }

  const userId =  user?.userId;

  if (!userId) {
    return Swal.fire({
      icon: "error",
      title: "User ID missing",
      text: "Could not identify your account. Please try logging in again.",
    });
  }

  const prev = loved;
  setLoved(true);
  setLoading(true);

  const payload = {
    userId, // ✅ এখন userId দিয়ে পাঠানো হচ্ছে
    productId: product._id || product.productid || product.productId,
    productTitle: product.title || product.categoryName || product.brandName || "Product",
    productPrice: product.ProductPrice ?? product.productPrice ?? product.price,
    productImg: product.images?.[0] || product.brandImg || product.childcategoryImg || "",
    productData: product,
    user: { name, email, phone },
    addedAt: new Date().toISOString(),
  };

  try {
    const res = await axios.post(
      "http://localhost:5000/api/wishlist",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    setLoading(false);

    if (res.status === 201 || res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Added to Wishlist",
        text: "This item was added to your wishlist.",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      throw new Error("Unexpected response");
    }
  } catch (err) {
    setLoved(prev);
    setLoading(false);
    console.error("Wishlist error:", err);
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Could not add to wishlist. Try again.",
    });
  }
};


 

  const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "-and-")          // replace & with 'and'
    .replace(/[\s\W-]+/g, "-");   

  const { id } = useParams();
  const { title } = useParams();
  const [product, setProduct] = useState(null);
  const [sellerFollowing, setSellerFollowing] = useState(false);
const [sellerFollowerCount, setSellerFollowerCount] = useState(0);
  const [images, setImages] = useState([]);
  // const [indexs, setIndexs] = useState(0);
  // const [startIndex, setStartIndex] = useState(0);
useEffect(() => {
  if (!product?.sellerId) return;
  const followUserId = user?.uid || user?._id || user?.userId;
  axios
    .get(`http://localhost:5000/api/seller-follow/status`, {
      params: { sellerId: product.sellerId, userId: followUserId },
    })
    .then((res) => {
      setSellerFollowing(res.data.following);
      setSellerFollowerCount(res.data.followerCount);
    })
    .catch((err) => console.error("Seller follow status fetch error:", err));
}, [product?.sellerId, user]);

const handleSellerFollow = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const followUserId = user?.uid || user?._id || user?.userId;
  if (!followUserId) {
    Swal.fire("Login required", "Follow korte hole age login korun", "info");
    return;
  }
  axios
    .post(`http://localhost:5000/api/seller-follow/toggle`, {
      userId: followUserId,
      sellerId: product?.sellerId,
    })
    .then((res) => {
      setSellerFollowing(res.data.following);
      setSellerFollowerCount(res.data.followerCount);
    })
    .catch((err) => console.error("Seller follow toggle error:", err));
};
 
    const nextImage = () => setIndexs((prev) => (prev + 1) % images.length);
    const prevImage = () =>
      setIndexs((prev) => (prev - 1 + images.length) % images.length);
  
    const thumbs = images;
    const visibleThumbs = thumbs.slice(startIndex, startIndex + visibleCount);
  
    const nextSlides = () => {
      if (startIndex + visibleCount < thumbs.length) setStartIndex(startIndex + 1);
    };
    const prevSlides = () => {
      if (startIndex > 0) setStartIndex(startIndex - 1);
    };
  
   
    useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/coupons");
        if (res.data.success) setCouponData(res.data.coupons);
      } catch (err) {
        console.error("❌ Error fetching coupons:", err);
      }
    };
    fetchCoupons();
  }, []);

  // Helper: get latest round for product
  const getLatestRound = (productId) => {
    const rounds = couponData
      .filter((c) => c.productId === productId)
      .map((c) => c.round || 1);
    if (!rounds.length) return 1;
    return Math.max(...rounds);
  };

  // Helper: calculate stats for current round
  const getStats = (product) => {
    if (!product) return { sold: 0, totalcupon: 0, remaining: 0 };

    const totalcupon = product.totalcupon || 0;
    const latestRound = getLatestRound(product._id);

    // Only coupons in the latest round
    const latestCoupons = couponData.filter(
      (c) => c.productId === product._id && c.round === latestRound
    );

    // Sold in current round
    let sold = latestCoupons.length;

    // If sold reaches the limit, reset to 0 for next round
    if (sold >= totalcupon) sold = 0;

    const remaining = Math.max(totalcupon - sold, 0);

    return { sold, totalcupon, remaining };
  };

  // Update stats whenever coupons or product change
  useEffect(() => {
    const newStats = getStats(product);
    setStats(newStats);
    setProgress((newStats.sold / newStats.totalcupon) * 100);
  }, [couponData, product]);


   const [products, setProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
useEffect(() => {
  if (!title) return;

  const loadProduct = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      const all = Array.isArray(res.data) ? res.data : res.data.products || [];

      setProducts(all);

      // local instant match = super fast
      const localMatch = all.find(
        (p) => slugify(p.title, { lower: true, strict: true }) === title
      );

      if (localMatch) {
        setProduct(localMatch);
        setReviews(localMatch.reviews || []);
        setImages(localMatch.images || []);
      } else {
        // fallback: slow api call
        const apiRes = await axios.get(
          `http://localhost:5000/api/products/slug/${title}`
        );
        const data = apiRes.data;

        setProduct(data);
        setReviews(data.reviews || []);
        setImages(data.images || []);
      }

    } catch (err) {
      console.error("Fetch product failed:", err);
    }
  };

  loadProduct();
}, [title]);


useEffect(() => {
  if (!product || !products.length) return;

  const timer = setTimeout(() => {
    const related = products.filter((p) => {
      if (p._id === product._id) return false;

      return (
        p.childcategoryName === product.childcategoryName ||
        p.subcategoryName === product.subcategoryName ||
        p.categoryName === product.categoryName
      );
    });

    setRelatedProducts(related);
    setCounts(Math.min(6, related.length));
  }, 500);

  return () => clearTimeout(timer);
}, [product, products]);


const toggleSeeProducts = () => {
  if (expandedvalue) {
    setCounts(6); // collapse to default
  } else {
    setCounts(relatedProducts.length); // expand to all
  }
  setExpandedvalue(!expandedvalue);
};


const showMore = () => {
  setCounts(relatedProducts.length); // show all related products
  setExpandedvalue(true);            // mark as expanded
};




 useEffect(() => {
  const userId = user?.uid || user?._id || user?.userId;
  if (!product || !userId) return;

  const checkWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/wishlist", {
        params: { userId },
      });

      const items = res?.data;
      const exists = items?.some(
        (item) => item?.productId === (product?._id || product?.productid)
      );

      if (exists) setLoved(true);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  };

  checkWishlist();
}, [product, user]);



  useEffect(() => {
    if (!products.length || !product) return;

   
    const related = products.filter((p) => {
      // Exclude the current product itself
      if (p._id === product._id) return false;

      // Match priority: childcategory > subcategory > category
      if (p.childcategoryName === product.childcategoryName) return true;
      if (p.subcategoryName === product.subcategoryName) return true;
      if (p.categoryName === product.categoryName) return true;

      return false;
    });

    setRelatedProducts(related);
  }, [products, product]);



 

    const [reviews, setReviews] = useState([]);
    // 🔍 Review filter states
const [mediaOnly, setMediaOnly] = useState(false);
const [selectedStars, setSelectedStars] = useState([]);

const toggleStarFilter = (star) => {
  setSelectedStars((prev) =>
    prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
  );
};

   const [imagess, setImagess] = useState([]);
 console.log(imagess)
   // Fetch product details



 
   // Toggle modal
 
    
// ✅ Meta title, description & image set
// useEffect(() => {
//   if (!product) return;

//   document.title = product?.title || "LuckyShop Product";

//   const metaDescription = document.querySelector('meta[name="description"]');
//   if (metaDescription) {
//     metaDescription.setAttribute(
//       "content",
//       product?.metadescription || product?.description || "Buy amazing products at LuckyShop"
//     );
//   } else {
//     const meta = document.createElement("meta");
//     meta.name = "description";
//     meta.content = product?.metadescription || product?.description || "Buy amazing products at LuckyShop";
//     document.head.appendChild(meta);
//   }

//   // 3️⃣ Open Graph image (for social sharing)
//   const ogImage = document.querySelector('meta[property="og:image"]');
//   const imageUrl = product.images?.[0] || product.productimg || "";
//   if (ogImage) {
//     ogImage.setAttribute("content", imageUrl);
//   } else {
//     const meta = document.createElement("meta");
//     meta.setAttribute("property", "og:image");
//     meta.content = imageUrl;
//     document.head.appendChild(meta);
//   }
// }, [product]);
   
 
   if (!product) return null;

   // 🔍 Apply filters to build the list shown in "FEATURED REVIEWS"
const filteredReviews = reviews.filter((r) => {
  const passesMedia = !mediaOnly || (r.photos && r.photos.length > 0);
  const passesStar = selectedStars.length === 0 || selectedStars.includes(r.rating);
  return passesMedia && passesStar;
});
 
   // Calculate average rating
   const totalReviews = reviews.length;

// Sum all ratings, যেগুলো valid number
const totalRating = reviews.reduce((sum, r) => {
  const rating = typeof r.rating === "number" ? r.rating : 0; // rating missing হলে 0 ধরে
  return sum + rating;
}, 0);

// Average
const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

  // Calculate percentage per star
  const starCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    percentage:
      totalReviews > 0
        ? Math.round((reviews.filter((r) => r.rating === star).length / totalReviews) * 100)
        : 0,
  }));

   const firstViewReviews = reviews.slice(0, 2);

   const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };


  

const handleBuyNow = (product) => {
  // 1. Cart e add koro
  const added = handleAddToCart(product);

  if (added) {
    // 2. selectedCart e only buy now item save koro
    const buyNowItem = {
      ...product,
      quantity: 1,
      img: product.img || product.images?.[0] || product.productimg
    };

    localStorage.setItem("selectedCart", JSON.stringify([buyNowItem]));

    // 3. Payment page e redirect
    navigate("/payment");
  }
};






  return (
    <div className=" min-h-screen py-6 px-4 mt-20 md:mt-0 ">
      <ScrollToTop/>
      {/* ---------- OUTER GRID: (LEFT+MIDDLE) | RIGHT ---------- */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-8 ">

        
        {/* ================= LEFT + MIDDLE WRAPPER ================= */}
        <div className="space-y-8">
        <div className="md:hidden ">
      
        </div>
         
          {/* ---------- INNER GRID: LEFT | MIDDLE ---------- */}
          <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-8">


            {/* ---------- LEFT: Image gallery ---------- */}
            <div className="">
            
            <div className="sticky md:top-24 self-start -mt-72">
               <div className="rounded-2xl p-4 flex items-center justify-center -mt-6 md:mt-0 overflow-hidden relative w-full max-w-md mx-auto">
                     <AnimatePresence mode="wait">
                       <motion.div
                         key={images[indexs]}
                         className="relative h-[300px] md:h-[300px] w-full flex items-center justify-center bg-white"
                         initial={{ opacity: 0, x: 50, scale: 0.98 }}
                         animate={{ opacity: 1, x: 0, scale: 1 }}
                         exit={{ opacity: 0, x: -50, scale: 0.98 }}
                         transition={{
                           x: { type: "tween", ease: [0.25, 0.1, 0.25, 1], duration: 0.6 },
                           opacity: { duration: 0.4, ease: "easeInOut" },
                           scale: { duration: 0.5, ease: "easeOut" },
                         }}
                         drag="x"
                         dragConstraints={{ left: 0, right: 0 }}
                         dragElastic={0.8}
                         onDragEnd={(e, { offset, velocity }) => {
                           const swipe = offset.x * velocity.x;
                           if (swipe < -1000) nextImage();
                           else if (swipe > 1000) prevImage();
                         }}
                       >
                         <img
                           src={images[indexs]}
                           alt={`Product ${indexs + 1}`}
                           className="h-full w-auto object-contain rounded-lg select-none"
                         />
             
                         {/* Bottom Overlay */}
                         <div className="absolute bottom-1 left-0 right-0 flex justify-between items-center px-4">
                           <div className="bg-gray-500 text-white text-sm md:text-base font-semibold px-4 py-1.5 rounded-full shadow-md md:py-1">
                             Item {indexs + 1}/{images.length}
                           </div>
                       
                         </div>
                       </motion.div>
                     </AnimatePresence>
                   </div>
             
                   {/* Thumbnails */}
                   <div className="relative flex items-center justify-center w-full max-w-md mx-auto mt-2">
                     <button
                       onClick={prevSlides}
                       disabled={startIndex === 0}
                       className={`absolute left-0 z-10 bg-white border border-gray-200 rounded-full p-2 shadow transition ${
                         startIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50"
                       }`}
                     >
                       <ChevronLeft className="w-5 h-5 text-gray-700" />
                     </button>
             
                     <div className="grid grid-cols-6 md:grid-cols-6 gap-1 w-full px-8 -mt-2 md:mt-0">
                       {visibleThumbs.map((src, i) => (
                         <button
                           key={startIndex + i}
                           onClick={() => setIndexs(startIndex + i)}
                           className={`border rounded-xl p-1 transition-all ${
                             indexs === startIndex + i
                               ? "border-green-600 shadow-md"
                               : "border-gray-200 hover:border-emerald-600 hover:shadow"
                           }`}
                         >
                           <img
                             src={src}
                             alt={`thumb-${startIndex + i}`}
                             className="object-contain h-8 w-12 md:h-8 md:w-full rounded-lg"
                           />
                         </button>
                       ))}
                     </div>
             
                     <button
                       onClick={nextSlides}
                       disabled={startIndex >= thumbs.length - visibleCount}
                       className={`absolute right-0 z-10 bg-white border border-gray-200 rounded-full p-2 shadow transition ${
                         startIndex >= thumbs.length - visibleCount
                           ? "opacity-40 cursor-not-allowed"
                           : "hover:bg-gray-50"
                       }`}
                     >
                       <ChevronRight className="w-5 h-5 text-gray-700" />
                     </button>
                   </div>
            </div>


      <div className="flex items-start gap-3 md:hidden">
  {/* Product Title */}
  <h1
    className="
      text-sm font-semibold
      w-[240px] sm:w-full
      line-clamp-2
      text-gray-800
    "
    title={product?.title} // show full title on hover
  >
    {product?.title}
  </h1>

  {/* Wishlist Button */}
<button
  onClick={handleWishlist}
  disabled={loading}
  aria-label="Add to wishlist"
  className={`
    flex items-center justify-center
    p-2 md:py-1 md:px-1
    rounded-full shadow-md -mt-2
    text-black
    transition
    hover:opacity-90
    ${loved ? "bg-red-500" : ""}
  `}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={loved ? "currentColor" : "none"}
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-6 h-6 md:w-5 md:h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.014-4.5-4.5-4.5-1.74 0-3.223 1.004-3.938 2.465a4.501 4.501 0 00-3.938-2.465c-2.486 0-4.5 2.015-4.5 4.5 0 7.22 8.438 11.69 8.438 11.69S21 15.47 21 8.25z"
    />
  </svg>
</button>
</div>




              <div className="flex justify-between items-center text-sm px-2 text-gray-500 md:hidden -ms-2">
  {/* Left: Ratings */}
  <div className="flex items-center gap-1">
      {/* Stars */}
    <div className="flex items-center gap-2">
  <div className="flex items-center">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i <= Math.round(averageRating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300 fill-gray-300"
        }`}
      />
    ))}
  </div>

  <span className="ml-2 font-semibold text-gray-900 text-sm">
    {averageRating.toFixed(1)}
  </span>

  <span className="text-gray-500 text-sm">| {totalReviews} Reviews</span>
</div>


      {/* Rating Text */}
      
      <span className="text-gray-500 text-sm">| {stats.sold}+ sold</span>
    </div>

  {/* Right: Stock Info */}
  {/* <div className="text-green-600 font-medium">
    4K+ bought · In stock
  </div> */}
</div>

              <div className="md:hidden block ">
                  <div className="flex items-center gap-2 ">
                               <p className="price-default--current--F8OlYIo text-red-600">
  <span className="price-container">
    <span className="main-price">
      <span className="currency">BDT</span>
      <span className="amount -ms-1">{product?.ProductPrice}</span>
    </span>
  </span>
</p>


                                <p className="main-symbol mt-2 text-gray-400 ">
                                 
                                 <span className="text-sm  text-red-600">
                                  {/* {product.oldPrice} */}
                                     {product?.discount}%off
                                 </span>
                               </p>

                               <p className="main-symbol line-through text-gray-400 mt-2 -ms-1">
                                 <span className="text-sm">BDT</span>
                                 <span className="text-sm">
                                  {product?.oldPrice}
                                     {/* 600.99 */}
                                 </span>
                               </p>

                                
                               
           
                              
                             </div>
                           <p className="import-note">
  Import Charges included; Extra 1% off with coins
</p>


                         
                          



{/* ---------------- Mobile screen ---------------- */}
      <div className="sm:hidden  flex gap-2">
        {/* Size toggle */}
       <div className="-mt-1">
         <span
          onClick={() => setShowSizes(!showSizes)}
          className="flex-1 px-3 py-2 text-[#19745B] text-left    rounded-lg text-md font-semibold  hover:border-emerald-600  transition flex justify-center items-center"
        >
          Size ▼
        </span>
       </div>

        {/* Color toggle */}
        <div className="">
          <span
          onClick={() => setShowColors(!showColors)}
          className="flex-1 px-3 py-2   rounded-lg text-sm font-semibold text-gray-700 hover:border-emerald-600 text-md  transition flex justify-center items-center"
        >
          
           Color ▼
        </span>
        </div>
      </div>

       


      {/* Mobile toggle content */}
      <div className="sm:hidden space-y-2 mt-2">
        {showSizes && (
         <div className="ms-1">
      
      <div className="flex flex-wrap gap-2">
       {product?.size?.length > 0 && (
          <div className="ms-3">
            <h2 className="font-semibold text-gray-700 mb-2 -mt-2">Sizes</h2>
            <div className="flex flex-wrap gap-2 -mt-1">
              {product.size.map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1 border rounded-lg text-sm transition ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                        : "border-gray-300 text-gray-700 hover:border-emerald-600"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
        )}

        {showColors && (
         <div className="w-full bg-white px-4 py-3">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-900">
          4 colors
        </p>
        <span className="text-gray-400 text-sm">›</span>
      </div>

      {/* VARIANTS */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        
        {/* ACTIVE / SELECTED */}
        <div className="relative min-w-[64px]">
          <div className="border-2 border-green-500 rounded-xl p-1">
            <img
              src="https://luckyshop.com.bd/demo/1763032030619_xbox-wireless-controller-electric-volt-01-500x500.jpg"
              alt="color"
              className="w-14 h-14 rounded-lg object-cover"
            />
          </div>
        </div>

        {/* FINISHED */}
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="relative min-w-[64px]">
            <div className="rounded-xl p-1 border border-gray-200">
              <img
                src="https://luckyshop.com.bd/demo/1763032030619_xbox-wireless-controller-electric-volt-01-500x500.jpg"
                alt="color"
                className="w-14 h-14 rounded-lg object-cover grayscale"
              />
            </div>

            {/* FINISHED BADGE */}
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-black/70 text-white text-[10px] px-2 py-[1px] rounded-full">
              Finished
            </span>
          </div>
        ))}
      </div>
    </div>
        )}
      </div>

      {/* Review part design  start */}

      {/* mobiel quantity  */}
        <div className="flex text-left items-center justify-start md:hidden">
  <div className="flex items-center">
    <span className="text-sm font-semibold text-gray-700">Quantity:</span>
    <div className="flex ms-2 items-center p-2 border border-gray-300 rounded-lg w-32 overflow-hidden shadow-sm">
      <button
        onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
        className="px-3 py-1 hover:bg-gray-100 transition"
      >
        <Minus size={16} />
      </button>
      <span className="flex-1 text-center font-medium">{qty}</span>
      <button
        onClick={() => setQty(qty + 1)}
        className="px-3 py-1 hover:bg-gray-100 transition"
      >
        <Plus size={16} />
      </button>
    </div>
  </div>
</div>


   <div className="bg-white text-gray-800 w-full max-w-md mx-auto p-3 -mt-3 -ms-3 md:ms-0">
      {/* Review Gallery */}
      <div className="pb-3 border-b mb-2">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-sm">Review gallery</p>
          <button className="text-xs text-blue-600">See all ({reviews.length})</button>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {reviews.flatMap(r => r.photos || []).slice(0, 5).map((img, i) => (
            <div key={i} className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden">
              <img src={img} alt="review" className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Header */}
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-sm">Reviews</p>
        <button
          onClick={() => setOpenModal(true)}
          className="text-xs text-gray-500 hover:text-blue-600 transition"
        >
          ✓ All from verified <span className="text-blue-600">purchases</span>
        </button>
      </div>

      {/* Rating Summary */}
       <div className="bg-white px-4 py-3 border-b -ms-3 md:ms-0">
      {/* Top Row */}
      <div className="flex items-center gap-2 mb-1">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-white">
          h
        </div>

        {/* Name & Time */}
        <div>
          <p className="text-sm font-medium text-gray-800 leading-none">
            h***m
          </p>
          <p className="text-xs text-gray-500">
            Reviewed 3 months ago
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <FaStar
            key={i}
            className="text-yellow-400 text-sm"
          />
        ))}
      </div>

      {/* Variant */}
      <p className="text-xs text-gray-600 mb-1">
        Variant: <span className="font-medium">Black</span>
      </p>

      {/* Review Text */}
      <p className="text-sm text-gray-800 leading-relaxed">
        The model is nice, the material is thick, the build quality
        is as always, please keep it up. The seller also responds
        quickly. Awesome! BTW, it also fits a laptop...
        <span className="text-emerald-600 font-medium cursor-pointer">
          {" "}
          Read more
        </span>
      </p>
    </div>

      {/* Tag Filters */}
     {/* seller profiel */}
      <div className="w-full bg-white border-b border-gray-200 px-4 py-3">
      
      {/* TOP ROW */}
      <div className="flex items-start gap-3 -ms-3 md:ms-0">
        
        {/* ICON */}
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
  <span className="text-base font-bold text-gray-700">
    {(product?.shopName || "S").charAt(0)}
  </span>
</div>

<Link to={`/sellershop/${product?.sellerId}`}>
<div className="flex-1 min-w-0">
  <div className="flex items-center gap-1">
    <h2 className="text-sm font-semibold text-gray-900 truncate">
      {product?.shopName || "Store"}
    </h2>
    <CheckCircle size={14} className="text-purple-600 shrink-0" />
  </div>

  <p className="text-[11px] text-gray-500 mt-0.5">
    {product?.shopName ? "Verified Seller" : "Depok City"}
  </p>
          {/* RATING */}
          <div className="flex items-center gap-1 mt-1 text-[11px] text-gray-600 flex-wrap">
            <Star size={11} className="text-yellow-500 fill-yellow-500" />
            <span className="font-medium">4.9</span>
            <span className="text-gray-400">(3.765k)</span>
            <span className="mx-1">•</span>
            <span>1789 items</span>
          </div>
        </div></Link>

        {/* FOLLOW */}
        <button className="px-3 py-1 text-xs font-semibold text-green-600 border border-green-500 rounded-full shrink-0">
          Follow
        </button>
      </div>

      {/* BADGES */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[11px]">
        <span className="flex items-center gap-1 text-blue-600">
          <CheckCircle size={12} /> Original
        </span>
        <span className="flex items-center gap-1 text-green-600">
          <ShieldCheck size={12} /> Secure
        </span>
        <span className="flex items-center gap-1 text-orange-500">
          <BadgePercent size={12} /> Care
        </span>
      </div>
    </div>

      {/* First 2 Reviews */}

      {/* More in this store  */}
       <div className=" md:mt-10 mt-5 md:mb-0 text-xl font-bold mx-auto max-w-7xl">
      <h1>More in this store</h1>
      <div className="relative flex items-center">
        <div className="overflow-hidden w-full">
          <div className=" mt-5 mb-10 items-start transition-transform duration-700 ease-in-out grid grid-cols-2 md:grid-cols-6 gap-2">
            {relatedProducts.slice(0, counts).map((product) => (
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
            ))}
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      {/* {counts < relatedProducts.length ? (
        <div className="flex justify-center -mt-6 mb-20">
          <button
            onClick={toggleSeeProducts}
            className="bg-gradient-to-r from-[#8CD005] to-[#19745B] text-white font-semibold px-6 py-2 rounded shadow hover:opacity-90 transition"
          >
            {expandedvalue ? "Hide Products" : "See More"}
          </button>
        </div>
      ) : (
        <div className="flex justify-center mb-10">
          <button
            onClick={showMore}
            className="bg-gradient-to-r from-[#8CD005] to-[#19745B] text-white font-semibold px-6 py-2 rounded shadow hover:opacity-90 transition"
          >
            Show More
          </button>
        </div>
      )} */}
    </div>
    
    {/* product deatisl  */}

     <section className="w-full bg-white px-4 py-3 -mt-9 -ms-3">
      {/* HEADER */}
      <h3 className="text-[18px] font-semibold text-gray-900 mb-3">
        Product details
      </h3>

      {/* SHOWCASE */}
      <div className="flex text-[12px] mb-1">
        <span className="w-[72px] text-gray-500">Showcase</span>
        <span className="font-semibold text-green-600 uppercase">
          BACKPACK
        </span>
      </div>

      {/* CATEGORY */}
      <div className="flex text-[12px] mb-3">
        <span className="w-[72px] text-gray-500">Category</span>
        <span className="text-green-600 leading-snug">
          Home &gt; Men’s Fashion &gt; Men’s Bags
        </span>
      </div>

      {/* DESCRIPTION */}
      <h4 className="text-[13px] font-semibold text-gray-900 mb-1">
        Description
      </h4>

      <p className="text-[12px] text-gray-700 leading-[18px] font-bold">
        Place all your belongings while on the move with the Miracles Pack 15 L.
        This mens backpack from EIGER 1989 has a main compartment that can be
        accessed easily.
      </p>

      <button className="text-[12px] text-green-600 font-medium mt-1">
        Read more
      </button>

      {/* EXTRA PROTECTION */}
      {/* <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
        <p className="text-[12px] text-gray-800">
          Add extra protection starting from{" "}
          <span className="font-semibold">BDT. 12,150</span>
        </p>
        <span className="text-gray-400 text-base">›</span>
      </div> */}

      {/* REPORT */}
      {/* <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
        <span className="text-gray-400 text-[12px]">⚠</span>
        <p className="text-[12px] text-gray-500">
          Product bermasalah?{" "}
          <span className="text-green-600 font-medium">
            Laporkan
          </span>
        </p>
      </div> */}
    </section>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto animate-slide-up mb-10">
          <div className="sticky top-0 bg-white border-b p-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Reviews</h2>
            <button onClick={() => setOpenModal(false)}>
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          <div className="p-3">
            {/* Rating Summary */}
            <div className="flex items-center gap-1 mb-3">
              <span className="text-lg font-bold">4.6</span>
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-1">({reviews.length} ratings)</span>
            </div>

            {/* Tag Filters */}
            <div className="flex flex-wrap gap-2 mb-3 text-xs">
              {["positive ", "excellent perfect good protective displayed well", "disappointing", "very satisfied"].map((tag, i) => (
                <span key={i} className="bg-gray-100 px-2 py-1 rounded-full text-gray-700">{tag}</span>
              ))}
            </div>

            {/* All Reviews */}
            {reviews.map((r, i) => (
              <div key={i} className="border-t pt-3 mt-2">
                <div className="flex items-center gap-1 mb-1">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} size={12} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">{r.country} {r.username}, {formatDate(r.date)}</p>
                </div>
                <p className="text-xs text-gray-500 mb-1">{r.detail}</p>
                <p className="text-sm mb-2">{r.comment}</p>
                {r.photos && r.photos.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-2">
                    {r.photos.map((img, idx) => (
                      <div key={idx} className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                        <img src={img} alt="review" className="object-cover w-full h-full" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

      {/* Review part design  end */}


              </div>

                {/* <div className="max-w-xl mx-auto p-4  rounded-xl ">
        <h3 className="text-xl font-bold">Description</h3>

      <p className={`text-sm text-gray-600 mt-3 leading-relaxed transition-all duration-300 
  ${isExpanded ? "max-h-full" : "line-clamp-4 md:line-clamp-4"}`}>
  <span className="font-semibold ">Efficient protection:</span> {product?.description}
</p>


     

      <button
        onClick={toggleExpand}
        className="mt-2 text-sm text-green-600 font-semibold hover:text-green-800 transition-colors"
      >
        {isExpanded ? "Read Less ▲" : "Read More ▼"}
      </button>

    </div> */}
 
    
            </div>

            {/* ---------- MIDDLE: Product details ---------- */}
            <div className="space-y-4 sticky top-12 self-start">
              <h1 className="text-xl md:block hidden md:text-2xl font-semibold text-gray-900">
                {product?.title}
              </h1>

              {/* <p className="text-gray-600 md:block hidden ">
                Thin protective case with built-in screen protector, shock-resistant frame, Black.
              </p> */}
              
              {/* <div className="flex items-center gap-2  md:block">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gray-300 -mt-16 md:mt-0" />
                ))}
                <span className="text-sm text-gray-500 -mt-16 md:mt-0">(No Ratings)</span>
                
              </div> */}

             <div className="flex hidden md:block items-baseline gap-2 text-2xl md:text-3xl font-bold text-emerald-600">
  <span>BDT {product?.ProductPrice}</span>
  {product?.oldPrice && (
    <span className="text-gray-400 text-xl ms-1 line-through">{product?.oldPrice}</span>
  )}
</div>

           <div className="hidden md:block">
               <div className="flex items-center gap-1">
      {/* Stars */}
     <div className="flex items-center gap-2">
  <div className="flex items-center">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i <= Math.round(averageRating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300 fill-gray-300"
        }`}
      />
    ))}
  </div>

  <span className="ml-2 font-semibold text-gray-900 text-sm">
    {averageRating.toFixed(1)}
  </span>

  <span className="text-gray-500 text-sm">| {totalReviews} Reviews</span>
</div>


      {/* Rating Text */}
      
      <span className="text-gray-500 text-sm">| {stats.sold}+ sold</span>
    </div>
           </div>
              <p className="text-sm text-gray-500 hidden md:block">
                {product?.stock}+  <span className="text-green-600 font-medium ">In stock</span>
              </p>

              {/* Size */}
            <div className="md:space-y-4">
      {/* ---------------- Large screen ---------------- */}
        <div className="hidden sm:block space-y-4">
        {/* Sizes */}
       <div className="mt-4">
      
      <div className="flex flex-wrap gap-2">
         {product?.size?.length > 0 && (
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">Sizes</h2>
            <div className="flex flex-wrap gap-2">
              {product.size.map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1 border rounded-lg text-sm transition ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                        : "border-gray-300 text-gray-700 hover:border-emerald-600"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>

        {/* Colors */}
      <div className="mt-4">
     
      <div className="flex flex-wrap gap-2">
        {product?.color?.length > 0 && (
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">
              Color{" "}
              {selectedColors.length > 0
                ? `: ${selectedColors.join(", ")}`
                : ""}
            </h2>
            <div className="flex flex-wrap gap-2">
              {product.color.map((color) => {
                const isSelected = selectedColors.includes(color);
                return (
                  <button
                    key={color}
                    onClick={() => toggleColor(color)}
                    className={`w-10 h-10 border rounded-lg transition flex items-center justify-center overflow-hidden ${
                      isSelected
                        ? "border-emerald-600 ring-2 ring-emerald-300"
                        : "border-gray-300 hover:border-emerald-600"
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>

    
      <div className="max-w-5xl mx-auto bg-white">

      {/* ================= TABS ================= */}
   <div className="border-b flex gap-8 text-sm font-medium px-4">
  <button
    onClick={() => setActiveTab("detail")}
    className={`py-4 ${
      activeTab === "detail"
        ? "text-green-600 border-b-2 border-green-600"
        : "text-gray-500"
    }`}
  >
    Product Details
  </button>

  <button
    onClick={() => setActiveTab("spec")}
    className={`py-4 ${
      activeTab === "spec"
        ? "text-green-600 border-b-2 border-green-600"
        : "text-gray-500"
    }`}
  >
    Specifications
  </button>

  <button
    onClick={() => setActiveTab("info")}
    className={`py-4 ${
      activeTab === "info"
        ? "text-green-600 border-b-2 border-green-600"
        : "text-gray-500"
    }`}
  >
    Important Information
  </button>
</div>


      {/* ================= CONTENT ================= */}
    <div className="px-4 py-6 text-sm text-gray-800 leading-relaxed">

  {/* PRODUCT DETAILS */}
 {/* PRODUCT DETAILS */}
{activeTab === "detail" && (
  <>
    <div className="space-y-1 mb-4">
      <p>
        <span className="text-gray-500">Condition:</span>{" "}
        <b>New</b>
      </p>
      <p>
        <span className="text-gray-500">Category:</span>{" "}
        <span className="text-green-600 font-medium">
          {product?.categoryName || "N/A"}
        </span>
      </p>
      <p>
        <span className="text-gray-500">Subcategory:</span>{" "}
        <span className="text-green-600 font-medium">
          {product?.subcategoryName || "N/A"}
        </span>
      </p>
      {product?.childcategoryName && (
        <p>
          <span className="text-gray-500">Childcategory:</span>{" "}
          <span className="text-green-600 font-medium">
            {product.childcategoryName}
          </span>
        </p>
      )}
      <p>
        <span className="text-gray-500">Brand:</span>{" "}
        <span className="text-green-600 font-medium">
          {product?.brandName || "N/A"}
        </span>
      </p>
      <p>
        <span className="text-gray-500">Minimum Purchase:</span>{" "}
        1 Item
      </p>
    </div>

    <p className="mb-3">
      {product?.description || "No description available for this product."}
    </p>
  </>
)}

{/* SPECIFICATIONS */}
{activeTab === "spec" && (
  <div className="space-y-1 mb-4">
    <p>
      <span className="text-gray-500">Variant:</span>{" "}
      <b>{product?.variant || "N/A"}</b>
    </p>
    <p>
      <span className="text-gray-500">Available Sizes:</span>{" "}
      <b>{product?.size?.length > 0 ? product.size.join(", ") : "N/A"}</b>
    </p>
    <p>
      <span className="text-gray-500">Available Colors:</span>{" "}
      <b>{product?.color?.length > 0 ? product.color.join(", ") : "N/A"}</b>
    </p>
    <p>
      <span className="text-gray-500">Stock:</span>{" "}
      <b>{product?.stock ?? 0}</b>
    </p>
    <p>
      <span className="text-gray-500">Availability:</span>{" "}
      <b>{product?.availability || "N/A"}</b>
    </p>

    {product?.bulletPoints?.length > 0 && (
      <div className="mt-3">
        <span className="text-gray-500 block mb-1">Key Features:</span>
        <ul className="list-disc list-inside space-y-1">
          {product.bulletPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
)}

{/* IMPORTANT INFORMATION */}
{activeTab === "info" && (
  <div className="space-y-3">
    <p>
      {product?.metadescription || "No additional information provided for this product."}
    </p>

    <p>
      <span className="text-gray-500">Sold by:</span>{" "}
      <b>{product?.shopName || "N/A"}</b>
    </p>

    <p>
      <span className="text-gray-500">Product ID:</span>{" "}
      <b>{product?.productid || "N/A"}</b>
    </p>
  </div>
)}

  {/* ================= SELLER INFO ================= */}
 <Link to={`/sellershop/${product?.sellerId}`}>
<div className="border-t mt-6 pt-5 flex items-center justify-between">
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
      {(product?.shopName || "S").charAt(0)}
    </div>

    <div>
     <p className="font-semibold">{product?.shopName || "Store"}</p>
<div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
   <span>⭐ {sellerFollowerCount} Follow{sellerFollowerCount === 1 ? "" : "s"}</span>
  <span>⏱ ± 2 hours order processing</span>
</div>
</div>
</div>

<button
  onClick={handleSellerFollow}
  className={`px-4 py-1.5 rounded-md font-medium text-sm border ${
    sellerFollowing
      ? "bg-gray-100 text-gray-700 border-gray-300"
      : "border-green-600 text-green-600"
  }`}
>
  {sellerFollowing ? "Following" : "Follow"}
</button>
</div>
</Link>

  {/* ================= SHIPPING ================= */}
 <div className="border-t mt-6 pt-5">
  <h3 className="font-semibold mb-2">Shipping</h3>

  <p className="flex items-center gap-2 mb-2">
    📍 Ships from <b>{product?.shopName || "Store"}</b>
  </p>

  <p className="flex items-center gap-2">
    🚚 Shipping Fee <b>BDT {shippingFee}</b>
  </p>
</div>
</div>

    </div>

      </div>

      

      
    </div>

             {product?.bulletPoints?.length > 0 && (
  <ul className="list-disc list-inside text-gray-700 hidden md:block space-y-1 text-sm">
    {product.bulletPoints.map((point, index) => (
      <li key={index}>{point}</li>
    ))}
  </ul>
)}

            </div>
          </div>

          {/* ================= REVIEW SECTION spans both left + middle ================= */}
        <div className="bg-white rounded-2xl border md:block hidden border-gray-100 shadow-md p-6">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        Customer Reviews & Ratings
      </h2>

      {totalReviews === 0 ? (
        <p className="text-center text-gray-700 font-medium mb-6">No customers ratings</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 mb-6">
          {/* Average rating */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="text-4xl font-bold text-emerald-600">{averageRating.toFixed(1)}</div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(averageRating) ? "text-emerald-500" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.91c.969 0 1.371 1.24.588 1.81l-3.973 2.888a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.973 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118L1.67 10.1c-.783-.57-.38-1.81.588-1.81h4.91a1 1 0 00.95-.69l1.518-4.674z" />
                </svg>
              ))}
            </div>
            <p className="text-sm text-gray-500">{totalReviews} review(s)</p>
          </div>

          {/* Star bars */}
          <div className="space-y-2">
            {starCounts.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center gap-2">
                <span className="w-12 text-sm text-gray-700">{star} Star</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-10 text-sm text-gray-500 text-right">{percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <hr className="my-6 border-0 h-px bg-gray-300" />

      {/* Individual Reviews */}
 <div className="max-w-7xl mx-auto px-4 py-10 flex gap-8 bg-white">
  
  {/* ================= LEFT FILTER ================= */}
    {/* ================= LEFT FILTER ================= */}
  <div className="w-[280px] border rounded-lg p-4 h-fit">
    <h3 className="font-semibold mb-4 text-sm">REVIEW FILTER</h3>

    {/* Media */}
    <div className="mb-5">
      <div className="flex justify-between items-center mb-3 font-semibold text-sm">
        Media <span className="text-gray-400">⌃</span>
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input
          type="checkbox"
          className="w-4 h-4 accent-green-600"
          checked={mediaOnly}
          onChange={(e) => setMediaOnly(e.target.checked)}
        />
        With Photo & Video
      </label>
    </div>

    {/* Rating */}
    <div className="mb-5">
      <div className="flex justify-between items-center mb-3 font-semibold text-sm">
        Rating <span className="text-gray-400">⌃</span>
      </div>

      {[5, 4, 3, 2, 1].map((star) => (
        <label
          key={star}
          className="flex items-center gap-2 mb-2 text-sm cursor-pointer"
        >
          <input
            type="checkbox"
            className="w-4 h-4 accent-green-600"
            checked={selectedStars.includes(star)}
            onChange={() => toggleStarFilter(star)}
          />
          <div className="flex gap-1">
            {[...Array(star)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-sm" />
            ))}
          </div>
        </label>
      ))}
    </div>

    {/* Topic */}
    <div>
      <div className="flex justify-between items-center mb-3 font-semibold text-sm">
        Review Topics <span className="text-gray-400">⌃</span>
      </div>

      {[
        "Product Quality",
        "Seller Service",
        "Packaging",
        "Price",
      ].map((item) => (
        <label
          key={item}
          className="flex items-center gap-2 mb-2 text-sm text-gray-700"
        >
          <input type="checkbox" className="w-4 h-4 accent-green-600" />
          {item}
        </label>
      ))}
    </div>
  </div>

  {/* ================= RIGHT CONTENT ================= */}
    <div className="flex-1">

    {/* Photo Section */}
    {filteredReviews.flatMap((r) => r.photos || []).length > 0 && (
      <>
        <h3 className="font-semibold mb-3 text-sm">
          CUSTOMER PHOTOS & VIDEOS
        </h3>
        <div className="flex gap-3 mb-8 flex-wrap">
          {filteredReviews
            .flatMap((r) => r.photos || [])
            .slice(0, 5)
            .map((img, i) => (
              <img
                key={i}
                src={img}
                alt="review"
                className="w-20 h-20 rounded-lg object-cover"
              />
            ))}

          {filteredReviews.flatMap((r) => r.photos || []).length > 5 && (
            <div className="relative w-20 h-20 rounded-lg overflow-hidden">
              <img
                src={filteredReviews.flatMap((r) => r.photos || [])[5]}
                alt="review"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70 text-white flex items-center justify-center font-semibold">
                +{filteredReviews.flatMap((r) => r.photos || []).length - 5}
              </div>
            </div>
          )}
        </div>
      </>
    )}

    {/* Header */}
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="font-semibold text-sm">FEATURED REVIEWS</h3>
        <p className="text-sm text-gray-500">
          Showing {Math.min(filteredReviews.length, 10)} of {filteredReviews.length} reviews
        </p>
      </div>

      <select className="border rounded-md px-3 py-2 text-sm">
        <option>Most Helpful</option>
        <option>Newest</option>
      </select>
    </div>

    {/* ================= REVIEW ITEMS ================= */}
    {filteredReviews.length === 0 ? (
      <p className="text-sm text-gray-500 py-10 text-center">
        {reviews.length === 0
          ? "No reviews yet for this product."
          : "No reviews match the selected filters."}
      </p>
    ) : (
      filteredReviews.slice(0, 10).map((r) => (
        <div key={r._id} className="border-t pt-6 pb-2">

          {/* Top */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar
                  key={i}
                  className={`text-sm ${
                    i <= r.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-500">
                {formatDate(r.date)}
              </span>
            </div>
            <FiMoreVertical className="text-gray-500" />
          </div>

          {/* User */}
          <div className="flex items-center gap-3 mt-3">
            <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-white">
              {(r.anonymous ? "A" : r.username || "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-sm">
                {r.anonymous ? "Anonymous" : r.username || "User"}
              </p>
              {(r.color || r.size) && (
                <p className="text-xs text-gray-500">
                  Variant: {[r.color, r.size].filter(Boolean).join(" - ")}
                </p>
              )}
            </div>
          </div>

          {/* Text */}
          {r.comment && (
            <p className="text-sm text-gray-800 mt-3 leading-relaxed">
              {r.comment}
            </p>
          )}

          {/* Images */}
          {r.photos?.length > 0 && (
            <div className="flex gap-3 mt-4 flex-wrap">
              {r.photos.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="review"
                  className="w-20 h-20 rounded-lg object-cover"
                />
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <span>👍 {r.likes || 0} people found this helpful</span>
          </div>
        </div>
      ))
    )}

  </div>
</div>


    </div>



    {/* related product  */}

    
        </div>

        {/* ================= RIGHT: Purchase & shipping ================= */}
     <div className="md:block hidden md:w-[360px] w-[320px] sticky top-36 self-start border h-[400px] border-gray-300 rounded-xl p-5 font-sans bg-white">
  
  {/* Title */}
  <h3 className="font-semibold text-lg mb-2">
    Set Quantity & Notes
  </h3>

  {/* Variant */}
  <p className="text-sm text-gray-700 mb-4">
  {product?.variant || "Standard"}
  {selectedSizes.length > 0 && `, ${selectedSizes.join(", ")}`}
  {selectedColors.length > 0 && `, ${selectedColors.join(", ")}`}
</p>

  {/* Quantity + Stock */}
  <div className="flex items-center mb-4">
    <div className="flex items-center border rounded-md overflow-hidden">
      <button
        className="px-3 py-2 text-gray-500 hover:bg-gray-100"
        onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
      >
        <FiMinus />
      </button>

      <span className="px-4 text-sm font-medium">
        {qty}
      </span>

      <button
        className="px-3 py-2 text-green-500 hover:bg-gray-100"
        onClick={() => setQty(qty + 1)}
      >
        <FiPlus />
      </button>
    </div>

   <span className="text-md text-gray-700 ms-5">
  Stock: <b>{product?.stock ?? 0}</b>
</span>
  </div>

  {/* Price */}
 <div className="mb-5">
  <p className="text-sm text-gray-400 line-through">
    BDT {product?.oldPrice}
  </p>
  <div className="flex justify-between">
    <span className="text-xl font-semibold text-gray-500 mb-1">
      Subtotal
    </span>
    <span className="text-2xl font-bold">
      BDT {(product?.ProductPrice || 0) * qty}
    </span>
  </div>
</div>


  {/* Buttons */}
  <div className="space-y-3 mb-4">
    <button onClick={() => handleAddToCart(product)} className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg">
      + Add to Cart
    </button>

       <button
      onClick={() => {
        const buyNowItem = {
          ...product,
          quantity: qty,
          img: product.img || product.images?.[0] || product.productimg,
          selectedSize: selectedSizes[0] || null,
          selectedColor: selectedColors[0] || null,
        };
        localStorage.setItem("selectedCart", JSON.stringify([buyNowItem]));
        navigate("/payment");
      }}
      className="w-full border border-green-500 text-green-500 font-semibold py-3 rounded-lg hover:bg-green-50"
    >
      Buy Now
    </button>
  </div>

  {/* Footer actions */}
  <div className="flex items-center font-bold justify-between text-sm text-gray-700">
    <button  onClick={() => setChatOpen(true)}
     className="flex items-center gap-1 hover:text-green-500">
      <FiMessageCircle />
      Chat
    </button>

  <button
  onClick={handleWishlist}
  disabled={loading}
  className={`flex items-center gap-1 hover:text-green-500 ${loved ? "text-red-500" : ""}`}
>
  <FiMessageCircle />
  {loading ? "Adding..." : loved ? "Wishlisted" : "Wishlist"}
</button>

    <button className="flex items-center gap-1 hover:text-green-500">
      <FiMessageCircle />
      Share
    </button>
  </div>
</div>


 {/* --- Mobile View --- */}
<div className="fixed bottom-0 left-0 w-full sm:hidden z-50 bg-white border-t border-gray-200">
  <div className="flex items-center gap-3 p-2">

    {/* Chat Button */}
    <button
      // onClick={() => openChat()} 
      className="flex items-center justify-center w-12 h-12 border-2 border-emerald-600 rounded-full text-gray-700 hover:text-emerald-600 hover:bg-gray-50 transition-all duration-200"
    >
      <FiMessageCircle size={20} />
    </button>

    {/* Add to Cart - border only, premium style */}
    <button
      onClick={() => handleAddToCart({ ...product, quantity: qty })}
      className="flex-1 border-2 border-emerald-600 text-emerald-600 font-semibold py-2 rounded-full shadow-sm hover:bg-emerald-50 hover:scale-105 transition-transform duration-200"
    >
      Add to Cart
    </button>

    {/* Buy Now - filled premium */}
    <button
      onClick={() => {
        const buyNowItem = { ...product, quantity: qty };
        localStorage.setItem("selectedCart", JSON.stringify([buyNowItem]));
        navigate("/payment");
      }}
      className="flex-1 bg-emerald-600 text-white font-semibold py-2.5 rounded-full shadow-md hover:bg-emerald-700 hover:scale-105 transition-all duration-200"
    >
      Buy Now
    </button>

  </div>
</div>




          

        
      </div>

      <div className=" md:mt-10 md:mb-0 text-xl font-bold mx-auto max-w-7xl -mt-9 mb-3">
      <h1>As Per Your Aim</h1>
      <div className="relative flex items-center">
        <div className="overflow-hidden w-full">
          <div className=" mt-5 mb-10 items-start transition-transform duration-700 ease-in-out grid grid-cols-2 md:grid-cols-6 gap-2">
            {relatedProducts.slice(0, counts).map((product) => (
              <Link
                          to={`/productdetails/${slugify(product.title)}`}
                          key={product._id}
                          className="group  overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col"
                        >
                       <div className="relative w-full h-40 bg-white overflow-hidden rounded-lg">
              
              {/* Discount Badge */}
              <div className="absolute w-10 h-8 top-2 left-1 z-20">
                <div className="relative bg-[#FF4D5A]  text-white font-extrabold -ms-4 text-sm px-5 py-1 rounded-r-full rounded-l-lg shadow-lg">
                  {product.discount || 35}
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
                                  -{product.discount}
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
            
                <span className="text-gray-700 text-sm ">{product.avgRating}</span> <span className="text-sm ms-3 font-medium">{product.soldCount}+ sold</span>
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
            ))}
          </div>
        </div>
      </div>

      {chatOpen && (
  <ChatWidget
    sellerId={product?.sellerId}
    sellerName={product?.shopName}
    product={product}
    onClose={() => setChatOpen(false)}
  />
)}

      {/* Toggle Button */}
      {/* {counts < relatedProducts.length ? (
        <div className="flex justify-center -mt-6 mb-20">
          <button
            onClick={toggleSeeProducts}
            className="bg-gradient-to-r from-[#8CD005] to-[#19745B] text-white font-semibold px-6 py-2 rounded shadow hover:opacity-90 transition"
          >
            {expandedvalue ? "Hide Products" : "See More"}
          </button>
        </div>
      ) : (
        <div className="flex justify-center mb-10">
          <button
            onClick={showMore}
            className="bg-gradient-to-r from-[#8CD005] to-[#19745B] text-white font-semibold px-6 py-2 rounded shadow hover:opacity-90 transition"
          >
            Show More
          </button>
        </div>
      )} */}
    </div>
    </div>
  );
}
