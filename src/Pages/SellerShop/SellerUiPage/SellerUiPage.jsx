import { useEffect, useState } from "react";
import { Star, Share2, MessageCircle, ChevronDown } from "lucide-react";
import axios from "axios";
import ScrollToTop from "../../HomePage/ScrollToTop/ScrollToTop";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

export default function SellerUiPage() {
  const { sellerId } = useParams();
  const { user } = useAuth();
  const userId = user?.uid || user?._id || user?.userId;

  const [products, setProducts] = useState([]);
  const [shop, setShop] = useState({ shopName: "", mobileNumber: "", sellerId: "" });
  const [rating, setRating] = useState({ average: 0, count: 0 });
  const [following, setFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  const slugify = (text) =>
    (text || "")
      .toString()
      .toLowerCase()
      .trim()
      .replace(/&/g, "-and-")
      .replace(/[\s\W-]+/g, "-");

  // ✅ Products list (unchanged)
  useEffect(() => {
    if (!sellerId) return;
    axios
      .get(`http://localhost:5000/api/products/seller/${sellerId}`)
      .then((res) => {
        const data = res.data?.data || [];
        setProducts(data);
      })
      .catch((err) => console.error("Seller products fetch error:", err));
  }, [sellerId]);

  // ✅ ONE combined API: shop info + rating + follower count + following status
  useEffect(() => {
    if (!sellerId) return;
    axios
      .get(`http://localhost:5000/api/seller-shop/${sellerId}`, {
        params: { userId },
      })
      .then((res) => {
        const data = res.data;
        setShop(data.shop);
        setRating(data.rating);
        setFollowerCount(data.followerCount);
        setFollowing(data.following);
      })
      .catch((err) => console.error("Seller shop overview fetch error:", err));
  }, [sellerId, userId]);

  const handleFollow = () => {
    if (!userId) {
      alert("Follow korte hole age login korun");
      return;
    }
    axios
      .post(`http://localhost:5000/api/seller-follow/toggle`, { userId, sellerId })
      .then((res) => {
        setFollowing(res.data.following);
        setFollowerCount(res.data.followerCount);
      })
      .catch((err) => console.error("Follow toggle error:", err));
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-6 md:mt-0">
      <ScrollToTop />
      {/* Store Header */}
      <div className="bg-white rounded-xl border p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 -mt-24 md:mt-0">
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg sm:text-2xl shrink-0">
            {(shop.shopName || "S").charAt(0)}
          </div>

          <div>
            <h1 className="text-base sm:text-xl font-bold text-gray-900">
              {shop.shopName || "Loading..."}
            </h1>

            <p className="text-xs sm:text-sm text-gray-500">
              {shop.mobileNumber || ""}
            </p>

            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1 text-xs sm:text-sm text-gray-600">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-gray-900">{rating.average || 0}</span>
              <span>({products.length} products)</span>
              <span className="text-gray-300">|</span>
              <span className="font-semibold text-gray-900">{followerCount}</span>
              <span>followers</span>
            </div>
          </div>
        </div>

        {/* Right Buttons */}
        <div className="flex md:flex-row gap-2 sm:gap-3 overflow-x-auto md:overflow-visible scrollbar-hide">
          <button
            onClick={handleFollow}
            className={`flex-1 md:flex-none px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold transition shrink-0 ${
              following
                ? "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {following ? "Following" : "Follow"}
          </button>

          <button className="flex-1 md:flex-none px-4 sm:px-6 py-2 rounded-full border border-green-500 text-green-600 text-sm sm:text-base font-semibold flex items-center justify-center gap-2 hover:bg-green-50 transition shrink-0">
            <MessageCircle className="w-4 h-4" />
            Chat Seller
          </button>

          <button className="p-2 rounded-full border shrink-0 hover:bg-gray-100 transition">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 border-b flex gap-8 text-sm font-medium">
        <Link to={`/sellershop/${sellerId}`}>
          <button className="pb-3 border-b-2 border-green-500 text-green-600">
            Home
          </button>
        </Link>

        <Link to={`/sellershop-category/${sellerId}`}>
          <button className="pb-3 text-gray-500 hover:text-green-600">
            Product
          </button>
        </Link>

        <Link to={`/seller-review/${sellerId}`}>
          <button className="pb-3 text-gray-500 hover:text-green-600">
            Reviews
          </button>
        </Link>
      </div>

      <h2 className="mt-6 mb-4 text-lg font-bold">Semua Produk</h2>
      <div className="flex items-center gap-2 bg-white p-2 -mt-4 md:mt-0 -ms-2 md:ms-0">
        <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white text-xs font-bold">
            {products.length}
          </span>
          Filter
        </button>

        <button className="flex items-center gap-1 px-4 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
          Price
          <ChevronDown size={16} />
        </button>

        <button className="flex items-center gap-1 px-4 py-1.5 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
          Name
          <ChevronDown size={16} />
        </button>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((item) => (
          <Link
            key={item._id}
            to={`/productdetails/${item._id}/${slugify(item.title)}`}
            className="bg-white rounded-lg shadow-[0_0_1px_rgba(15,23,42,0.05),0_8px_24px_-8px_rgba(15,23,42,0.16),0_2px_8px_rgba(15,23,42,0.06)] hover:shadow-[0_0_1px_rgba(15,23,42,0.06),0_12px_30px_-8px_rgba(15,23,42,0.2),0_2px_10px_rgba(15,23,42,0.08)] hover:-translate-y-0.5 transition-all duration-300 p-3"
          >
            <img
              src={item.images?.[0]}
              alt={item.title}
              className="w-full h-40 object-contain mb-3"
            />
            <h3 className="text-sm font-medium line-clamp-2 min-h-[40px]">
              {item.title}
            </h3>
            <p className="mt-2 text-black-600 font-bold text-sm">
              BDT{item.ProductPrice}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
