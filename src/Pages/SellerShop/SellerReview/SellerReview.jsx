import { useEffect, useState } from "react";
import {
  Star,
  ChevronDown,
  ThumbsUp,
  MoreVertical,
  MessageCircle,
  Share2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ScrollToTop from "../../HomePage/ScrollToTop/ScrollToTop";

export default function SellerReview() {
  const { sellerId } = useParams();

  const [shop, setShop] = useState({ shopName: "", mobileNumber: "" });
  const [summary, setSummary] = useState({
    average: 0,
    totalReviews: 0,
    satisfiedPercent: 0,
    breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });
  const [reviews, setReviews] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(null); // 5,4,3,2,1 or null = all
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);

  // Shop header info (reuse the same combined overview API)
  useEffect(() => {
    if (!sellerId) return;
    axios
      .get(`https://dailyshopping-backend.onrender.com/api/seller-shop/${sellerId}`)
      .then((res) => setShop(res.data.shop))
      .catch((err) => console.error("Seller shop overview fetch error:", err));
  }, [sellerId]);

  // Dynamic reviews list + star breakdown
  useEffect(() => {
    if (!sellerId) return;
    setLoading(true);
    axios
      .get(`https://dailyshopping-backend.onrender.com/api/seller-shop/${sellerId}/reviews`, {
        params: {
          rating: ratingFilter || undefined,
          sort,
          page: 1,
          limit: 10,
        },
      })
      .then((res) => {
        setSummary(res.data.summary);
        setReviews(res.data.reviews);
      })
      .catch((err) => console.error("Seller reviews fetch error:", err))
      .finally(() => setLoading(false));
  }, [sellerId, ratingFilter, sort]);

  const toggleRatingFilter = (star) => {
    setRatingFilter((prev) => (prev === star ? null : star));
  };

  return (
    <div className="max-w-[1300px] mx-auto px-4 py-6 bg-gray-50">
      <ScrollToTop />
      {/* STORE HEADER */}
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
              <span className="font-semibold text-gray-900">{summary.average}</span>
              <span>({summary.totalReviews.toLocaleString()} reviews)</span>
            </div>
          </div>
        </div>

        <div className="flex md:flex-row gap-2 sm:gap-3 overflow-x-auto md:overflow-visible scrollbar-hide">
          <button className="flex-1 md:flex-none px-4 sm:px-6 py-2 rounded-full bg-green-500 text-white text-sm sm:text-base font-semibold hover:bg-green-600 transition shrink-0">
            Follow
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

      {/* TABS */}
      <div className="mt-6 border-b flex gap-8 text-sm font-medium">
        <Link to={`/sellershop/${sellerId}`}>
          <button className="pb-3 text-gray-500 hover:text-green-600">Home</button>
        </Link>
        <Link to={`/sellershop-category/${sellerId}`}>
          <button className="pb-3 text-gray-500 hover:text-green-600">Product</button>
        </Link>
        <Link to={`/seller-review/${sellerId}`}>
          <button className="pb-3 border-b-2 border-green-500 text-green-600">Reviews</button>
        </Link>
      </div>

      {/* RATING SUMMARY (now dynamic) */}
      <div className="bg-gradient-to-b from-white to-orange-50 border rounded-xl p-6 mt-6 flex flex-col md:flex-row gap-10">
        <div className="w-[260px]">
          <div className="flex items-center gap-2">
            <Star className="w-7 h-7 text-yellow-400 fill-yellow-400" />
            <span className="text-3xl font-bold text-gray-900">{summary.average}</span>
            <span className="text-gray-500 text-lg">/ 5.0</span>
          </div>

          <p className="text-sm mt-2 font-medium text-gray-800">
            {summary.satisfiedPercent}% of buyers are satisfied
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {summary.totalReviews.toLocaleString()} reviews
          </p>
        </div>

        <div className="flex-1 space-y-2">
          {[5, 4, 3, 2, 1].map((s) => {
            const count = summary.breakdown[s] || 0;
            const percent = summary.totalReviews
              ? Math.round((count / summary.totalReviews) * 100)
              : 0;
            return (
              <div key={s} className="flex items-center gap-3 text-sm">
                <span className="w-4 text-gray-700">{s}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <div className="h-2 bg-gray-200 rounded-full flex-1">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-12">({count})</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-12 gap-6 mt-6">
        {/* FILTER (now wired to the API) */}
        <aside className="col-span-12 md:col-span-3">
          <div className="bg-white border rounded-xl p-4">
            <h3 className="font-bold mb-4 text-gray-900">Filter Reviews</h3>

            <div className="border-t pt-4">
              <p className="font-semibold mb-3 text-sm">Rating</p>
              {[5, 4, 3, 2, 1].map((r) => (
                <label
                  key={r}
                  className="flex items-center gap-2 text-sm mb-2 text-gray-700 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="accent-green-500"
                    checked={ratingFilter === r}
                    onChange={() => toggleRatingFilter(r)}
                  />
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  {r} Stars ({summary.breakdown[r] || 0})
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* REVIEWS (now dynamic list) */}
        <section className="col-span-12 md:col-span-9">
          <div className="bg-white border rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-bold text-gray-900">Featured Reviews</h3>
                <p className="text-xs text-gray-500">
                  Showing {reviews.length} of {summary.totalReviews.toLocaleString()} reviews
                </p>
              </div>

              <button
                onClick={() => setSort(sort === "newest" ? "oldest" : "newest")}
                className="border px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50"
              >
                {sort === "newest" ? "Newest" : "Oldest"} <ChevronDown size={16} />
              </button>
            </div>

            {loading && <p className="text-sm text-gray-500 py-6">Loading reviews...</p>}

            {!loading && reviews.length === 0 && (
              <p className="text-sm text-gray-500 py-6">No reviews yet.</p>
            )}

            {!loading &&
              reviews.map((rev, idx) => (
                <div key={idx} className="border-t pt-6 mt-6 first:mt-0 first:border-t-0">
                  <div className="flex justify-between gap-6">
                    <div className="flex gap-6">
                      {/* PRODUCT INFO */}
                      <div className="w-[120px] shrink-0">
                        <img
                          src={rev.productImg}
                          className="w-12 h-12 rounded-md object-cover"
                          alt={rev.productTitle}
                        />

                        <p className="text-xs text-gray-800 font-semibold mt-3 leading-snug line-clamp-3">
                          {rev.productTitle}
                        </p>

                        {rev.variant && (
                          <p className="text-[11px] text-gray-500 mt-1">
                            Variant: {rev.variant}
                          </p>
                        )}
                      </div>

                      {/* REVIEW CONTENT */}
                      <div className="max-w-[520px]">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i <= rev.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-2">
                            {new Date(rev.date).toLocaleDateString()}
                          </span>
                        </div>

                        <p className="text-sm font-semibold mt-2 text-gray-900">
                          {rev.anonymous ? "Anonymous" : rev.username}
                        </p>

                        <p className="text-sm mt-2 text-gray-700 leading-relaxed">
                          {rev.comment}
                        </p>

                        {rev.photos?.length > 0 && (
                          <div className="flex gap-2 mt-3">
                            {rev.photos.map((p, i) => (
                              <img
                                key={i}
                                src={p}
                                className="w-14 h-14 rounded-md object-cover"
                              />
                            ))}
                          </div>
                        )}

                        <button className="flex items-center gap-2 text-sm mt-4 text-gray-500 hover:text-green-600 transition">
                          <ThumbsUp size={14} />
                          Helpful ({rev.likes || 0})
                        </button>
                      </div>
                    </div>

                    <MoreVertical size={18} className="text-gray-500 mt-1" />
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}
