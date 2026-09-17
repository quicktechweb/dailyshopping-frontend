import { useEffect, useState } from "react";
import { Star, Share2, MessageCircle, ChevronDown } from "lucide-react";
import axios from "axios";
import ScrollToTop from "../../HomePage/ScrollToTop/ScrollToTop";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

export default function SellerShopCategoryProduct() {
  const { sellerId } = useParams();
  const { user } = useAuth();
  const userId = user?.uid || user?._id || user?.userId;

  const [products, setProducts] = useState([]);
  const [shop, setShop] = useState({
    shopName: "",
    mobileNumber: "",
    sellerId: "",
  });
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  const slugify = (text) =>
    (text || "")
      .toString()
      .toLowerCase()
      .trim()
      .replace(/&/g, "-and-")
      .replace(/[\s\W-]+/g, "-");

  useEffect(() => {
    if (!sellerId) return;

    setLoading(true);
    axios
      .get(`https://dailyshopping-backend.onrender.com/api/products/seller/${sellerId}`)
      .then((res) => {
        const data = res.data?.data || [];
        setProducts(data);

        if (data.length > 0) {
          setShop({
            shopName: data[0].shopName || "Shop",
            mobileNumber: data[0].mobileNumber || "",
            sellerId: data[0].sellerId || sellerId,
          });
        }
      })
      .catch((err) => console.error("Seller products fetch error:", err))
      .finally(() => setLoading(false));
  }, [sellerId]);

  // ✅ Follow status + follower count
  useEffect(() => {
    if (!sellerId) return;
    axios
      .get(`https://dailyshopping-backend.onrender.com/api/seller-follow/status`, {
        params: { sellerId, userId },
      })
      .then((res) => {
        setFollowing(res.data.following);
        setFollowerCount(res.data.followerCount);
      })
      .catch((err) => console.error("Follow status fetch error:", err));
  }, [sellerId, userId]);

  const handleFollow = () => {
    if (!userId) {
      alert("Follow korte hole age login korun");
      return;
    }
    axios
      .post(`https://dailyshopping-backend.onrender.com/api/seller-follow/toggle`, { userId, sellerId })
      .then((res) => {
        setFollowing(res.data.following);
        setFollowerCount(res.data.followerCount);
      })
      .catch((err) => console.error("Follow toggle error:", err));
  };

  const categories = [
    ...new Set(products.map((p) => p.categoryName).filter(Boolean)),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <ScrollToTop />
      {/* ================= STORE HEADER ================= */}
      <div
        className="
    bg-white rounded-xl border
    p-4 sm:p-6
    flex flex-col md:flex-row
    md:items-center md:justify-between
    gap-4 md:gap-6 -mt-24 md:mt-0
  "
      >
        {/* Left */}
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          {/* Avatar */}
          <div
            className="
      w-12 h-12 sm:w-16 sm:h-16
      rounded-full bg-red-600
      flex items-center justify-center
      text-white font-bold
      text-lg sm:text-2xl
      shrink-0
    "
          >
            {(shop.shopName || "S").charAt(0)}
          </div>

          <div>
            <h1 className="text-base sm:text-xl font-bold text-gray-900">
              {loading ? "Loading..." : shop.shopName || "Shop"}
            </h1>

            <p className="text-xs sm:text-sm text-gray-500">
              {shop.mobileNumber || ""}
            </p>

            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1 text-xs sm:text-sm text-gray-600">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-gray-900">4.9</span>
              <span>({products.length} products)</span>
              <span className="text-gray-300">|</span>
              <span className="font-semibold text-gray-900">{followerCount}</span>
              <span>followers</span>
            </div>
          </div>
        </div>

        {/* Right Buttons */}
        <div
          className="
      flex md:flex-row
      gap-2 sm:gap-3
      overflow-x-auto md:overflow-visible
      scrollbar-hide
    "
        >
          <button
            onClick={handleFollow}
            className={`
        flex-1 md:flex-none
        px-4 sm:px-6 py-2
        rounded-full
        text-sm sm:text-base
        font-semibold
        transition
        shrink-0
        ${
          following
            ? "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
            : "bg-green-500 text-white hover:bg-green-600"
        }
      `}
          >
            {following ? "Following" : "Follow"}
          </button>

          <button
            className="
        flex-1 md:flex-none
        px-4 sm:px-6 py-2
        rounded-full
        border border-green-500
        text-green-600
        text-sm sm:text-base
        font-semibold
        flex items-center justify-center gap-2
        hover:bg-green-50
        transition
        shrink-0
      "
          >
            <MessageCircle className="w-4 h-4" />
            Chat Seller
          </button>

          <button
            className="
        p-2
        rounded-full
        border
        shrink-0
        hover:bg-gray-100
        transition
      "
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="mt-6 border-b flex gap-8 text-sm font-medium">
        <Link to={`/sellershop/${sellerId}`}>
          <button className="pb-3 text-gray-500 hover:text-green-600">
            Home
          </button>
        </Link>

        <Link to={`/sellershop-category/${sellerId}`}>
          <button className="pb-3 border-b-2 border-green-500 text-green-600">
            Product
          </button>
        </Link>
        <Link to={`/seller-review/${sellerId}`}>
          <button className="pb-3 text-gray-500 hover:text-green-600">
            Reviews
          </button>
        </Link>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="mt-6 flex gap-6">
        {/* ===== LEFT SIDEBAR ===== */}
        <aside className="w-64 bg-white border rounded-xl md:block hidden p-4 h-fit">
          <h3 className="font-bold mb-3">
            Shop Showcase ({categories.length})
          </h3>

          <ul className="space-y-2 text-sm">
            <li className="px-3 py-2 rounded bg-gray-100 font-semibold cursor-pointer">
              All Product
            </li>
            {categories.map((cat) => (
              <li
                key={cat}
                className="px-3 py-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* ===== RIGHT CONTENT ===== */}
        <main className="flex-1">
          {/* Sort */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">All Product</h2>
            <div className="flex items-center gap-2 text-sm">
              <span>Sort by</span>
              <button className="border px-4 py-2 rounded-lg flex items-center gap-2">
                Latest
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <p className="text-gray-500 text-sm">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No products found for this shop.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
              {products.map((item) => (
                <Link
                  key={item._id}
                  to={`/productdetails/${item._id}/${slugify(item.title)}`}
                  className="group"
                >
                  <div className="bg-white shadow-sm rounded-lg p-2 group-hover:shadow-md transition">
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      className="w-full h-40 object-contain mb-2"
                    />
                    <h3 className="text-sm font-semibold leading-snug line-clamp-2 min-h-[38px]">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-bold text-sm">
                      BDT{item.ProductPrice}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}