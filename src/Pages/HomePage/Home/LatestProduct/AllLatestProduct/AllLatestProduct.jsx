import { useState, useMemo, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ScrollToTop from "../../../ScrollToTop/ScrollToTop";
import { motion } from "framer-motion";
import axios from "axios";

const AllLatestProduct = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [sortOption, setSortOption] = useState("");
  const [availability, setAvailability] = useState("");
  const [visibleCount, setVisibleCount] = useState(1000);
  const [couponData, setCouponData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");
 const [selectedBrand, setSelectedBrand] = useState("");

  const { categoryName, subcategoryName, childcategoryName,searchTerm  } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // 🔹 Search results from navigation state
  const searchResults = location.state?.results || [];
  const searchKeyword = location.state?.keyword || "";

  

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://serverluckyshop.luckyshop.com.bd/api/products");
        const data = await res.json();

        if (searchResults.length > 0) {
          setProducts(searchResults);
        } else {
          setProducts(data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [searchResults]);

  // Filter by category
   useEffect(() => {
    let result = products;

    if (categoryName) {
      const cat = decodeURIComponent(categoryName).trim().toLowerCase();
      result = result.filter((p) =>
        p.categoryName?.trim().toLowerCase().includes(cat)
      );
    }

    if (subcategoryName) {
      const sub = decodeURIComponent(subcategoryName).trim().toLowerCase();
      result = result.filter((p) =>
        p.subcategoryName?.trim().toLowerCase().includes(sub)
      );
    }

    if (childcategoryName) {
      const child = decodeURIComponent(childcategoryName).trim().toLowerCase();
      result = result.filter((p) =>
        p.childcategoryName?.trim().toLowerCase().includes(child)
      );
    }

    // Extract brand from URL if available
    const urlBrand = window.location.pathname.split("/brand/")[1];
    if (urlBrand) {
      const brand = decodeURIComponent(urlBrand).trim().toLowerCase();
      result = result.filter((p) =>
        p.brandName?.trim().toLowerCase().includes(brand)
      );
    }

    setFiltered(result);
  }, [products, categoryName, subcategoryName, childcategoryName]);

  // Apply filters
  const finalProducts = useMemo(() => {
  let arr = filtered.filter((p) =>
    p.ProductPrice >= priceRange[0] &&
    p.ProductPrice <= priceRange[1] &&

    // 🔹 Availability
      // 🔹 Availability logic
    (availability === "In Stock"
      ? Number(p.stock) > 0
      : availability === "Limited Stock"
      ? !p.stock || Number(p.stock) === 0
      : true) &&

    // 🔹 Brand filter
    (selectedBrand
      ? p.brandName?.toLowerCase() === selectedBrand.toLowerCase()
      : true)
  );

  switch (sortOption) {
    case "price-low":
      arr.sort((a, b) => a.ProductPrice - b.ProductPrice);
      break;
    case "price-high":
      arr.sort((a, b) => b.ProductPrice - a.ProductPrice);
      break;
    case "name-asc":
      arr.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "name-desc":
      arr.sort((a, b) => b.title.localeCompare(a.title));
      break;
    default:
      break;
  }

  return arr;
}, [filtered, sortOption, priceRange, availability, selectedBrand]);


  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 20, finalProducts.length));
  };


  // 🔹 Unique brand list
// 🔹 Category-wise unique brand list
const brands = useMemo(() => {
  return [
    ...new Set(
      filtered
        .map(p => p.brandName)
        .filter(b => b && b.trim() !== "")
    ),
  ];
}, [filtered]);


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


  const toggleFilter = (id) => {
    setActiveFilter(activeFilter === id ? "" : id);
  };

   const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "-and-")         
    .replace(/[\s\W-]+/g, "-"); 

  return (
    <motion.div className="py-3 px-4 max-w-[1280px] md:max-w-[1380px] sm:max-w-[95%] mx-auto lg:px-24 relative flex flex-col md:flex-row mt-10">
      {/* Sidebar for Large Devices */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="hidden md:block w-[220px] bg-white/60 backdrop-blur-xl shadow-[0_2px_18px_rgba(0,0,0,0.15)] border border-gray-100 rounded-2xl p-4 h-fit sticky top-6"
      >
        <h3 className="font-semibold text-gray-800 mb-4 text-base border-b border-gray-200 pb-2">
          🔍 Filters
        </h3>

        {/* Sort */}
        <div className="mb-5">
          <h4 className="text-xs font-bold text-gray-600 mb-2 uppercase">
            Sort By
          </h4>
          {[
            { value: "price-low", label: "Price: Low → High" },
            { value: "price-high", label: "Price: High → Low" },
            { value: "name-asc", label: "Name: A → Z" },
            { value: "name-desc", label: "Name: Z → A" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 mb-1 cursor-pointer text-sm"
            >
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={sortOption === option.value}
                onChange={(e) => setSortOption(e.target.value)}
                className="accent-emerald-600"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>

         {/* Brand Filter */}
{/* Brand Filter */}
<div className="mb-5">
  <h4 className="text-xs font-bold text-gray-600 mb-2 uppercase">
    Brand
  </h4>

  <div className="space-y-1 max-h-40 overflow-y-auto">
    {brands.map((brand) => (
      <label
        key={brand}
        className="flex items-center gap-2 cursor-pointer text-sm"
      >
        <input
          type="radio"
          name="brand"
          value={brand}
          checked={selectedBrand === brand}
          onChange={() => setSelectedBrand(brand)}
          className="accent-emerald-600"
        />
        <span className="text-gray-700">{brand}</span>
      </label>
    ))}

    {selectedBrand && (
      <button
        onClick={() => setSelectedBrand("")}
        className="text-xs text-red-500 mt-2 hover:underline"
      >
        Clear Brand
      </button>
    )}
  </div>
</div>




        {/* Price */}
        <div className="mb-5">
          <h4 className="text-xs font-bold text-gray-600 mb-2 uppercase">
            Price Range (৳)
          </h4>
          <input
            type="range"
            min="0"
            max="100000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-full mt-2 accent-emerald-600"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            ৳{priceRange[0]} — ৳{priceRange[1]}
          </p>
        </div>

        {/* Availability */}
    {/* Availability */}
<div className="mb-5">
  <h4 className="text-xs font-bold text-gray-600 mb-2 uppercase">
    Availability
  </h4>
  {["In Stock", "Limited Stock"].map((status) => {
    // 🔹 Compute dynamically based on filtered products
    const productStock = filtered.length
      ? Math.max(...filtered.map((p) => p.stock || 0))
      : 0;

    const disabled =
      (status === "In Stock" && productStock <= 0) ||
      (status === "Out of Stock" && productStock > 0);

    return (
      <label
        key={status}
        className={`flex items-center gap-2 mb-1 cursor-pointer text-sm ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <input
          type="radio"
          name="availability"
          value={status}
          checked={availability === status}
          onChange={(e) => !disabled && setAvailability(e.target.value)}
          className="accent-emerald-600"
          disabled={disabled}
        />
        <span className="text-gray-700">{status}</span>
      </label>
    );
  })}
</div>



        <button
          onClick={() => {
            setSortOption("");
            setPriceRange([0, 10000]);
             setSelectedBrand("");
            setAvailability("");
          }}
          className="text-xs text-red-600 font-semibold hover:underline"
        >
          Clear All Filters
        </button>
      </motion.div>

      {/* Mobile Filters */}
      <div className="md:hidden w-full mb-4 mt-20">
        <div className="flex gap-2">
          {["sort", "price", "availability"].map((id) => (
            <button
              key={id}
              onClick={() => toggleFilter(id)}
              className={`flex-1 text-xs sm:text-sm py-2 rounded-lg font-medium border transition ${
                activeFilter === id
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {id === "sort"
                ? "Sort"
                : id === "price"
                ? "Price"
                : "Availability"}
            </button>
          ))}
          <button
            onClick={() => {
              setSortOption("");
              setPriceRange([0, 10000]);
              setAvailability("");
              setActiveFilter("");
            }}
            className="flex-1 text-xs sm:text-sm py-2 rounded-lg font-medium border bg-white text-red-600 border-gray-300"
          >
            Clear
          </button>
        </div>

        {/* Sort Dropdown */}
        {activeFilter === "sort" && (
          <div className="mt-3 bg-white shadow-lg border rounded-lg p-3 animate-fadeIn">
            {[
              { value: "price-low", label: "Price: Low → High" },
              { value: "price-high", label: "Price: High → Low" },
              { value: "name-asc", label: "Name: A → Z" },
              { value: "name-desc", label: "Name: Z → A" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 mb-1 cursor-pointer text-sm"
              >
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  checked={sortOption === option.value}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="accent-emerald-600"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        )}

        {/* Price Dropdown */}
        {activeFilter === "price" && (
          <div className="mt-3 bg-white shadow-lg border rounded-lg p-3 animate-fadeIn">
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, +e.target.value])}
              className="w-full accent-emerald-600"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              ৳{priceRange[0]} — ৳{priceRange[1]}
            </p>
          </div>
        )}

        {/* Availability Dropdown */}
        {activeFilter === "availability" && (
          <div className="mt-3 bg-white shadow-lg border rounded-lg p-3 animate-fadeIn">
            {["In Stock", "Out of Stock", "Pre-Order", "Upcoming"].map(
              (status) => (
                <label
                  key={status}
                  className="flex items-center gap-2 mb-1 cursor-pointer text-sm"
                >
                  <input
                    type="radio"
                    name="availability"
                    value={status}
                    checked={availability === status}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="accent-emerald-600"
                  />
                  <span className="text-gray-700">{status}</span>
                </label>
              )
            )}
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="flex-1 md:ms-4">
        <ScrollToTop />
        <h2 className="text-lg font-bold text-gray-800 mb-4 -mt-2 md:mt-0">
          Showing {Math.min(visibleCount, finalProducts.length)} of{" "}
          {finalProducts.length} products
        </h2>
{/* <p className="text-center text-gray-600 py-10 text-sm">
          
            <span className="font-semibold">{searchKeyword}</span>
          </p> */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-5 gap-1 mb-24">
          {finalProducts.slice(0, visibleCount).map((p, index) => {
            const { sold, totalcupon, remaining } = getStats(p);

            return (
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                key={p._id + "-" + index}
              >
                 {/* to={`/productdetails/${slugify(p?.title)}`} */}
                 <Link
      to={`/productdetails/microsoft-xbox-wireless-controller-electric-volt`}
      key={`${p._id}`} // ensure unique key
      className="group overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col bg-white rounded-xl"
    >
      {/* Image + Discount Badge */}
      <div className="relative w-full h-44 overflow-hidden rounded-t-xl">
        <img
          src={p.images?.[0]}
          alt={p.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 bg-red-500 text-white font-bold text-xs px-3 py-1 rounded-full shadow-lg">
          {p.discount || 35}%
        </div>
      </div>

      {/* Product Info */}
      <div className="p-2 flex-grow flex flex-col justify-between">
        <p className="text-sm font-semibold text-gray-800 truncate">{p.title}</p>

        <div className="flex items-center gap-2 my-1">
          <span className="text-red-600 font-bold text-base">৳{p.ProductPrice}</span>
          <span className="line-through text-gray-400 text-xs">৳{p.oldPrice}</span>
          <span className="text-red-500 text-xs">-{p.discount}%</span>
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
              </motion.div>
            );
          })}
        </motion.div>

        {visibleCount < finalProducts.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMore}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow hover:shadow-lg hover:scale-105 transition-all"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AllLatestProduct;
