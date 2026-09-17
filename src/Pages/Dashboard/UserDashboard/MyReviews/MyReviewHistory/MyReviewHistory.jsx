import { useEffect, useState } from "react";
import { FiFrown, FiMeh, FiSmile } from "react-icons/fi";
import axios from "axios";
import useAuth from "../../../../Hooks/useAuth";
import { Link } from "react-router-dom";

const Star = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.156c.969 0 1.371 1.24.588 1.81l-3.364 2.444a1 1 0 00-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.54 1.118l-3.364-2.444a1 1 0 00-1.176 0l-3.364 2.444c-.784.57-1.838-.197-1.539-1.118l1.286-3.95a1 1 0 00-.364-1.118L2.02 9.377c-.783-.57-.38-1.81.588-1.81h4.156a1 1 0 00.95-.69l1.286-3.95z" />
  </svg>
);

const SellerEmoji = ({ type, active }) => {
  return (
    <div
      className={`w-8 h-8 border rounded-full flex items-center justify-center ${
        active ? "text-orange-500 border-orange-500" : "text-gray-300"
      }`}
    >
      {type === "sad" && <FiFrown size={18} />}
      {type === "neutral" && <FiMeh size={18} />}
      {type === "happy" && <FiSmile size={18} />}
    </div>
  );
};

const MyReviewsHistory = () => {
  const { user } = useAuth();
  const userId = user?.userId || "";
  const userAuth = user?.email || user?.phoneNumber || "";

  const [reviews, setReviews] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId && !userAuth) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const [historyRes, pendingRes] = await Promise.all([
          axios.get("http://localhost:5000/api/reviews/history", {
            params: { userId, userAuth },
          }),
          axios.get("http://localhost:5000/api/reviews/pending", {
            params: { userId, userAuth },
          }),
        ]);

        setReviews(historyRes.data.items || []);
        setPendingCount(pendingRes.data.count || 0);
      } catch (err) {
        console.error("Failed to fetch review history:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId, userAuth]);

  return (
    <div className=" min-h-screen ">
      <div className="max-w-6xl mx-auto md:-mt-16 p-6">
        {/* Header */}
        <h2 className="text-xl font-semibold mb-4">My Reviews</h2>
        <div className="bg-white ">
          {/* Tabs */}
          <div className="flex border-b mb-6 p-3">
            
            <div className="text-sm text-gray-400 mr-8 pb-2">
              <Link to="/dashboard/myreviews">
               To Be Reviewed ({pendingCount})</Link>
             
            </div>
            <div className="text-sm text-orange-500 border-b-2 border-orange-500 pb-2 font-medium">
              History ({reviews.length})
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-16 text-center text-gray-500 text-sm">
            Loading your reviews...
          </div>
        )}

        {/* Empty */}
        {!loading && reviews.length === 0 && (
          <div className="py-16 text-center text-gray-500 text-sm">
            You haven&apos;t written any reviews yet.
          </div>
        )}

        {/* Review List */}
        <div className="space-y-6">
          {reviews.map((item) => (
            <div
              key={item.reviewId}
              className="border rounded bg-white p-4 lg:p-6 flex flex-col lg:flex-row gap-6"
            >
              {/* LEFT */}
              <div className="flex-1">
                <p className="text-xs text-gray-400 mb-2">
                  Reviewed on{" "}
                  {item.date
                    ? new Date(item.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </p>
                <p className="text-sm font-semibold mb-2">
                  Your product rating & review:
                </p>

                <div className="flex gap-4">
                  <img
                    src={item.img}
                    alt=""
                    className="w-14 h-14 border object-cover"
                  />

                  <div>
                    <p className="text-sm text-gray-800 max-w-md">
                      {item.title}
                    </p>
                    {item.color && (
                      <p className="text-xs text-gray-500 mt-1">
                        Color Family: {item.color}
                      </p>
                    )}

                    {/* Stars */}
                    <div className="flex items-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} filled={s <= item.rating} />
                      ))}
                      <span className="text-sm text-gray-700 ml-2">
                        {item.ratingLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                {item.comment && (
                  <div className="mt-4 bg-[#f5f5f5] border p-3 text-sm text-gray-700">
                    {item.comment}
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                      👍 {item.likes || 0}
                    </div>
                  </div>
                )}

                {/* Review Photos */}
                {item.photos?.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {item.photos.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt="review"
                        className="w-16 h-16 object-cover border rounded"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* DIVIDER (desktop only) */}
              <div className="hidden lg:block w-px bg-gray-200"></div>

              {/* RIGHT */}
              <div className="w-full lg:w-64">
                <p className="text-xs text-gray-400 mb-2">Sold by</p>
                <p className="text-sm font-semibold mb-1">
                  {item.shopName || "—"}
                </p>
                <p className="text-xs text-gray-400 mb-2">
                  Your seller review:
                </p>

                <div className="flex gap-3 mb-3">
                  <SellerEmoji type="sad" active={item.sellerRating === 0} />
                  <SellerEmoji type="neutral" active={item.sellerRating === 1} />
                  <SellerEmoji type="happy" active={item.sellerRating === 2} />
                </div>

                {item.sellerComment && (
                  <p className="text-xs text-gray-600 mb-3">{item.sellerComment}</p>
                )}

                {item.deliveryRating > 0 && (
                  <>
                    <p className="text-xs text-gray-400 mb-1">Delivery:</p>
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} filled={s <= item.deliveryRating} />
                      ))}
                    </div>
                    {item.deliveryComment && (
                      <p className="text-xs text-gray-600">{item.deliveryComment}</p>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyReviewsHistory;