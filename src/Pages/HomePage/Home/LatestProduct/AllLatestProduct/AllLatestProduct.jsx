import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ScrollToTop from "../../../ScrollToTop/ScrollToTop";
import { motion } from "framer-motion";
import axios from "axios";

const AllLatestProduct = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [availability, setAvailability] = useState("");
  const [visibleCount, setVisibleCount] = useState(1000);
  const [couponData, setCouponData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [priceBounds, setPriceBounds] = useState([0, 0]);
  const [allAvailability, setAllAvailability] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  // ✅ Router param নাম অনুযায়ী ঠিক করে destructure
  const {
    categoryName: categorySlug,
    subcategoryName: subcategorySlug,
    childcategoryName: childcategorySlug,
    brandName: brandSlug,
    searchTerm: titleSlug,
  } = useParams();

  const slugToName = (slug = "") =>
    decodeURIComponent(slug || "")
      .replace(/-/g, " ")
      .replace(/\band\b/gi, "&")
      .trim();

  const categoryName = slugToName(categorySlug);
  const subcategoryName = slugToName(subcategorySlug);
  const childcategoryName = slugToName(childcategorySlug);
  const brandName = slugToName(brandSlug);
  const titleName = slugToName(titleSlug);

  // 🔹 URL বদলালে reset
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [categorySlug, subcategorySlug, childcategorySlug, brandSlug, titleSlug]);

  // 🔹 Backend থেকে filtered + paginated product fetch
  useEffect(() => {
    const fetchProducts = async () => {
      if (loading) return;
      setLoading(true);

      try {
        const res = await axios.get(
          "http://localhost:5000/api/products/productsdata",
          {
            params: {
              ...(categoryName && { category: categoryName }),
              ...(subcategoryName && { subcategory: subcategoryName }),
              ...(childcategoryName && { child: childcategoryName }),
              ...(brandName && { brand: brandName }),
              ...(titleName && { title: titleName }),
              page,
              limit: 20,
            },
          }
        );

        const data = res.data;

        setProducts((prev) =>
          page === 1 ? data.products : [...prev, ...data.products]
        );

        setHasMore(page < data.pagination.totalPages && data.products.length > 0);
      } catch (err) {
        console.error("FETCH ERROR ❌", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, categoryName, subcategoryName, childcategoryName, brandName, titleName]);

  // 🔹 Infinite scroll observer
  useEffect(() => {
    if (!observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  // 🔹 Availability list fetch
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products/availability-list"
        );
        setAllAvailability(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAvailability();
  }, []);

  // 🔹 Client-side extra filter (safety net, backend already filters)
  useEffect(() => {
    let result = products;

    if (categoryName) {
      const cat = categoryName.trim().toLowerCase();
      result = result.filter((p) => p.categoryName?.trim().toLowerCase().includes(cat));
    }
    if (subcategoryName) {
      const sub = subcategoryName.trim().toLowerCase();
      result = result.filter((p) => p.subcategoryName?.trim().toLowerCase().includes(sub));
    }
    if (childcategoryName) {
      const child = childcategoryName.trim().toLowerCase();
      result = result.filter((p) => p.childcategoryName?.trim().toLowerCase().includes(child));
    }

    setFiltered(result);
  }, [products, categoryName, subcategoryName, childcategoryName]);

  // 🔹 Price bounds set করা filtered product থেকে
  useEffect(() => {
    if (filtered.length > 0) {
      const prices = filtered
        .map((p) => Number(p.ProductPrice))
        .filter((price) => !isNaN(price));

      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      setPriceBounds([minPrice, maxPrice]);
      setPriceRange([minPrice, maxPrice]);
    }
  }, [filtered]);

  // 🔹 Sort + Price + Availability + Brand filter
  const finalProducts = useMemo(() => {
    let arr = filtered.filter(
      (p) =>
        p.ProductPrice >= priceRange[0] &&
        p.ProductPrice <= priceRange[1] &&
        (availability === "In Stock"
          ? Number(p.stock) > 0
          : availability === "Limited Stock"
          ? !p.stock || Number(p.stock) === 0
          : availability
          ? p.availability?.trim() === availability
          : true) &&
        (selectedBrand ? p.brandName?.toLowerCase() === selectedBrand.toLowerCase() : true)
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

  const brands = useMemo(() => {
    return [...new Set(filtered.map((p) => p.brandName).filter((b) => b && b.trim() !== ""))];
  }, [filtered]);

  // 🔹 Coupons fetch
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/coupons");
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
          <h4 className="text-xs font-bold text-gray-600 mb-2 uppercase">Sort By</h4>
          {[
            { value: "price-low", label: "Price: Low → High" },
            { value: "price-high", label: "Price: High → Low" },
            { value: "name-asc", label: "Name: A → Z" },
            { value: "name-desc", label: "Name: Z → A" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2 mb-1 cursor-pointer text-sm">
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
        <div className="mb-5">
          <h4 className="text-xs font-bold text-gray-600 mb-2 uppercase">Brand</h4>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer text-sm">
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
        <div className="mb-6 w-full overflow-hidden">
          <h4 className="text-xs font-bold text-gray-600 mb-3 uppercase">Price Range (৳)</h4>
          <div className="relative w-full h-6">
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-gray-300 rounded-full" />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-1 bg-emerald-500 rounded-full"
              style={{
                left: `${((priceRange[0] - priceBounds[0]) / (priceBounds[1] - priceBounds[0] || 1)) * 100}%`,
                width: `${((priceRange[1] - priceRange[0]) / (priceBounds[1] - priceBounds[0] || 1)) * 100}%`,
              }}
            />
            <input
              type="range"
              min={priceBounds[0]}
              max={priceBounds[1]}
              value={priceRange[0]}
              onChange={(e) => {
                const value = Math.min(+e.target.value, priceRange[1] - 1);
                setPriceRange([value, priceRange[1]]);
              }}
              className="absolute w-full h-6 bg-transparent appearance-none pointer-events-none
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:pointer-events-auto
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-emerald-600
                [&::-webkit-slider-thumb]:shadow-md
                [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <input
              type="range"
              min={priceBounds[0]}
              max={priceBounds[1]}
              value={priceRange[1]}
              onChange={(e) => {
                const value = Math.max(+e.target.value, priceRange[0] + 1);
                setPriceRange([priceRange[0], value]);
              }}
              className="absolute w-full h-6 bg-transparent appearance-none pointer-events-none
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:pointer-events-auto
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-emerald-600
                [&::-webkit-slider-thumb]:shadow-md
                [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>

          <div className="flex gap-2 mt-4">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "") {
                  setPriceRange(["", priceRange[1]]);
                  return;
                }
                const num = Number(val);
                setPriceRange([Math.min(num, priceRange[1] - 1), priceRange[1]]);
              }}
              onBlur={() => {
                if (priceRange[0] === "") {
                  setPriceRange([priceBounds[0], priceRange[1]]);
                }
              }}
              className="w-1/2 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Math.max(+e.target.value, priceRange[0] + 1)])
              }
              className="w-1/2 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Availability */}
        <div className="mb-5">
          <h4 className="text-xs font-bold text-gray-600 mb-2 uppercase">Availability</h4>

          {["In Stock", "Limited Stock"].map((status) => {
            const productStock = filtered.length ? Math.max(...filtered.map((p) => p.stock || 0)) : 0;
            const disabled =
              (status === "In Stock" && productStock <= 0) ||
              (status === "Limited Stock" && productStock > 0);

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

          {allAvailability.map((status) => (
            <label key={status} className="flex items-center gap-2 mb-1 text-sm">
              <input
                type="radio"
                name="availability"
                value={status}
                checked={availability === status}
                onChange={(e) => setAvailability(e.target.value)}
                className="accent-emerald-600"
              />
              <span>{status}</span>
            </label>
          ))}
        </div>

        <button
          onClick={() => {
            setSortOption("");
            setPriceRange(priceBounds);
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
              {id === "sort" ? "Sort" : id === "price" ? "Price" : "Availability"}
            </button>
          ))}
          <button
            onClick={() => {
              setSortOption("");
              setPriceRange(priceBounds);
              setAvailability("");
              setActiveFilter("");
            }}
            className="flex-1 text-xs sm:text-sm py-2 rounded-lg font-medium border bg-white text-red-600 border-gray-300"
          >
            Clear
          </button>
        </div>

        {activeFilter === "sort" && (
          <div className="mt-3 bg-white shadow-lg border rounded-lg p-3 animate-fadeIn">
            {[
              { value: "price-low", label: "Price: Low → High" },
              { value: "price-high", label: "Price: High → Low" },
              { value: "name-asc", label: "Name: A → Z" },
              { value: "name-desc", label: "Name: Z → A" },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2 mb-1 cursor-pointer text-sm">
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

        {activeFilter === "price" && (
          <div className="mt-3 bg-white shadow-lg border rounded-lg p-3 animate-fadeIn">
            <input
              type="range"
              min={priceBounds[0]}
              max={priceBounds[1]}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="w-full accent-emerald-600"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              ৳{priceRange[0]} — ৳{priceRange[1]}
            </p>
          </div>
        )}

        {activeFilter === "availability" && (
          <div className="mt-3 bg-white shadow-lg border rounded-lg p-3 animate-fadeIn">
            {["In Stock", "Out of Stock", "Pre-Order", "Upcoming"].map((status) => (
              <label key={status} className="flex items-center gap-2 mb-1 cursor-pointer text-sm">
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
            ))}
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="flex-1 md:ms-4">
        <ScrollToTop />
        <h2 className="text-lg font-bold text-gray-800 mb-4 -mt-2 md:mt-0">
          Showing {Math.min(visibleCount, finalProducts.length)} of {finalProducts.length} products
        </h2>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-5 gap-1 mb-24">
          {finalProducts.slice(0, visibleCount).map((p, index) => {
            const { sold, totalcupon } = getStats(p);

            return (
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                key={p._id + "-" + index}
              >
                {/* ✅ প্রতিটা প্রোডাক্টের নিজস্ব link, hardcoded আর না */}
                <Link
                  to={`/productdetails/${p._id}/${slugify(p.title)}`}
                  className="group overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col bg-white rounded-xl"
                >
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

                  <div className="p-2 flex-grow flex flex-col justify-between">
                    <p className="text-sm font-semibold text-gray-800 truncate">{p.title}</p>

                    <div className="flex items-center gap-2 my-1">
                      <span className="text-red-600 font-bold text-base">৳{p.ProductPrice}</span>
                      <span className="line-through text-gray-400 text-xs">৳{p.oldPrice}</span>
                      <span className="text-red-500 text-xs">-{p.discount}%</span>
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

        <div ref={observerRef} style={{ height: 1 }} />

        {loading && (
          <div className="flex justify-center items-center my-6">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-700 font-medium">Loading products...</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AllLatestProduct;